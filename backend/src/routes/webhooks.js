import { Router } from 'express';
import { query } from '../db.js';
import { verifyWebhookSignature } from '../lib/razorpay.js';
import { sendOrderConfirmationEmail } from '../lib/email.js';

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

          // Dispatch order confirmation email
          try {
            const { rows: userRows } = await query('SELECT * FROM users WHERE id = $1', [order.user_id]);
            const { rows: itemRows } = await query('SELECT * FROM order_items WHERE order_id = $1', [order.id]);
            if (userRows[0]) {
              sendOrderConfirmationEmail(userRows[0], order, itemRows).catch((err) => {
                console.warn('[webhook:razorpay] order email warning:', err.message);
              });
            }
          } catch (emailErr) {
            console.warn('[webhook:razorpay] email error:', emailErr.message);
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

export default router;
