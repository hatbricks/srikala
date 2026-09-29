import { Router } from 'express';
import { query, pool } from '../db.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import { razorpay, razorpayEnabled, verifyPaymentSignature, createRazorpayRefund } from '../lib/razorpay.js';
import { createShiprocketOrder, assignShiprocketAWB, trackShiprocketAWB, cancelShiprocketOrder } from '../lib/shiprocket.js';
import { sendOrderConfirmationEmail, sendCancellationEmail } from '../lib/email.js';
import { renderInvoice } from '../lib/invoice.js';
import { findUsableCoupon, computeDiscount } from './coupons.js';
import { findApplicableTier } from './cancellationPolicy.js';

const router = Router();

async function getShippingSettings() {
  const { rows } = await query("SELECT value FROM settings WHERE key = 'shipping_settings'");
  if (rows[0]?.value) {
    const s = rows[0].value;
    return {
      fee: Number.isFinite(s.fee) ? s.fee : 100,
      freeThreshold: Number.isFinite(s.freeThreshold) ? s.freeThreshold : 0,
    };
  }
  const { rows: sec } = await query("SELECT content FROM home_sections WHERE section_key = 'shipping_settings'");
  const content = sec[0]?.content || {};
  return {
    fee: Number.isFinite(content.fee) ? content.fee : 100,
    freeThreshold: Number.isFinite(content.freeThreshold) ? content.freeThreshold : 0,
  };
}

function generateOrderNumber() {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `SK-${dateStr}-${rand}`;
}

