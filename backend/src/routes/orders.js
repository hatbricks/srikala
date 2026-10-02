import { Router } from 'express';
import { query, pool } from '../db.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import { razorpay, razorpayEnabled, verifyPaymentSignature, createRazorpayRefund } from '../lib/razorpay.js';
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

async function getGstSettings() {
  const { rows } = await query("SELECT value FROM settings WHERE key = 'gst_settings'");
  if (rows[0]?.value) {
    const g = rows[0].value;
    return {
      enabled: g.enabled !== false,
      rate: Number(g.rate) || 5,
      type: g.type === 'exclusive' ? 'exclusive' : 'inclusive',
      gstin: g.gstin || '',
      legalName: g.legalName || 'Ravichandra Textiles',
      state: g.state || 'Andhra Pradesh',
      stateCode: g.stateCode || '37',
      hsnCode: g.hsnCode || '5007',
    };
  }
  return {
    enabled: true,
    rate: 5,
    type: 'inclusive',
    gstin: '37AAAAA0000A1Z5',
    legalName: 'Ravichandra Textiles',
    state: 'Andhra Pradesh',
    stateCode: '37',
    hsnCode: '5007',
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

  // GST calculation
  const gstSettings = await getGstSettings();
  const netOrderAmount = Math.max(0, subtotal - discount);
  let taxAmount = 0;
  let finalTotal = netOrderAmount + shippingFee;

  if (gstSettings.enabled && gstSettings.rate > 0) {
    if (gstSettings.type === 'exclusive') {
      taxAmount = Math.round(netOrderAmount * (gstSettings.rate / 100));
      finalTotal = netOrderAmount + taxAmount + shippingFee;
    } else {
      // Inclusive: catalog merchandise price already includes GST
      const taxable = Math.round(netOrderAmount / (1 + (gstSettings.rate / 100)));
      taxAmount = Math.max(0, netOrderAmount - taxable);
      finalTotal = netOrderAmount + shippingFee;
    }
  }

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
         tax_amount, gst_rate, gst_type, gstin,
         address_name, address_mobile, address_line1, address_line2, address_city, address_state, address_pincode, address_country,
         pickup_location_id
       )
       VALUES ($1,$2,'created','PENDING','PENDING',$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22) RETURNING *`,
      [
        req.user.id,
        orderNumber,
        subtotal,
        shippingFee,
        finalTotal,
        totalWeightGrams,
        coupon?.id || null,
        coupon?.code || null,
        discount,
        taxAmount,
        gstSettings.enabled ? gstSettings.rate : 0,
        gstSettings.type || 'inclusive',
        gstSettings.gstin || '',
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
      amount: finalTotal * 100,
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
      taxAmount,
      gstRate: gstSettings.enabled ? gstSettings.rate : 0,
      gstType: gstSettings.type || 'inclusive',
      totalAmount: finalTotal,
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

  // Send confirmation email
  const { rows: userRows } = await query('SELECT * FROM users WHERE id = $1', [req.user.id]);
  sendOrderConfirmationEmail(userRows[0], order, items).catch(() => {});

  res.json({ ok: true, order, items });
});

// POST /api/orders/:id/cancel — Customer requests cancellation (Pending Admin Approval)
router.post('/:id/cancel', requireAuth, async (req, res) => {
  const { reason } = req.body || {};
  const { rows } = await query('SELECT * FROM orders WHERE id = $1 AND user_id = $2', [req.params.id, req.user.id]);
  const order = rows[0];
  if (!order) return res.status(404).json({ error: 'Order not found.' });

  if (order.status === 'cancelled') {
    return res.status(400).json({ error: 'This order is already cancelled.' });
  }

  if (order.status === 'cancellation_requested') {
    return res.json({
      ok: true,
      message: 'Cancellation request is already pending admin review.',
      status: 'cancellation_requested',
      contact: {
        phone: '+91 83175 51337',
        whatsapp: '918317551337',
        email: 'ravichandratextiles39@gmail.com',
      },
    });
  }

  if (order.status !== 'paid' && order.status !== 'paid_oversold') {
    return res.status(400).json({ error: 'Only confirmed paid orders can be cancelled.' });
  }

  // Check shipment status — cannot cancel if already handed over or delivered
  const nonCancellableStatuses = ['shipped', 'in_transit', 'out_for_delivery', 'delivered'];
  if (nonCancellableStatuses.includes(String(order.shipment_status).toLowerCase())) {
    return res.status(400).json({
      error: `Order has already been dispatched (${order.shipment_status}) and cannot be cancelled directly. You can request a return after delivery.`,
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
  const refundPercent = tier ? tier.refund_percent : 100;
  const payable = order.subtotal - (order.discount || 0);
  const refundAmount = Math.round((payable * refundPercent) / 100);

  // Set order status to 'cancellation_requested' for Admin Approval
  const { rows: updated } = await query(
    `UPDATE orders SET
       status = 'cancellation_requested',
       cancellation_reason = $1,
       cancellation_requested_at = now(),
       cancelled_by = 'customer_pending_admin',
       refund_percent = $2,
       refund_amount = $3,
       updated_at = now()
     WHERE id = $4 RETURNING *`,
    [reason || 'Requested by customer', refundPercent, refundAmount, order.id]
  );

  res.json({
    ok: true,
    message: 'Cancellation request submitted successfully. Our admin team will review and approve it.',
    order: updated[0],
    refundPercent,
    refundAmount,
    contact: {
      phone: '+91 83175 51337',
      whatsapp: '918317551337',
      email: 'ravichandratextiles39@gmail.com',
    },
  });
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

// GET /api/orders/:id/track — Live shipment tracking details
router.get('/:id/track', requireAuth, async (req, res) => {
  const { rows } = await query('SELECT * FROM orders WHERE id = $1 AND (user_id = $2 OR $3 = true)', [
    req.params.id,
    req.user.id,
    Boolean(req.user.isAdmin),
  ]);
  const order = rows[0];
  if (!order) return res.status(404).json({ error: 'Order not found.' });

  res.json({
    orderId: order.id,
    orderNumber: order.order_number,
    awbCode: order.awb_code,
    courierName: order.courier_name,
    trackingUrl: order.tracking_url,
    shipmentStatus: order.shipment_status || 'PENDING',
    trackingHistory: order.tracking_history || [],
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

// PUT /api/orders/admin/:id/cancellation/approve — Admin approves cancellation and triggers Razorpay refund
router.put('/admin/:id/cancellation/approve', requireAdmin, async (req, res) => {
  const { rows } = await query('SELECT * FROM orders WHERE id = $1', [req.params.id]);
  const order = rows[0];
  if (!order) return res.status(404).json({ error: 'Order not found.' });

  if (order.status !== 'cancellation_requested') {
    return res.status(400).json({ error: `Cannot approve cancellation for order in '${order.status}' status.` });
  }

  const { rows: items } = await query('SELECT * FROM order_items WHERE order_id = $1', [order.id]);
  const refundAmount = order.refund_amount != null ? order.refund_amount : (order.subtotal - (order.discount || 0));

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Restore product inventory
    for (const item of items) {
      if (item.variant_id) {
        await client.query('UPDATE product_variants SET stock = stock + $1 WHERE id = $2', [item.qty, item.variant_id]);
      }
      await client.query('UPDATE products SET stock = stock + $1 WHERE id = $2', [item.qty, item.product_id]);
    }

    // 2. Mark order as cancelled
    await client.query(
      `UPDATE orders SET
         status = 'cancelled',
         shipment_status = 'CANCELLED',
         payment_status = 'REFUND_PENDING',
         cancelled_at = now(),
         cancelled_by = 'admin_approved',
         updated_at = now()
       WHERE id = $1`,
      [order.id]
    );

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[orders/admin/cancellation/approve] inventory restore error:', err);
    return res.status(500).json({ error: 'Could not restore inventory.' });
  } finally {
    client.release();
  }

  // 3. Trigger Razorpay Refund if paid via Razorpay
  if (refundAmount > 0 && order.razorpay_payment_id) {
    try {
      const rf = await createRazorpayRefund({
        paymentId: order.razorpay_payment_id,
        amountInRupees: refundAmount,
        notes: { orderId: String(order.id), reason: order.cancellation_reason || 'Admin approved cancellation' },
      });

      await query(
        `INSERT INTO refunds (order_id, payment_id, amount, status, razorpay_refund_id, reason)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [order.id, order.razorpay_payment_id, refundAmount, rf.status || 'processed', rf.id, order.cancellation_reason || 'Admin approved cancellation']
      );

      await query("UPDATE orders SET payment_status = 'REFUNDED', updated_at = now() WHERE id = $1", [order.id]);
    } catch (err) {
      console.error('[orders/admin/cancellation/approve] Razorpay refund error:', err.message);
    }
  }

  // 4. Send cancellation notification email
  const { rows: userRows } = await query('SELECT * FROM users WHERE id = $1', [order.user_id]);
  if (userRows[0]) {
    sendCancellationEmail(userRows[0], order, {
      refundPercent: order.refund_percent || 100,
      refundAmount,
      tierLabel: 'Admin approved',
    }).catch(() => {});
  }

  const { rows: finalOrder } = await query('SELECT * FROM orders WHERE id = $1', [order.id]);
  res.json({ ok: true, message: 'Cancellation approved and refund processed.', order: finalOrder[0] });
});

