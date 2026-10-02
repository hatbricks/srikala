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

// POST /api/admin/test-email — Test store email delivery
router.post('/test-email', requireAdmin, async (req, res) => {
  const email = (req.body?.email || req.user?.email || 'ravichandratextiles39@gmail.com').trim();
  try {
    const { sendTestEmail } = await import('../lib/email.js');
    const result = await sendTestEmail(email);
    if (result?.error) {
      return res.status(400).json({ error: result.error, provider: result.provider });
    }
    res.json({ ok: true, message: `Test email sent successfully to ${email}`, provider: result.provider });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/users — All registered patrons & store members
router.get('/users', requireAdmin, async (req, res) => {
  try {
    const { q = '', sort = 'newest' } = req.query;
    let whereClause = '';
    const params = [];
    if (q.trim()) {
      params.push(`%${q.trim().toLowerCase()}%`);
      whereClause = `WHERE LOWER(u.name) LIKE $1 OR LOWER(u.email) LIKE $1 OR (u.mobile IS NOT NULL AND u.mobile LIKE $1)`;
    }

    let orderBy = 'u.created_at DESC';
    if (sort === 'oldest') orderBy = 'u.created_at ASC';
    if (sort === 'orders_desc') orderBy = 'orders_count DESC, u.created_at DESC';
    if (sort === 'spent_desc') orderBy = 'total_spent DESC, u.created_at DESC';

    const { rows } = await query(`
      SELECT
        u.id,
        u.name,
        u.email,
        u.mobile,
        u.is_admin,
        u.google_id,
        u.created_at,
        COALESCE(o.orders_count, 0)::INTEGER AS orders_count,
        COALESCE(o.total_spent, 0)::INTEGER AS total_spent,
        o.last_order_date,
        da.line1 AS default_address_line1,
        da.line2 AS default_address_line2,
        da.city AS default_address_city,
        da.state AS default_address_state,
        da.pincode AS default_address_pincode
      FROM users u
      LEFT JOIN (
        SELECT
          user_id,
          COUNT(id) AS orders_count,
          COALESCE(SUM(CASE WHEN payment_status = 'PAID' THEN total_amount ELSE 0 END), 0) AS total_spent,
          MAX(created_at) AS last_order_date
        FROM orders
        GROUP BY user_id
      ) o ON o.user_id = u.id
      LEFT JOIN (
        SELECT DISTINCT ON (user_id)
          user_id, line1, line2, city, state, pincode
        FROM addresses
        ORDER BY user_id, is_default DESC, id DESC
      ) da ON da.user_id = u.id
      ${whereClause}
      ORDER BY ${orderBy}
    `, params);

    const totalUsers = rows.length;
    const googleUsers = rows.filter((u) => Boolean(u.google_id)).length;
    const customersWithOrders = rows.filter((u) => u.orders_count > 0).length;
    const totalLTV = rows.reduce((sum, u) => sum + (Number(u.total_spent) || 0), 0);

    res.json({
      users: rows,
      summary: {
        totalUsers,
        googleUsers,
        customersWithOrders,
        totalLTV,
      },
    });
  } catch (err) {
    console.error('[admin/users] error:', err);
    res.status(500).json({ error: 'Failed to fetch users list.' });
  }
});

// GET /api/admin/users/:id — Detailed customer profile
router.get('/users/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { rows: userRows } = await query(
      'SELECT id, name, email, mobile, is_admin, google_id, created_at FROM users WHERE id = $1',
      [id]
    );
    if (!userRows[0]) return res.status(404).json({ error: 'User not found.' });

    const { rows: addresses } = await query(
      'SELECT * FROM addresses WHERE user_id = $1 ORDER BY is_default DESC, id DESC',
      [id]
    );

    const { rows: orders } = await query(
      `SELECT id, order_number, status, payment_status, shipment_status, total_amount, subtotal, created_at
       FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
      [id]
    );

    res.json({
      user: userRows[0],
      addresses,
      orders,
    });
  } catch (err) {
    console.error('[admin/users/:id] error:', err);
    res.status(500).json({ error: 'Failed to fetch user details.' });
  }
});

export default router;
