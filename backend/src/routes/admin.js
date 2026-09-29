import { Router } from 'express';
import { query } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/admin/metrics — Real-time analytics and store health from PostgreSQL
router.get('/metrics', requireAdmin, async (_req, res) => {
  try {
    // 1. Revenue & Orders
    const { rows: revRows } = await query(`
      SELECT
        COALESCE(SUM(total_amount), 0) AS total_revenue,
        COUNT(*) AS total_orders
      FROM orders
      WHERE payment_status = 'PAID'
    `);
    const totalRevenue = Number(revRows[0]?.total_revenue || 0);
    const totalOrders = Number(revRows[0]?.total_orders || 0);

    // 2. Pending shipments
    const { rows: shipRows } = await query(`
      SELECT COUNT(*) AS pending_shipments
      FROM orders
      WHERE payment_status = 'PAID' AND shipment_status NOT IN ('delivered', 'DELIVERED', 'cancelled', 'CANCELLED')
    `);
    const pendingShipments = Number(shipRows[0]?.pending_shipments || 0);

    // 3. Delivered orders
    const { rows: delRows } = await query(`
      SELECT COUNT(*) AS delivered_orders
      FROM orders
      WHERE shipment_status IN ('delivered', 'DELIVERED')
    `);
    const deliveredOrders = Number(delRows[0]?.delivered_orders || 0);

    // 4. Pending returns
    const { rows: retRows } = await query(`
      SELECT COUNT(*) AS pending_returns
      FROM return_requests
      WHERE status = 'PENDING'
    `);
    const pendingReturns = Number(retRows[0]?.pending_returns || 0);

    // 5. Total customers
    const { rows: userRows } = await query(`
      SELECT COUNT(*) AS total_customers
      FROM users
      WHERE is_admin = FALSE
    `);
    const totalCustomers = Number(userRows[0]?.total_customers || 0);

    // 6. Low stock alerts
    const { rows: lowStock } = await query(`
      SELECT id, name, stock, image
      FROM products
      WHERE stock <= 3 AND active = TRUE
      ORDER BY stock ASC
      LIMIT 8
    `);

    // 7. Recent orders
    const { rows: recentOrders } = await query(`
      SELECT o.id, o.order_number, o.status, o.payment_status, o.shipment_status,
             o.total_amount, o.subtotal, o.created_at,
             u.name AS customer_name, u.email AS customer_email
      FROM orders o
      JOIN users u ON u.id = o.user_id
      ORDER BY o.created_at DESC
      LIMIT 8
    `);

    // 8. Last 7 days sales breakdown
    const { rows: salesByDay } = await query(`
      SELECT
        TO_CHAR(created_at, 'YYYY-MM-DD') AS day,
        COUNT(*) AS order_count,
        COALESCE(SUM(total_amount), 0) AS revenue
      FROM orders
      WHERE payment_status = 'PAID' AND created_at >= NOW() - INTERVAL '7 days'
      GROUP BY TO_CHAR(created_at, 'YYYY-MM-DD')
      ORDER BY day ASC
    `);

    // 9. Recent audit logs
    const { rows: auditLogs } = await query(`
      SELECT * FROM audit_logs
      ORDER BY created_at DESC
      LIMIT 10
    `);

    res.json({
      metrics: {
        totalRevenue,
        totalOrders,
        pendingShipments,
        deliveredOrders,
        pendingReturns,
        totalCustomers,
      },
      lowStock,
      recentOrders,
      salesByDay,
      auditLogs,
    });
  } catch (err) {
    console.error('[admin/metrics] error:', err);
    res.status(500).json({ error: 'Failed to fetch dashboard metrics.' });
  }
});

// GET /api/admin/audit-logs
router.get('/audit-logs', requireAdmin, async (_req, res) => {
  const { rows } = await query('SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 100');
  res.json({ auditLogs: rows });
});

export default router;