// PUT /api/orders/admin/:id/cancellation/reject — Admin rejects cancellation request
router.put('/admin/:id/cancellation/reject', requireAdmin, async (req, res) => {
  const { reason } = req.body || {};
  const { rows } = await query('SELECT * FROM orders WHERE id = $1', [req.params.id]);
  const order = rows[0];
  if (!order) return res.status(404).json({ error: 'Order not found.' });

  if (order.status !== 'cancellation_requested') {
    return res.status(400).json({ error: `Order is not in 'cancellation_requested' status.` });
  }

  const { rows: updated } = await query(
    `UPDATE orders SET
       status = 'paid',
       cancellation_reject_reason = $1,
       updated_at = now()
     WHERE id = $2 RETURNING *`,
    [reason || 'Admin declined cancellation request. Order will be fulfilled.', order.id]
  );

  res.json({ ok: true, message: 'Cancellation request rejected. Order remains active.', order: updated[0] });
});

// PUT /api/orders/admin/:id/status — Admin status, fulfillment & courier tracking update
router.put('/admin/:id/status', requireAdmin, async (req, res) => {
  const { status, shipmentStatus, awbCode, courierName, trackingUrl } = req.body || {};

  const { rows } = await query(
    `UPDATE orders SET
       status = COALESCE($1, status),
       shipment_status = COALESCE($2, shipment_status),
       awb_code = COALESCE($3, awb_code),
       courier_name = COALESCE($4, courier_name),
       tracking_url = COALESCE($5, tracking_url),
       shipped_at = CASE WHEN $2 = 'SHIPPED' AND shipped_at IS NULL THEN now() ELSE shipped_at END,
       delivered_at = CASE WHEN $2 = 'DELIVERED' AND delivered_at IS NULL THEN now() ELSE delivered_at END,
       updated_at = now()
     WHERE id = $6 RETURNING *`,
    [status, shipmentStatus, awbCode, courierName, trackingUrl, req.params.id]
  );

  if (!rows[0]) return res.status(404).json({ error: 'Order not found.' });
  res.json({ order: rows[0] });
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

  const { rows: settingsRows } = await query("SELECT key, value FROM settings WHERE key IN ('gst_settings', 'contact_info')");
  const settingsMap = {};
  for (const s of settingsRows) {
    settingsMap[s.key] = s.value;
  }
  const gstSettings = settingsMap.gst_settings || {
    enabled: true,
    rate: 5,
    type: 'inclusive',
    gstin: '37AAAAA0000A1Z5',
    legalName: 'Ravichandra Textiles',
    state: 'Andhra Pradesh',
    stateCode: '37',
    hsnCode: '5007'
  };
  const contactInfo = settingsMap.contact_info || null;

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="RavichandraTextiles-Invoice-${order.order_number || order.id}.pdf"`);
  renderInvoice(res, { order, items, customer: userRows[0], gstSettings, contactInfo });
});

export default router;