// POST /api/orders/create
router.post('/create', requireAuth, async (req, res) => {
  if (!razorpayEnabled) {
    return res.status(503).json({ error: 'Payments are not configured yet. Add RAZORPAY_KEY_ID/SECRET to .env.' });
  }

  const { items, address, couponCode, shippingFee: clientShippingFee } = req.body || {};
  if (!Array.isArray(items) || !items.length) {
    return res.status(400).json({ error: 'Cart is empty.' });
  }

  if (!address?.name || !address?.mobile || !address?.line1 || !address?.city || !address?.pincode) {
    return res.status(400).json({ error: 'A complete shipping address is required.' });
  }

  let subtotal = 0;
  let totalWeightGrams = 0;
  const lineItems = [];

  for (const item of items) {
    const qty = Math.max(1, Number(item.qty) || 1);
    const prodId = item.productId || item.id;

    const { rows: prods } = await query('SELECT * FROM products WHERE id = $1 AND active = true', [prodId]);
    const prod = prods[0];
    if (!prod) return res.status(400).json({ error: `Product ${prodId} not found.` });

    let price = Number(prod.price);
    let mrp = Number(prod.mrp || prod.price);
    let sku = prod.sku || `SKU-${prod.id}`;
    let weightGrams = Number(prod.weight_grams) || 500;
    let variantName = null;
    let variantId = item.variantId || null;

    if (variantId) {
      const { rows: vars } = await query('SELECT * FROM product_variants WHERE id = $1 AND product_id = $2 AND active = true', [variantId, prod.id]);
      const variant = vars[0];
      if (!variant) return res.status(400).json({ error: `Color variant not found for ${prod.name}.` });
      if (variant.stock < qty) return res.status(400).json({ error: `${prod.name} (${variant.color_name}) is out of stock.` });

      if (variant.price != null) price = Number(variant.price);
      if (variant.mrp != null) mrp = Number(variant.mrp);
      if (variant.sku) sku = variant.sku;
      if (variant.weight_grams) weightGrams = Number(variant.weight_grams);
      variantName = variant.color_name;
    } else {
      if (prod.stock < qty) return res.status(400).json({ error: `${prod.name} is out of stock.` });
    }

    subtotal += price * qty;
    totalWeightGrams += weightGrams * qty;

    lineItems.push({
      product: prod,
      variantId,
      variantName,
      sku,
      price,
      mrp,
      weightGrams,
      qty,
      returnAvailable: prod.return_available !== false,
      returnWindowHours: prod.return_window_hours || 24,
      cancellationAvailable: prod.cancellation_available !== false,
    });
  }

  // Coupon validation
  let coupon = null;
  let discount = 0;
  if (couponCode) {
    const result = await findUsableCoupon(couponCode, req.user.id, lineItems);
    if (result.error) return res.status(400).json({ error: result.error });
    coupon = result.coupon;
    if (coupon.min_order && subtotal < coupon.min_order) {
      return res.status(400).json({ error: `This coupon needs a minimum order of ₹${coupon.min_order}.` });
    }
    discount = computeDiscount(coupon, subtotal);
  }

  // Shipping calculation
  const { fee: defaultFee, freeThreshold } = await getShippingSettings();
  let shippingFee = defaultFee;
  if (freeThreshold > 0 && subtotal >= freeThreshold) {
    shippingFee = 0;
  } else if (Number.isFinite(clientShippingFee) && clientShippingFee >= 0) {
    shippingFee = clientShippingFee;
  }

  const total = Math.max(0, subtotal - discount) + shippingFee;
  const orderNumber = generateOrderNumber();

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { rows: pickupRows } = await client.query('SELECT id FROM pickup_locations WHERE is_default = TRUE LIMIT 1');
    const pickupLocationId = pickupRows[0]?.id || null;

    const orderInsert = await client.query(
      `INSERT INTO orders (
         user_id, order_number, status, payment_status, shipment_status,
         subtotal, shipping_fee, total_amount, total_weight_grams,
         coupon_id, coupon_code, discount,
         address_name, address_mobile, address_line1, address_line2, address_city, address_state, address_pincode, address_country,
         pickup_location_id
       )
       VALUES ($1,$2,'created','PENDING','PENDING',$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18) RETURNING *`,
      [
        req.user.id,
        orderNumber,
        subtotal,
        shippingFee,
        total,
        totalWeightGrams,
        coupon?.id || null,
        coupon?.code || null,
        discount,
        address.name,
        address.mobile,
        address.line1,
        address.line2 || '',
        address.city,
        address.state || '',
        address.pincode,
        address.country || 'India',
        pickupLocationId,
      ]
    );
    const order = orderInsert.rows[0];

    for (const item of lineItems) {
      await client.query(
        `INSERT INTO order_items (
           order_id, product_id, variant_id, variant_name, sku,
           product_name, product_image, price, mrp, qty, weight_grams,
           return_available, return_window_hours, cancellation_available
         )
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
        [
          order.id,
          item.product.id,
          item.variantId,
          item.variantName,
          item.sku,
          item.product.name,
          item.product.image,
          item.price,
          item.mrp,
          item.qty,
          item.weightGrams,
          item.returnAvailable,
          item.returnWindowHours,
          item.cancellationAvailable,
        ]
      );
    }

    // Create Razorpay order
    const rpOrder = await razorpay.orders.create({
      amount: total * 100,
      currency: 'INR',
      receipt: orderNumber,
      notes: { orderId: String(order.id), orderNumber, userId: String(req.user.id) },
    });

    await client.query('UPDATE orders SET razorpay_order_id = $1 WHERE id = $2', [rpOrder.id, order.id]);
    await client.query('COMMIT');

    res.status(201).json({
      orderId: order.id,
      orderNumber,
      razorpayOrderId: rpOrder.id,
      amount: rpOrder.amount,
      currency: rpOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      discount,
      shippingFee,
      totalAmount: total,
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[orders/create] error:', err);
    res.status(500).json({ error: 'Could not create order. Please try again.' });
  } finally {
    client.release();
  }
});

// POST /api/orders/verify — signature verification + stock decrement + Shiprocket trigger
router.post('/verify', requireAuth, async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: 'Missing payment verification fields.' });
  }

  const valid = verifyPaymentSignature({
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    signature: razorpay_signature,
  });

  if (!valid) {
    await query("UPDATE orders SET status = 'failed', payment_status = 'FAILED' WHERE razorpay_order_id = $1", [razorpay_order_id]);
    return res.status(400).json({ error: 'Payment verification failed.' });
  }

  const { rows } = await query(
    `UPDATE orders SET
       status = 'paid',
       payment_status = 'PAID',
       razorpay_payment_id = $1,
       razorpay_signature = $2,
       paid_at = now(),
       updated_at = now()
     WHERE razorpay_order_id = $3 AND user_id = $4 RETURNING *`,
    [razorpay_payment_id, razorpay_signature, razorpay_order_id, req.user.id]
  );
  const order = rows[0];
  if (!order) return res.status(404).json({ error: 'Order not found.' });

  const { rows: items } = await query('SELECT * FROM order_items WHERE order_id = $1', [order.id]);

  // Atomically decrement inventory for variants and parent products
  const client = await pool.connect();
  let oversold = false;
  try {
    await client.query('BEGIN');
    for (const item of items) {
      if (item.variant_id) {
        const { rows: updatedVar } = await client.query(
          'UPDATE product_variants SET stock = stock - $1 WHERE id = $2 AND stock >= $1 RETURNING id',
          [item.qty, item.variant_id]
        );
        if (!updatedVar.length) {
          oversold = true;
          await client.query('UPDATE product_variants SET stock = 0 WHERE id = $1', [item.variant_id]);
        }
      }
      // Also decrement or sync parent product stock
      const { rows: updatedProd } = await client.query(
        'UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1 RETURNING id',
        [item.qty, item.product_id]
      );
      if (!updatedProd.length) {
        await client.query('UPDATE products SET stock = 0 WHERE id = $1', [item.product_id]);
      }
    }

    if (order.coupon_id) {
      await client.query(
        `INSERT INTO coupon_redemptions (coupon_id, user_id, order_id) VALUES ($1,$2,$3)
         ON CONFLICT (coupon_id, user_id) DO NOTHING`,
        [order.coupon_id, req.user.id, order.id]
      );
    }

    if (oversold) {
      await client.query("UPDATE orders SET status = 'paid_oversold' WHERE id = $1", [order.id]);
      order.status = 'paid_oversold';
    }
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[orders/verify] inventory update error:', err);
  } finally {
    client.release();
  }

  // Trigger Shiprocket Order Creation
  try {
    const { rows: userRows } = await query('SELECT * FROM users WHERE id = $1', [req.user.id]);
    const user = userRows[0] || {};

    const { rows: pickupRows } = await query('SELECT nickname FROM pickup_locations WHERE id = $1', [order.pickup_location_id]);
    const pickupNickname = pickupRows[0]?.nickname || 'Primary Warehouse';

    const srResult = await createShiprocketOrder({
      orderId: order.id,
      orderNumber: order.order_number,
      orderDate: order.created_at,
      pickupLocation: pickupNickname,
      customer: user,
      address: {
        name: order.address_name,
        mobile: order.address_mobile,
        line1: order.address_line1,
        line2: order.address_line2,
        city: order.address_city,
        state: order.address_state,
        pincode: order.address_pincode,
        country: order.address_country,
      },
      items,
      totalAmount: order.total_amount || (order.subtotal - order.discount + order.shipping_fee),
      totalWeightGrams: order.total_weight_grams,
    });

    if (srResult?.shiprocketOrderId) {
      let awb = srResult.awbCode;
      let courier = srResult.courierName;

      // Try assigning AWB immediately if shipmentId was returned
      if (!awb && srResult.shipmentId) {
        const awbRes = await assignShiprocketAWB(srResult.shipmentId);
        if (awbRes?.awbCode) {
          awb = awbRes.awbCode;
          courier = awbRes.courierName;
        }
      }

      await query(
        `UPDATE orders SET
           shiprocket_order_id = $1,
           shiprocket_shipment_id = $2,
           awb_code = COALESCE($3, awb_code),
           courier_name = COALESCE($4, courier_name),
           tracking_url = $5,
           shipment_status = 'ORDER_CREATED',
           updated_at = now()
         WHERE id = $6`,
        [
          srResult.shiprocketOrderId,
          srResult.shipmentId,
          awb,
          courier,
          awb ? `https://shiprocket.co/tracking/${awb}` : null,
          order.id,
        ]
      );
    }
  } catch (srErr) {
    console.error('[orders/verify] background Shiprocket dispatch error:', srErr.message);
  }

  // Send confirmation email
  const { rows: userRows } = await query('SELECT * FROM users WHERE id = $1', [req.user.id]);
  sendOrderConfirmationEmail(userRows[0], order, items).catch(() => {});

  res.json({ ok: true, order, items });
});

