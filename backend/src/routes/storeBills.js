import { Router } from 'express';
import { query } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';
import { renderStoreBillPDF } from '../lib/storeBillPdf.js';

const router = Router();

// Helper to generate next sequential bill number e.g. RCT-SB-2026-0001
async function generateNextBillNumber() {
  const currentYear = new Date().getFullYear();
  const prefix = `RCT-SB-${currentYear}-`;

  const { rows } = await query(
    `SELECT bill_number FROM store_bills
     WHERE bill_number LIKE $1
     ORDER BY id DESC LIMIT 1`,
    [`${prefix}%`]
  );

  if (rows.length === 0) {
    return `${prefix}0001`;
  }

  const lastNumStr = rows[0].bill_number.replace(prefix, '');
  const lastNum = parseInt(lastNumStr, 10);
  const nextNum = isNaN(lastNum) ? 1 : lastNum + 1;
  return `${prefix}${String(nextNum).padStart(4, '0')}`;
}

// GET /api/admin/store-bills/next-number — Get the next suggested bill number
router.get('/next-number', requireAdmin, async (_req, res) => {
  try {
    const nextNumber = await generateNextBillNumber();
    res.json({ nextBillNumber: nextNumber });
  } catch (err) {
    console.error('[store-bills] next-number error:', err);
    res.status(500).json({ error: 'Failed to generate bill number.' });
  }
});

// GET /api/admin/store-bills — List all previous store bills with search, filter, and stats
router.get('/', requireAdmin, async (req, res) => {
  try {
    const { search, from, to, paymentMethod, page = 1, limit = 50 } = req.query;

    const conditions = [];
    const params = [];
    let paramIdx = 1;

    if (search && search.trim()) {
      const q = `%${search.trim()}%`;
      conditions.push(`(
        bill_number ILIKE $${paramIdx} OR
        customer_name ILIKE $${paramIdx} OR
        customer_phone ILIKE $${paramIdx} OR
        customer_city ILIKE $${paramIdx}
      )`);
      params.push(q);
      paramIdx++;
    }

    if (from) {
      conditions.push(`bill_date >= $${paramIdx}`);
      params.push(from);
      paramIdx++;
    }

    if (to) {
      conditions.push(`bill_date <= $${paramIdx}`);
      params.push(to);
      paramIdx++;
    }

    if (paymentMethod && paymentMethod !== 'ALL') {
      conditions.push(`payment_method = $${paramIdx}`);
      params.push(paymentMethod);
      paramIdx++;
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const offset = (Math.max(1, parseInt(page, 10)) - 1) * parseInt(limit, 10);
    const pageLimit = parseInt(limit, 10);

    const listQuery = `
      SELECT id, bill_number, bill_date, customer_name, customer_phone,
             customer_city, customer_address, items, subtotal, discount,
             round_off, total_amount, payment_method, payment_ref,
             notes, created_by, created_at, updated_at
      FROM store_bills
      ${whereClause}
      ORDER BY bill_date DESC, id DESC
      LIMIT $${paramIdx} OFFSET $${paramIdx + 1}
    `;

    const { rows: bills } = await query(listQuery, [...params, pageLimit, offset]);

    // Total count for current filter
    const countQuery = `SELECT COUNT(*) AS total_count FROM store_bills ${whereClause}`;
    const { rows: countRows } = await query(countQuery, params);
    const totalCount = parseInt(countRows[0]?.total_count || 0, 10);

    // Global Statistics for Store Billing KPI cards
    const statsQuery = `
      SELECT
        COUNT(*) AS total_bills,
        COALESCE(SUM(total_amount), 0) AS total_revenue,
        COALESCE(SUM(CASE WHEN bill_date = CURRENT_DATE THEN total_amount ELSE 0 END), 0) AS today_revenue,
        COUNT(CASE WHEN bill_date = CURRENT_DATE THEN 1 END) AS today_bills,
        COALESCE(SUM(CASE WHEN DATE_TRUNC('month', bill_date) = DATE_TRUNC('month', CURRENT_DATE) THEN total_amount ELSE 0 END), 0) AS month_revenue,
        COUNT(CASE WHEN DATE_TRUNC('month', bill_date) = DATE_TRUNC('month', CURRENT_DATE) THEN 1 END) AS month_bills
      FROM store_bills
    `;
    const { rows: statsRows } = await query(statsQuery);
    const stats = statsRows[0] || {};

    res.json({
      bills,
      totalCount,
      page: parseInt(page, 10),
      totalPages: Math.ceil(totalCount / pageLimit),
      stats: {
        totalBills: parseInt(stats.total_bills || 0, 10),
        totalRevenue: Number(stats.total_revenue || 0),
        todayRevenue: Number(stats.today_revenue || 0),
        todayBills: parseInt(stats.today_bills || 0, 10),
        monthRevenue: Number(stats.month_revenue || 0),
        monthBills: parseInt(stats.month_bills || 0, 10),
      },
    });
  } catch (err) {
    console.error('[store-bills] list error:', err);
    res.status(500).json({ error: 'Failed to retrieve store bills.' });
  }
});

// GET /api/admin/store-bills/:id — Get a single store bill
router.get('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const isNum = !isNaN(parseInt(id, 10));

    const { rows } = await query(
      isNum
        ? `SELECT * FROM store_bills WHERE id = $1`
        : `SELECT * FROM store_bills WHERE bill_number = $1`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Store bill not found.' });
    }

    res.json({ bill: rows[0] });
  } catch (err) {
    console.error('[store-bills] get error:', err);
    res.status(500).json({ error: 'Failed to retrieve bill details.' });
  }
});

