import { Router } from 'express';
import { query } from '../db.js';
import { verifyWebhookSignature } from '../lib/razorpay.js';
import { createShiprocketOrder } from '../lib/shiprocket.js';

const router = Router();

// POST /api/webhooks/razorpay
router.post('/razorpay', async (req, res) => {
  const signature = req.headers['x-razorpay-signature'];
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (secret && signature) {
    const rawBody = req.rawBody ? req.rawBody.toString('utf8') : JSON.stringify(req.body);
    const isValid = verifyWebhookSignature(rawBody, signature, secret);
    if (!isValid) {
      console.warn('[webhook:razorpay] invalid signature rejected.');
      return res.status(400).json({ error: 'Invalid webhook signature.' });
    }
  }

  const event = req.body;
  const eventId = event?.event_id || event?.id || `rzp_${Date.now()}`;
  const eventType = event?.event;

  // Idempotency check
  try {
    const { rows: existing } = await query(
      'SELECT id, processed FROM webhook_events WHERE source = $1 AND event_id = $2',
      ['razorpay', eventId]
    );
    if (existing.length && existing[0].processed) {
      return res.json({ received: true, duplicate: true });
    }

    if (!existing.length) {
      await query(
        'INSERT INTO webhook_events (source, event_id, event_type, payload) VALUES ($1, $2, $3, $4)',
        ['razorpay', eventId, eventType, JSON.stringify(event)]
      );
    }
  } catch (err) {
    console.error('[webhook:razorpay] idempotency check error:', err.message);
  }

  // Handle Event Types
  try {
    if (eventType === 'payment.captured') {
      const payment = event.payload?.payment?.entity;
      const razorpayOrderId = payment?.order_id;
      const razorpayPaymentId = payment?.id;

      if (razorpayOrderId) {
        const { rows: orders } = await query(
          "SELECT * FROM orders WHERE razorpay_order_id = $1 AND payment_status != 'paid'",
          [razorpayOrderId]
        );

        if (orders.length) {
          const order = orders[0];
          await query(
            `UPDATE orders SET
               payment_status = 'paid',
               status = 'paid',
               razorpay_payment_id = $1,
               paid_at = NOW(),
               updated_at = NOW()
             WHERE id = $2`,
            [razorpayPaymentId, order.id]
          );

          // Trigger Shiprocket order creation if not already created
          if (!order.shiprocket_order_id) {
            try {
              const { rows: items } = await query('SELECT * FROM order_items WHERE order_id = $1', [order.id]);
              const { rows: users } = await query('SELECT * FROM users WHERE id = $1', [order.user_id]);
              const user = users[0] || {};

              const sr = await createShiprocketOrder({
                orderId: order.id,
                orderNumber: order.order_number || order.id,
                orderDate: order.created_at,
                pickupLocation: 'Primary Warehouse',
                customer: user,
                address: order.address,
                items,
                totalAmount: order.total_amount,
                totalWeightGrams: order.total_weight_grams || 600,
              });

              if (sr) {
                await query(
                  `UPDATE orders SET
                     shiprocket_order_id = $1,
                     shiprocket_shipment_id = $2,
                     awb_code = COALESCE($3, awb_code),
                     courier_name = COALESCE($4, courier_name),
                     updated_at = NOW()
                   WHERE id = $5`,
                  [sr.shiprocketOrderId, sr.shipmentId, sr.awbCode, sr.courierName, order.id]
                );
              }
            } catch (srErr) {
              console.error('[webhook:razorpay] background Shiprocket order failed:', srErr.message);
            }
          }
        }
      }
    } else if (eventType === 'payment.failed') {
      const payment = event.payload?.payment?.entity;
      const razorpayOrderId = payment?.order_id;
      if (razorpayOrderId) {
        await query(
          "UPDATE orders SET payment_status = 'failed', status = 'cancelled', updated_at = NOW() WHERE razorpay_order_id = $1 AND payment_status = 'pending'",
          [razorpayOrderId]
        );
      }
    }

    await query(
      'UPDATE webhook_events SET processed = TRUE WHERE source = $1 AND event_id = $2',
      ['razorpay', eventId]
    );

    res.json({ received: true });
  } catch (err) {
    console.error('[webhook:razorpay] processing error:', err.message);
    res.status(500).json({ error: 'Webhook processing failed.' });
  }
});

// POST /api/webhooks/shiprocket
router.post('/shiprocket', async (req, res) => {
  const payload = req.body;
  const awb = payload?.awb || payload?.awb_code;
  const currentStatus = String(payload?.current_status || '').toLowerCase();
  const eventId = `sr_${awb}_${payload?.shipment_id || ''}_${payload?.current_status_id || Date.now()}`;

  // Idempotency check
  try {
    const { rows: existing } = await query(
      'SELECT id, processed FROM webhook_events WHERE source = $1 AND event_id = $2',
      ['shiprocket', eventId]
    );
    if (existing.length && existing[0].processed) {
      return res.json({ received: true, duplicate: true });
    }

    await query(
      'INSERT INTO webhook_events (source, event_id, event_type, payload) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING',
      ['shiprocket', eventId, currentStatus, JSON.stringify(payload)]
    );
  } catch (err) {
    console.error('[webhook:shiprocket] idempotency error:', err.message);
  }

  if (!awb) {
    return res.json({ received: true, note: 'No AWB found in payload' });
  }

  try {
    const { rows: orders } = await query('SELECT * FROM orders WHERE awb_code = $1', [awb]);
    if (!orders.length) {
      return res.json({ received: true, note: 'Order not found for AWB' });
    }

    const order = orders[0];
    let newShipmentStatus = order.shipment_status;
    let newStatus = order.status;
    let deliveredAt = order.delivered_at;
    let shippedAt = order.shipped_at;

    if (currentStatus.includes('delivered')) {
      newShipmentStatus = 'delivered';
      newStatus = 'delivered';
      deliveredAt = deliveredAt || new Date();
    } else if (currentStatus.includes('out for delivery')) {
      newShipmentStatus = 'out_for_delivery';
    } else if (currentStatus.includes('in transit') || currentStatus.includes('reach') || currentStatus.includes('dispatched')) {
      newShipmentStatus = 'in_transit';
    } else if (currentStatus.includes('shipped') || currentStatus.includes('picked up')) {
      newShipmentStatus = 'shipped';
      shippedAt = shippedAt || new Date();
    } else if (currentStatus.includes('rto') || currentStatus.includes('return')) {
      newShipmentStatus = 'rto_in_transit';
    }

    const history = Array.isArray(order.tracking_history) ? [...order.tracking_history] : [];
    history.push({
      status: currentStatus,
      location: payload.location || payload.current_location || '',
      date: payload.date || new Date().toISOString(),
      activity: payload.activity || payload.scans || '',
    });

    await query(
      `UPDATE orders SET
         shipment_status = $1,
         status = $2,
         delivered_at = $3,
         shipped_at = $4,
         tracking_history = $5,
         updated_at = NOW()
       WHERE id = $6`,
      [newShipmentStatus, newStatus, deliveredAt, shippedAt, JSON.stringify(history), order.id]
    );

    await query(
      'UPDATE webhook_events SET processed = TRUE WHERE source = $1 AND event_id = $2',
      ['shiprocket', eventId]
    );

    res.json({ received: true, updatedOrder: order.id });
  } catch (err) {
    console.error('[webhook:shiprocket] processing error:', err.message);
    res.status(500).json({ error: 'Shiprocket webhook processing failed.' });
  }
});

export default router;