// POST /api/orders/:id/cancel — Order cancellation with policy checks and Razorpay refund
router.post('/:id/cancel', requireAuth, async (req, res) => {
  const { reason } = req.body || {};
  const { rows } = await query('SELECT * FROM orders WHERE id = $1 AND user_id = $2', [req.params.id, req.user.id]);
  const order = rows[0];
  if (!order) return res.status(404).json({ error: 'Order not found.' });

  if (order.status !== 'paid' && order.status !== 'paid_oversold') {
    return res.status(400).json({ error: 'Only confirmed paid orders can be cancelled.' });
  }

  // Check shipment status — cannot cancel if already handed over or delivered
  const nonCancellableStatuses = ['shipped', 'in_transit', 'out_for_delivery', 'delivered'];
  if (nonCancellableStatuses.includes(String(order.shipment_status).toLowerCase())) {
    return res.status(400).json({
      error: `Order has already been dispatched (${order.shipment_status}) and cannot be cancelled. You can initiate a return after delivery if eligible.`,
    });
  }

  // Check item-level cancellation eligibility
  const { rows: items } = await query('SELECT * FROM order_items WHERE order_id = $1', [order.id]);
  const nonCancellableItem = items.find((i) => i.cancellation_available === false);
  if (nonCancellableItem) {
    return res.status(400).json({
      error: `Item "${nonCancellableItem.product_name}" is marked as non-cancellable by store policy.`,
    });
  }

  const daysSincePaid = order.paid_at ? Math.floor((Date.now() - new Date(order.paid_at).getTime()) / 86400000) : 0;
  const tier = await findApplicableTier(daysSincePaid);
  if (!tier) {
    return res.status(400).json({ error: 'This order is past the allowable cancellation window.' });
  }

  const payable = order.subtotal - (order.discount || 0);
  const refundAmount = Math.round((payable * tier.refund_percent) / 100);

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Restore inventory
    for (const item of items) {
      if (item.variant_id) {
        await client.query('UPDATE product_variants SET stock = stock + $1 WHERE id = $2', [item.qty, item.variant_id]);
      }
      await client.query('UPDATE products SET stock = stock + $1 WHERE id = $2', [item.qty, item.product_id]);
    }

    await client.query(
      `UPDATE orders SET
         status = 'cancelled',
         payment_status = 'REFUND_PENDING',
         shipment_status = 'CANCELLED',
         cancelled_at = now(),
         cancelled_by = 'customer',
         cancellation_reason = $1,
         refund_percent = $2,
         refund_amount = $3,
         updated_at = now()
       WHERE id = $4`,
      [reason || 'Cancelled by customer', tier.refund_percent, refundAmount, order.id]
    );

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[orders/cancel] error:', err);
    return res.status(500).json({ error: 'Could not cancel order.' });
  } finally {
    client.release();
  }

  // Cancel Shiprocket Order if already sent
  if (order.shiprocket_order_id) {
    cancelShiprocketOrder([order.shiprocket_order_id]).catch((e) =>
      console.warn('[orders/cancel] shiprocket cancel error:', e.message)
    );
  }

  // Issue Razorpay Refund
  if (refundAmount > 0 && order.razorpay_payment_id) {
    try {
      const rf = await createRazorpayRefund({
        paymentId: order.razorpay_payment_id,
        amountInRupees: refundAmount,
        notes: { orderId: String(order.id), reason: reason || 'Customer cancellation' },
      });

      await query(
        `INSERT INTO refunds (order_id, payment_id, amount, status, razorpay_refund_id, reason)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [order.id, order.razorpay_payment_id, refundAmount, rf.status || 'processed', rf.id, reason || 'Customer cancellation']
      );

      await query("UPDATE orders SET payment_status = 'REFUNDED', updated_at = now() WHERE id = $1", [order.id]);
    } catch (err) {
      console.error('[orders/cancel] Razorpay refund error:', err.message);
    }
  }

  // Send cancellation email
  const { rows: userRows } = await query('SELECT * FROM users WHERE id = $1', [req.user.id]);
  if (userRows[0]) {
    sendCancellationEmail(userRows[0], order, {
      refundPercent: tier.refund_percent,
      refundAmount,
      tierLabel: tier.label,
    }).catch(() => {});
  }

  res.json({ ok: true, refundPercent: tier.refund_percent, refundAmount, tierLabel: tier.label });
});

// GET /api/orders — Customer order list with tracking info
router.get('/', requireAuth, async (req, res) => {
  const { rows: orders } = await query('SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [req.user.id]);
  const { rows: items } = orders.length
    ? await query('SELECT * FROM order_items WHERE order_id = ANY($1)', [orders.map((o) => o.id)])
    : { rows: [] };
  const { rows: returns } = orders.length
    ? await query('SELECT * FROM return_requests WHERE order_id = ANY($1)', [orders.map((o) => o.id)])
    : { rows: [] };

  res.json({
    orders: orders.map((o) => ({
      ...o,
      items: items.filter((i) => i.order_id === o.id),
      returns: returns.filter((r) => r.order_id === o.id),
    })),
  });
});

// GET /api/orders/:id/track — Live Shiprocket tracking
router.get('/:id/track', requireAuth, async (req, res) => {
  const { rows } = await query('SELECT * FROM orders WHERE id = $1 AND (user_id = $2 OR $3 = true)', [
    req.params.id,
    req.user.id,
    Boolean(req.user.isAdmin),
  ]);
  const order = rows[0];
  if (!order) return res.status(404).json({ error: 'Order not found.' });

  let liveTracking = null;
  if (order.awb_code) {
    liveTracking = await trackShiprocketAWB(order.awb_code);
  }

  res.json({
    orderId: order.id,
    orderNumber: order.order_number,
    awbCode: order.awb_code,
    courierName: order.courier_name,
    trackingUrl: order.tracking_url || (order.awb_code ? `https://shiprocket.co/tracking/${order.awb_code}` : null),
    shipmentStatus: liveTracking?.shipmentStatus || order.shipment_status,
    trackingHistory: liveTracking?.scans || order.tracking_history || [],
  });
});