// GET /api/admin/store-bills/:id/pdf — Download or view Store Bill in PDF format (A3 / A4)
// Publicly accessible with valid bill ID or bill number so receipts & WhatsApp links open seamlessly
router.get('/:id/pdf', async (req, res) => {
  try {
    const { id } = req.params;
    const { size = 'A3' } = req.query;
    const isNum = !isNaN(parseInt(id, 10)) && String(parseInt(id, 10)) === String(id).trim();

    const { rows } = await query(
      isNum
        ? `SELECT * FROM store_bills WHERE id = $1`
        : `SELECT * FROM store_bills WHERE UPPER(bill_number) = UPPER($1)`,
      [isNum ? parseInt(id, 10) : id.trim()]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Store bill not found.' });
    }

    const bill = rows[0];
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="Ravichandra_Textiles_Bill_${bill.bill_number}.pdf"`
    );

    renderStoreBillPDF(res, bill, size);
  } catch (err) {
    console.error('[store-bills] PDF generation error:', err);
    res.status(500).json({ error: 'Failed to generate bill PDF.' });
  }
});

// GET /api/admin/store-bills/public/:billNumber/pdf — Public customer download endpoint for WhatsApp
router.get('/public/:billNumber/pdf', async (req, res) => {
  try {
    const { billNumber } = req.params;
    const { size = 'A3' } = req.query;

    const { rows } = await query(
      `SELECT * FROM store_bills WHERE UPPER(bill_number) = UPPER($1)`,
      [billNumber.trim()]
    );

    if (rows.length === 0) {
      return res.status(404).send('Bill not found or invalid link.');
    }

    const bill = rows[0];
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `inline; filename="Ravichandra_Textiles_Bill_${bill.bill_number}.pdf"`
    );

    renderStoreBillPDF(res, bill, size);
  } catch (err) {
    console.error('[store-bills] public PDF generation error:', err);
    res.status(500).send('Failed to generate bill PDF.');
  }
});

// POST /api/admin/store-bills — Create a new customer store bill (Non-GST Cash Memo)
router.post('/', requireAdmin, async (req, res) => {
  try {
    let {
      bill_number,
      bill_date,
      customer_name,
      customer_phone,
      customer_city,
      customer_address,
      items,
      subtotal,
      discount,
      round_off,
      total_amount,
      payment_method = 'Cash',
      payment_ref,
      notes,
    } = req.body;

    if (!customer_name || !customer_name.trim()) {
      return res.status(400).json({ error: 'Customer name is required.' });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'At least one bill item is required.' });
    }

    // Auto-generate bill number if not passed or blank
    if (!bill_number || !bill_number.trim()) {
      bill_number = await generateNextBillNumber();
    } else {
      bill_number = bill_number.trim().toUpperCase();
      // Check if bill_number already exists
      const { rows: exists } = await query(
        `SELECT id FROM store_bills WHERE bill_number = $1`,
        [bill_number]
      );
      if (exists.length > 0) {
        bill_number = await generateNextBillNumber();
      }
    }

    // Calculate/Verify amounts
    const computedSubtotal = items.reduce((sum, it) => {
      const lineTotal = Number(it.amount ?? (Number(it.rate || 0) * Number(it.qty || 1) - Number(it.discount || 0)));
      return sum + Math.max(0, lineTotal);
    }, 0);

    const sub = subtotal !== undefined ? Number(subtotal) : computedSubtotal;
    const disc = Number(discount || 0);
    const netBeforeRound = Math.max(0, sub - disc);
    const roundedTotal = Math.round(netBeforeRound);
    const rOff = round_off !== undefined ? Number(round_off) : Number((roundedTotal - netBeforeRound).toFixed(2));
    const finalTotal = total_amount !== undefined ? Number(total_amount) : roundedTotal;

    const dateVal = bill_date || new Date().toISOString().split('T')[0];
    const createdBy = req.user?.email || 'admin';

    const insertSql = `
      INSERT INTO store_bills (
        bill_number, bill_date, customer_name, customer_phone,
        customer_city, customer_address, items, subtotal, discount,
        round_off, total_amount, payment_method, payment_ref,
        notes, created_by, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW(), NOW())
      RETURNING *
    `;

    const values = [
      bill_number,
      dateVal,
      customer_name.trim(),
      customer_phone ? customer_phone.trim() : null,
      customer_city ? customer_city.trim() : null,
      customer_address ? customer_address.trim() : null,
      JSON.stringify(items),
      sub,
      disc,
      rOff,
      finalTotal,
      payment_method || 'Cash',
      payment_ref ? payment_ref.trim() : null,
      notes ? notes.trim() : null,
      createdBy,
    ];

    const { rows } = await query(insertSql, values);
    const newBill = rows[0];

    res.status(201).json({
      message: 'Store bill generated successfully.',
      bill: newBill,
    });
  } catch (err) {
    console.error('[store-bills] create error:', err);
    res.status(500).json({ error: err.message || 'Failed to create store bill.' });
  }
});

// PUT /api/admin/store-bills/:id — Update existing store bill
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      bill_date,
      customer_name,
      customer_phone,
      customer_city,
      customer_address,
      items,
      subtotal,
      discount,
      round_off,
      total_amount,
      payment_method,
      payment_ref,
      notes,
    } = req.body;

    const { rows: existing } = await query(`SELECT * FROM store_bills WHERE id = $1`, [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Store bill not found.' });
    }

    const updateSql = `
      UPDATE store_bills SET
        bill_date = COALESCE($1, bill_date),
        customer_name = COALESCE($2, customer_name),
        customer_phone = $3,
        customer_city = $4,
        customer_address = $5,
        items = COALESCE($6, items),
        subtotal = COALESCE($7, subtotal),
        discount = COALESCE($8, discount),
        round_off = COALESCE($9, round_off),
        total_amount = COALESCE($10, total_amount),
        payment_method = COALESCE($11, payment_method),
        payment_ref = $12,
        notes = $13,
        updated_at = NOW()
      WHERE id = $14
      RETURNING *
    `;

    const values = [
      bill_date || null,
      customer_name ? customer_name.trim() : null,
      customer_phone !== undefined ? (customer_phone ? customer_phone.trim() : null) : existing[0].customer_phone,
      customer_city !== undefined ? (customer_city ? customer_city.trim() : null) : existing[0].customer_city,
      customer_address !== undefined ? (customer_address ? customer_address.trim() : null) : existing[0].customer_address,
      items ? JSON.stringify(items) : null,
      subtotal !== undefined ? Number(subtotal) : null,
      discount !== undefined ? Number(discount) : null,
      round_off !== undefined ? Number(round_off) : null,
      total_amount !== undefined ? Number(total_amount) : null,
      payment_method || null,
      payment_ref !== undefined ? (payment_ref ? payment_ref.trim() : null) : existing[0].payment_ref,
      notes !== undefined ? (notes ? notes.trim() : null) : existing[0].notes,
      id,
    ];

    const { rows } = await query(updateSql, values);
    res.json({ message: 'Bill updated successfully.', bill: rows[0] });
  } catch (err) {
    console.error('[store-bills] update error:', err);
    res.status(500).json({ error: 'Failed to update store bill.' });
  }
});

// DELETE /api/admin/store-bills/:id — Delete a store bill
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await query(`DELETE FROM store_bills WHERE id = $1 RETURNING id, bill_number`, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Store bill not found.' });
    }

    res.json({
      message: `Store bill ${rows[0].bill_number} deleted successfully.`,
      id: rows[0].id,
    });
  } catch (err) {
    console.error('[store-bills] delete error:', err);
    res.status(500).json({ error: 'Failed to delete store bill.' });
  }
});

export default router;
