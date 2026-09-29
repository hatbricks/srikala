import { Router } from 'express';
import { query } from '../db.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import { createRazorpayRefund } from '../lib/razorpay.js';

const router = Router();

// POST /api/returns — Customer submits contextual return request for an eligible item
router.post('/', requireAuth, async (req, res) => {
  const { orderId, orderItemId, reason, details, photos = [] } = req.body || {};

  if (!orderId || !orderItemId || !reason) {
    return res.status(400).json({ error: 'Order ID, Item ID, and reason for return are required.' });
  }

  // 1. Verify order belongs to user
  const { rows: orders } = await query('SELECT * FROM orders WHERE id = $1 AND user_id = $2', [orderId, req.user.id]);
  const order = orders[0];
  if (!order) return res.status(404).json({ error: 'Order not found.' });

  // 2. Verify order item
  const { rows: items } = await query('SELECT * FROM order_items WHERE id = $1 AND order_id = $2', [orderItemId, orderId]);
  const item = items[0];
  if (!item) return res.status(404).json({ error: 'Order item not found.' });

  // 3. Verify return eligibility snapshot
  if (item.return_available === false) {
    return res.status(400).json({ error: 'This item is designated as non-returnable by store policy.' });
  }

  // 4. Verify return window
  const windowHours = item.return_window_hours || 24;
  const deliveryTime = order.delivered_at || order.shipped_at || order.paid_at;
  if (deliveryTime) {
    const elapsedMs = Date.now() - new Date(deliveryTime).getTime();
    const maxMs = windowHours * 60 * 60 * 1000;
    if (elapsedMs > maxMs) {
      return res.status(400).json({
        error: `The return window of ${windowHours} hours has expired for this item.`,
      });
    }
  }

  // 5. Check if return request already exists
  const { rows: existing } = await query(
    'SELECT id, status FROM return_requests WHERE order_item_id = $1',
    [orderItemId]
  );
  if (existing.length) {
    return res.status(400).json({
      error: `A return request has already been submitted for this item (Status: ${existing[0].status}).`,
    });
  }

  // 6. Create return request
  const refundAmount = item.price * item.qty;
  const { rows } = await query(
    `INSERT INTO return_requests (order_id, order_item_id, user_id, reason, details, photos, status, refund_amount)
     VALUES ($1, $2, $3, $4, $5, $6, 'PENDING', $7) RETURNING *`,
    [order.id, item.id, req.user.id, reason, details || '', JSON.stringify(photos), refundAmount]
  );

  res.status(201).json({ returnRequest: rows[0] });
});

// GET /api/returns — Customer views their return requests
router.get('/', requireAuth, async (req, res) => {
  const { rows } = await query(
    `SELECT r.*, i.product_name, i.product_image, i.variant_name, i.price, i.qty, o.order_number
     FROM return_requests r
     JOIN order_items i ON i.id = r.order_item_id
     JOIN orders o ON o.id = r.order_id
     WHERE r.user_id = $1
     ORDER BY r.created_at DESC`,
    [req.user.id]
  );
  res.json({ returnRequests: rows });
});

// GET /api/returns/admin/all — Admin views all return requests
router.get('/admin/all', requireAdmin, async (_req, res) => {
  const { rows } = await query(
    `SELECT r.*, i.product_name, i.product_image, i.variant_name, i.price, i.qty,
            o.order_number, o.razorpay_payment_id,
            u.name AS customer_name, u.email AS customer_email, u.mobile AS customer_mobile
     FROM return_requests r
     JOIN order_items i ON i.id = r.order_item_id
     JOIN orders o ON o.id = r.order_id
     JOIN users u ON u.id = r.user_id
     ORDER BY r.created_at DESC`
  );
  res.json({ returnRequests: rows });
});

// PUT /api/returns/admin/:id — Admin updates return request status & triggers refund
router.put('/admin/:id', requireAdmin, async (req, res) => {
  const { status, adminNotes, refundAmount } = req.body || {};

  const { rows } = await query('SELECT * FROM return_requests WHERE id = $1', [req.params.id]);
  const ret = rows[0];
  if (!ret) return res.status(404).json({ error: 'Return request not found.' });

  const finalAmount = refundAmount != null ? Number(refundAmount) : ret.refund_amount;

  const { rows: updated } = await query(
    `UPDATE return_requests SET
       status = COALESCE($1, status),
       admin_notes = COALESCE($2, admin_notes),
       refund_amount = COALESCE($3, refund_amount),
       updated_at = now()
     WHERE id = $4 RETURNING *`,
    [status, adminNotes, finalAmount, ret.id]
  );

  // If status is set to REFUNDED, issue Razorpay refund
  if (status === 'REFUNDED' && ret.status !== 'REFUNDED') {
    const { rows: orders } = await query('SELECT * FROM orders WHERE id = $1', [ret.order_id]);
    const order = orders[0];

    if (order?.razorpay_payment_id && finalAmount > 0) {
      try {
        const rf = await createRazorpayRefund({
          paymentId: order.razorpay_payment_id,
          amountInRupees: finalAmount,
          notes: { returnRequestId: String(ret.id), orderId: String(order.id) },
        });

        await query(
          `INSERT INTO refunds (order_id, payment_id, amount, status, razorpay_refund_id, reason)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [order.id, order.razorpay_payment_id, finalAmount, rf.status || 'processed', rf.id, `Return #${ret.id} refund`]
        );
      } catch (err) {
        console.error('[returns/refund] Razorpay refund error:', err.message);
      }
    }
  }

  res.json({ returnRequest: updated[0] });
});

export default router;