// GET /api/orders/admin/all — Complete orders list for Admin
router.get('/admin/all', requireAdmin, async (_req, res) => {
  const { rows: orders } = await query(
    `SELECT o.*, u.name AS customer_name, u.email AS customer_email, u.mobile AS customer_mobile
     FROM orders o JOIN users u ON u.id = o.user_id
     ORDER BY o.created_at DESC`
  );
  const { rows: items } = orders.length
    ? await query('SELECT * FROM order_items WHERE order_id = ANY($1)', [orders.map((o) => o.id)])
    : { rows: [] };
  const { rows: returns } = orders.length
    ? await query('SELECT * FROM return_requests WHERE order_id = ANY($1)', [orders.map((o) => o.id)])
    : { rows: [] };

  res.json({
    orders: orders.map((o) => ({
      ...o,
      items: items.filter((i) => i.order_id === o.id),
      returns: returns.filter((r) => r.order_id === o.id),
    })),
  });
});

// PUT /api/orders/admin/:id/status — Admin status & courier update
router.put('/admin/:id/status', requireAdmin, async (req, res) => {
  const { shipmentStatus, awbCode, courierName, trackingUrl } = req.body || {};

  const { rows } = await query(
    `UPDATE orders SET
       shipment_status = COALESCE($1, shipment_status),
       awb_code = COALESCE($2, awb_code),
       courier_name = COALESCE($3, courier_name),
       tracking_url = COALESCE($4, tracking_url),
       updated_at = now()
     WHERE id = $5 RETURNING *`,
    [shipmentStatus, awbCode, courierName, trackingUrl, req.params.id]
  );

  if (!rows[0]) return res.status(404).json({ error: 'Order not found.' });
  res.json({ order: rows[0] });
});

// POST /api/orders/admin/:id/assign-awb — Trigger Shiprocket AWB assignment
router.post('/admin/:id/assign-awb', requireAdmin, async (req, res) => {
  const { rows } = await query('SELECT * FROM orders WHERE id = $1', [req.params.id]);
  const order = rows[0];
  if (!order) return res.status(404).json({ error: 'Order not found.' });

  if (!order.shiprocket_shipment_id) {
    return res.status(400).json({ error: 'No Shiprocket shipment ID associated with this order.' });
  }

  const awbRes = await assignShiprocketAWB(order.shiprocket_shipment_id);
  if (!awbRes?.awbCode) {
    return res.status(400).json({ error: 'Failed to assign AWB via Shiprocket. Please check Shiprocket wallet balance or courier availability.' });
  }

  const { rows: updated } = await query(
    `UPDATE orders SET
       awb_code = $1,
       courier_name = COALESCE($2, courier_name),
       tracking_url = $3,
       shipment_status = 'AWB_ASSIGNED',
       updated_at = now()
     WHERE id = $4 RETURNING *`,
    [awbRes.awbCode, awbRes.courierName, `https://shiprocket.co/tracking/${awbRes.awbCode}`, order.id]
  );

  res.json({ ok: true, order: updated[0] });
});

// GET /api/orders/:id/invoice — PDF Invoice
router.get('/:id/invoice', requireAuth, async (req, res) => {
  const { rows } = await query('SELECT * FROM orders WHERE id = $1', [req.params.id]);
  const order = rows[0];
  if (!order) return res.status(404).json({ error: 'Order not found.' });
  if (order.user_id !== req.user.id && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Not allowed.' });
  }
  if (!order.paid_at) {
    return res.status(400).json({ error: 'This order has not been paid yet.' });
  }

  const { rows: items } = await query('SELECT * FROM order_items WHERE order_id = $1 ORDER BY id', [order.id]);
  const { rows: userRows } = await query('SELECT name, email, mobile FROM users WHERE id = $1', [order.user_id]);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="SriKala-Invoice-${order.order_number || order.id}.pdf"`);
  renderInvoice(res, { order, items, customer: userRows[0] });
});

export default router;
