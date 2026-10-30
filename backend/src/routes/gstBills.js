import { Router } from 'express';
import { query } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';
import { renderGstBillPDF, numberToWordsINR } from '../lib/gstBillPdf.js';

const router = Router();

const DEFAULT_GST_SETTINGS = {
  store_name: 'RAVICHANDRA HANDLOOMS',
  store_gstin: '37AYPPR2420N1ZU',
  store_pan: 'AYPPR2420N',
  store_cell: '9493049274, 8317551337',
  store_tagline: 'Pure Silk Sarees Manufacturers',
  store_address: '# 10/28, K.P.T. Street, DHARMAVARAM-515671. Sri Sathyasai Dist. A.P.',
  bank_name: 'Indian Bank',
  bank_account_no: '7653499335',
  bank_ifsc: 'IDIB000D083',
  invoice_prefix: 'RCH-GST-',
  default_hsn: '5007',
  default_sgst_rate: 2.5,
  default_cgst_rate: 2.5,
  default_igst_rate: 5.0,
  terms: [
    '1. This is to certify that we have valid registration under GST & all above informations are true and correct.',
    '2. Our Goods are claimless & Goods once sold cannot be taken back.',
    '3. Our responsibility ceases after handover the goods to transporter.',
    '4. Subject to Dharmavaram jurisdiction.'
  ]
};

// Helper: load stored GST settings from settings table
async function getGstSettings() {
  try {
    const { rows } = await query(`SELECT value FROM settings WHERE key = 'gst_billing_config'`);
    if (rows.length > 0 && rows[0].value) {
      return { ...DEFAULT_GST_SETTINGS, ...rows[0].value };
    }
  } catch (err) {
    console.warn('[gst-bills] failed to load settings from DB:', err.message);
  }
  return DEFAULT_GST_SETTINGS;
}

// Helper: generate next sequential invoice number e.g. RCH-GST-2026-0001
async function generateNextInvoiceNumber() {
  const settings = await getGstSettings();
  const currentYear = new Date().getFullYear();
  const prefix = `${settings.invoice_prefix || 'RCH-GST-'}${currentYear}-`;

  const { rows } = await query(
    `SELECT invoice_number FROM gst_bills
     WHERE invoice_number LIKE $1
     ORDER BY LENGTH(invoice_number) DESC, invoice_number DESC
     LIMIT 1`,
    [`${prefix}%`]
  );

  if (rows.length === 0) {
    return `${prefix}0001`;
  }

  const lastNumStr = rows[0].invoice_number.replace(prefix, '');
  const lastNum = parseInt(lastNumStr, 10);
  const nextNum = isNaN(lastNum) ? 1 : lastNum + 1;
  return `${prefix}${String(nextNum).padStart(4, '0')}`;
}

// GET /api/admin/gst-bills/next-number — Get the next suggested sequential invoice number
router.get('/next-number', requireAdmin, async (_req, res) => {
  try {
    const nextNumber = await generateNextInvoiceNumber();
    res.json({ nextInvoiceNumber: nextNumber });
  } catch (err) {
    console.error('[gst-bills] next-number error:', err);
    res.status(500).json({ error: 'Failed to generate invoice number.' });
  }
});

// GET /api/admin/gst-bills/settings — Get GST Billing CMS Store Settings
router.get('/settings', requireAdmin, async (_req, res) => {
  try {
    const settings = await getGstSettings();
    res.json({ settings });
  } catch (err) {
    console.error('[gst-bills] get-settings error:', err);
    res.status(500).json({ error: 'Failed to retrieve GST settings.' });
  }
});

// PUT /api/admin/gst-bills/settings — Update GST Billing CMS Store Settings
router.put('/settings', requireAdmin, async (req, res) => {
  try {
    const newSettings = req.body || {};
    const merged = { ...DEFAULT_GST_SETTINGS, ...newSettings };

    await query(
      `INSERT INTO settings (key, value, updated_at)
       VALUES ('gst_billing_config', $1, now())
       ON CONFLICT (key) DO UPDATE
       SET value = $1, updated_at = now()`,
      [JSON.stringify(merged)]
    );

    res.json({ success: true, settings: merged });
  } catch (err) {
    console.error('[gst-bills] update-settings error:', err);
    res.status(500).json({ error: 'Failed to update GST settings.' });
  }
});

// GET /api/admin/gst-bills — List all GST Invoices with search, date filters, and stats
router.get('/', requireAdmin, async (req, res) => {
  try {
    const { search, from, to, filterPreset, page = 1, limit = 50 } = req.query;

    const conditions = [];
    const params = [];
    let paramIdx = 1;

    if (search && search.trim()) {
      const q = `%${search.trim()}%`;
      conditions.push(`(
        invoice_number ILIKE $${paramIdx} OR
        receiver_name ILIKE $${paramIdx} OR
        receiver_gstin ILIKE $${paramIdx} OR
        receiver_phone ILIKE $${paramIdx} OR
        vehicle_no ILIKE $${paramIdx} OR
        transporter ILIKE $${paramIdx}
      )`);
      params.push(q);
      paramIdx++;
    }

    if (from) {
      conditions.push(`invoice_date >= $${paramIdx}`);
      params.push(from);
      paramIdx++;
    }

    if (to) {
      conditions.push(`invoice_date <= $${paramIdx}`);
      params.push(to);
      paramIdx++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Summary stats for GST
    const statsQuery = `
      SELECT
        COUNT(*)::int AS total_invoices,
        COALESCE(SUM(taxable_amount), 0)::numeric(14,2) AS total_taxable,
        COALESCE(SUM(sgst_amount), 0)::numeric(14,2) AS total_sgst,
        COALESCE(SUM(cgst_amount), 0)::numeric(14,2) AS total_cgst,
        COALESCE(SUM(igst_amount), 0)::numeric(14,2) AS total_igst,
        COALESCE(SUM(total_amount), 0)::numeric(14,2) AS total_amount
      FROM gst_bills
      ${whereClause}
    `;
    const { rows: statsRows } = await query(statsQuery, params);
    const stats = statsRows[0] || {
      total_invoices: 0,
      total_taxable: 0,
      total_sgst: 0,
      total_cgst: 0,
      total_igst: 0,
      total_amount: 0,
    };

    // Pagination & rows
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const pageLimit = Math.min(100, Math.max(1, parseInt(limit, 10) || 50));
    const offset = (pageNum - 1) * pageLimit;

    const listQuery = `
      SELECT *
      FROM gst_bills
      ${whereClause}
      ORDER BY invoice_date DESC, id DESC
      LIMIT $${paramIdx} OFFSET $${paramIdx + 1}
    `;
    const { rows: bills } = await query(listQuery, [...params, pageLimit, offset]);

    res.json({
      bills,
      stats,
      page: pageNum,
      limit: pageLimit,
    });
  } catch (err) {
    console.error('[gst-bills] list error:', err);
    res.status(500).json({ error: 'Failed to retrieve GST invoices.' });
  }
});

// GET /api/admin/gst-bills/:id/pdf or /api/gst-bills/:invoiceNumber/pdf — Download or view GST invoice in vector PDF format
// Publicly accessible with valid bill ID or invoice number so receipts & WhatsApp links open seamlessly
router.get('/:id/pdf', async (req, res) => {
  try {
    const { id } = req.params;
    const isNum = !isNaN(parseInt(id, 10)) && String(parseInt(id, 10)) === String(id).trim();

    const { rows } = await query(
      isNum
        ? `SELECT * FROM gst_bills WHERE id = $1`
        : `SELECT * FROM gst_bills WHERE UPPER(invoice_number) = UPPER($1)`,
      [isNum ? parseInt(id, 10) : id.trim()]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'GST Invoice not found.' });
    }

    const bill = rows[0];
    const isInline = req.query.inline === 'true' || req.query.inline === '1';
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `${isInline ? 'inline' : 'attachment'}; filename="GST_Invoice_${bill.invoice_number}.pdf"`
    );

    renderGstBillPDF(res, bill);
  } catch (err) {
    console.error('[gst-bills] PDF generation error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to generate GST invoice PDF.' });
    } else {
      res.end();
    }
  }
});

// GET /api/gst-bills/public/:invoiceNumber/pdf — Public customer download endpoint for WhatsApp
router.get('/public/:invoiceNumber/pdf', async (req, res) => {
  try {
    const { invoiceNumber } = req.params;

    const { rows } = await query(
      `SELECT * FROM gst_bills WHERE UPPER(invoice_number) = UPPER($1)`,
      [invoiceNumber.trim()]
    );

    if (rows.length === 0) {
      return res.status(404).send('Invoice not found or invalid link.');
    }

    const bill = rows[0];
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `inline; filename="GST_Invoice_${bill.invoice_number}.pdf"`
    );

    renderGstBillPDF(res, bill);
  } catch (err) {
    console.error('[gst-bills] public PDF generation error:', err);
    if (!res.headersSent) {
      res.status(500).send('Failed to generate GST invoice PDF.');
    } else {
      res.end();
    }
  }
});

// GET /api/admin/gst-bills/:id — Get a single GST bill by ID or invoice_number
router.get('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const isNum = !isNaN(parseInt(id, 10)) && String(parseInt(id, 10)) === String(id).trim();

    const { rows } = await query(
      isNum
        ? `SELECT * FROM gst_bills WHERE id = $1`
        : `SELECT * FROM gst_bills WHERE invoice_number = $1`,
      [isNum ? parseInt(id, 10) : id.trim()]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'GST Invoice not found.' });
    }

    res.json({ bill: rows[0] });
  } catch (err) {
    console.error('[gst-bills] get by id error:', err);
    res.status(500).json({ error: 'Failed to retrieve invoice.' });
  }
});

// POST /api/admin/gst-bills — Create a new GST invoice
router.post('/', requireAdmin, async (req, res) => {
  try {
    const settings = await getGstSettings();

    const {
      invoice_number: customInvoiceNumber,
      invoice_date,
      vehicle_no = '',
      transporter = '',
      reverse_charge = 'No',
      agent_name = '',
      receiver_name,
      receiver_gstin = '',
      receiver_address = '',
      receiver_phone = '',
      receiver_state = '',
      items = [],
      tax_type = 'INTRA_STATE',
      sgst_rate: reqSgstRate,
      cgst_rate: reqCgstRate,
      igst_rate: reqIgstRate,
      bank_name,
      bank_account_no,
      bank_ifsc,
      terms,
      store_name,
      store_gstin,
      store_pan,
      store_cell,
      store_tagline,
      store_address,
      payment_method = 'Bank Transfer',
      payment_ref = '',
      split_cash_amount = 0,
      split_upi_amount = 0,
      notes = '',
    } = req.body;

    if (!receiver_name || !receiver_name.trim()) {
      return res.status(400).json({ error: 'Receiver (Customer) Name is required.' });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'At least one item line is required on the invoice.' });
    }

    // Resolve invoice number
    let finalInvoiceNumber = customInvoiceNumber && customInvoiceNumber.trim();
    if (!finalInvoiceNumber) {
      finalInvoiceNumber = await generateNextInvoiceNumber();
    }
    let candidateNumber = finalInvoiceNumber;
    let collisionCount = 0;
    while (true) {
      const { rows: existing } = await query(
        `SELECT id FROM gst_bills WHERE invoice_number = $1`,
        [candidateNumber]
      );
      if (existing.length === 0) break;
      if (customInvoiceNumber) {
        return res.status(409).json({ error: `Invoice number "${customInvoiceNumber}" already exists.` });
      }
      collisionCount++;
      const nextSuggested = await generateNextInvoiceNumber();
      if (nextSuggested === candidateNumber) {
        const parts = candidateNumber.split('-');
        const lastPart = parseInt(parts[parts.length - 1], 10) || 0;
        candidateNumber = parts.slice(0, -1).join('-') + '-' + String(lastPart + collisionCount).padStart(4, '0');
      } else {
        candidateNumber = nextSuggested;
      }
      if (collisionCount > 10) break;
    }
    finalInvoiceNumber = candidateNumber;

    // Normalize items
    const normalizedItems = items.map((it, idx) => {
      const qty = Math.max(1, parseFloat(it.qty) || 1);
      const rate = Math.max(0, parseFloat(it.rate) || 0);
      const amount = Math.round(qty * rate * 100) / 100;
      return {
        s_no: idx + 1,
        hsn_code: String(it.hsn_code || settings.default_hsn || '5007').trim(),
        description: String(it.description || '').trim(),
        qty,
        rate,
        amount,
      };
    });

    const taxableAmount = Math.round(normalizedItems.reduce((acc, it) => acc + it.amount, 0) * 100) / 100;

    // Calculate Taxes
    let sgstRate = 0;
    let cgstRate = 0;
    let igstRate = 0;
    let sgstAmount = 0;
    let cgstAmount = 0;
    let igstAmount = 0;

    if (tax_type === 'INTRA_STATE') {
      sgstRate = reqSgstRate !== undefined ? parseFloat(reqSgstRate) : (settings.default_sgst_rate || 2.5);
      cgstRate = reqCgstRate !== undefined ? parseFloat(reqCgstRate) : (settings.default_cgst_rate || 2.5);
      sgstAmount = Math.round((taxableAmount * (sgstRate / 100)) * 100) / 100;
      cgstAmount = Math.round((taxableAmount * (cgstRate / 100)) * 100) / 100;
    } else if (tax_type === 'INTER_STATE') {
      igstRate = reqIgstRate !== undefined ? parseFloat(reqIgstRate) : (settings.default_igst_rate || 5.0);
      igstAmount = Math.round((taxableAmount * (igstRate / 100)) * 100) / 100;
    } else {
      // Custom / Exempt
      sgstRate = parseFloat(reqSgstRate || 0);
      cgstRate = parseFloat(reqCgstRate || 0);
      igstRate = parseFloat(reqIgstRate || 0);
      sgstAmount = Math.round((taxableAmount * (sgstRate / 100)) * 100) / 100;
      cgstAmount = Math.round((taxableAmount * (cgstRate / 100)) * 100) / 100;
      igstAmount = Math.round((taxableAmount * (igstRate / 100)) * 100) / 100;
    }

    const rawTotal = taxableAmount + sgstAmount + cgstAmount + igstAmount;
    const roundedTotal = Math.round(rawTotal);
    const roundOff = Math.round((roundedTotal - rawTotal) * 100) / 100;
    const totalAmount = roundedTotal;
    const amountInWords = numberToWordsINR(totalAmount);

    const invoiceDateVal = invoice_date || new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });

    const insertSql = `
      INSERT INTO gst_bills (
        invoice_number,
        invoice_date,
        vehicle_no,
        transporter,
        reverse_charge,
        agent_name,
        receiver_name,
        receiver_gstin,
        receiver_address,
        receiver_phone,
        receiver_state,
        items,
        taxable_amount,
        tax_type,
        sgst_rate,
        sgst_amount,
        cgst_rate,
        cgst_amount,
        igst_rate,
        igst_amount,
        round_off,
        total_amount,
        amount_in_words,
        bank_name,
        bank_account_no,
        bank_ifsc,
        terms,
        store_name,
        store_gstin,
        store_pan,
        store_cell,
        store_tagline,
        store_address,
        payment_method,
        payment_ref,
        split_cash_amount,
        split_upi_amount,
        notes,
        created_by,
        created_at,
        updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
        $21, $22, $23, $24, $25, $26, $27, $28, $29, $30,
        $31, $32, $33, $34, $35, $36, $37, $38, $39, now(), now()
      )
      RETURNING *
    `;

    const params = [
      finalInvoiceNumber,
      invoiceDateVal,
      vehicle_no.trim(),
      transporter.trim(),
      reverse_charge,
      agent_name.trim(),
      receiver_name.trim(),
      receiver_gstin.trim(),
      receiver_address.trim(),
      receiver_phone.trim(),
      receiver_state.trim(),
      JSON.stringify(normalizedItems),
      taxableAmount,
      tax_type,
      sgstRate,
      sgstAmount,
      cgstRate,
      cgstAmount,
      igstRate,
      igstAmount,
      roundOff,
      totalAmount,
      amountInWords,
      (bank_name || settings.bank_name).trim(),
      (bank_account_no || settings.bank_account_no).trim(),
      (bank_ifsc || settings.bank_ifsc).trim(),
      JSON.stringify(terms || settings.terms),
      (store_name || settings.store_name).trim(),
      (store_gstin || settings.store_gstin).trim(),
      (store_pan || settings.store_pan).trim(),
      (store_cell || settings.store_cell).trim(),
      (store_tagline || settings.store_tagline).trim(),
      (store_address || settings.store_address).trim(),
      payment_method,
      payment_ref.trim(),
      Number(split_cash_amount || 0),
      Number(split_upi_amount || 0),
      notes.trim(),
      req.user?.email || 'admin'
    ];

    const { rows } = await query(insertSql, params);
    res.status(201).json({ success: true, bill: rows[0] });
  } catch (err) {
    console.error('[gst-bills] create error:', err);
    res.status(500).json({ error: err.message || 'Failed to create GST invoice.' });
  }
});

// PUT /api/admin/gst-bills/:id — Update existing GST invoice
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { rows: existingRows } = await query(`SELECT * FROM gst_bills WHERE id = $1`, [id]);
    if (existingRows.length === 0) {
      return res.status(404).json({ error: 'Invoice not found.' });
    }
    const current = existingRows[0];

    const {
      invoice_date = current.invoice_date,
      vehicle_no = current.vehicle_no,
      transporter = current.transporter,
      reverse_charge = current.reverse_charge,
      agent_name = current.agent_name,
      receiver_name = current.receiver_name,
      receiver_gstin = current.receiver_gstin,
      receiver_address = current.receiver_address,
      receiver_phone = current.receiver_phone,
      receiver_state = current.receiver_state,
      items = current.items,
      tax_type = current.tax_type,
      sgst_rate = current.sgst_rate,
      cgst_rate = current.cgst_rate,
      igst_rate = current.igst_rate,
      bank_name = current.bank_name,
      bank_account_no = current.bank_account_no,
      bank_ifsc = current.bank_ifsc,
      terms = current.terms,
      store_name = current.store_name,
      store_gstin = current.store_gstin,
      store_pan = current.store_pan,
      store_cell = current.store_cell,
      store_tagline = current.store_tagline,
      store_address = current.store_address,
      payment_method = current.payment_method,
      payment_ref = current.payment_ref,
      split_cash_amount = current.split_cash_amount,
      split_upi_amount = current.split_upi_amount,
      notes = current.notes,
    } = req.body;

    const normalizedItems = (Array.isArray(items) ? items : []).map((it, idx) => {
      const qty = Math.max(1, parseFloat(it.qty) || 1);
      const rate = Math.max(0, parseFloat(it.rate) || 0);
      const amount = Math.round(qty * rate * 100) / 100;
      return {
        s_no: idx + 1,
        hsn_code: String(it.hsn_code || '5007').trim(),
        description: String(it.description || '').trim(),
        qty,
        rate,
        amount,
      };
    });

    const taxableAmount = Math.round(normalizedItems.reduce((acc, it) => acc + it.amount, 0) * 100) / 100;

    let finalSgstRate = 0;
    let finalCgstRate = 0;
    let finalIgstRate = 0;
    let finalSgstAmount = 0;
    let finalCgstAmount = 0;
    let finalIgstAmount = 0;

    if (tax_type === 'INTRA_STATE') {
      finalSgstRate = parseFloat(sgst_rate || 2.5);
      finalCgstRate = parseFloat(cgst_rate || 2.5);
      finalSgstAmount = Math.round((taxableAmount * (finalSgstRate / 100)) * 100) / 100;
      finalCgstAmount = Math.round((taxableAmount * (finalCgstRate / 100)) * 100) / 100;
    } else if (tax_type === 'INTER_STATE') {
      finalIgstRate = parseFloat(igst_rate || 5.0);
      finalIgstAmount = Math.round((taxableAmount * (finalIgstRate / 100)) * 100) / 100;
    } else {
      finalSgstRate = parseFloat(sgst_rate || 0);
      finalCgstRate = parseFloat(cgst_rate || 0);
      finalIgstRate = parseFloat(igst_rate || 0);
      finalSgstAmount = Math.round((taxableAmount * (finalSgstRate / 100)) * 100) / 100;
      finalCgstAmount = Math.round((taxableAmount * (finalCgstRate / 100)) * 100) / 100;
      finalIgstAmount = Math.round((taxableAmount * (finalIgstRate / 100)) * 100) / 100;
    }

    const rawTotal = taxableAmount + finalSgstAmount + finalCgstAmount + finalIgstAmount;
    const roundedTotal = Math.round(rawTotal);
    const roundOff = Math.round((roundedTotal - rawTotal) * 100) / 100;
    const totalAmount = roundedTotal;
    const amountInWords = numberToWordsINR(totalAmount);

    const updateSql = `
      UPDATE gst_bills SET
        invoice_date = $1,
        vehicle_no = $2,
        transporter = $3,
        reverse_charge = $4,
        agent_name = $5,
        receiver_name = $6,
        receiver_gstin = $7,
        receiver_address = $8,
        receiver_phone = $9,
        receiver_state = $10,
        items = $11,
        taxable_amount = $12,
        tax_type = $13,
        sgst_rate = $14,
        sgst_amount = $15,
        cgst_rate = $16,
        cgst_amount = $17,
        igst_rate = $18,
        igst_amount = $19,
        round_off = $20,
        total_amount = $21,
        amount_in_words = $22,
        bank_name = $23,
        bank_account_no = $24,
        bank_ifsc = $25,
        terms = $26,
        store_name = $27,
        store_gstin = $28,
        store_pan = $29,
        store_cell = $30,
        store_tagline = $31,
        store_address = $32,
        payment_method = $33,
        payment_ref = $34,
        split_cash_amount = $35,
        split_upi_amount = $36,
        notes = $37,
        updated_at = now()
      WHERE id = $38
      RETURNING *
    `;

    const updateParams = [
      invoice_date,
      vehicle_no,
      transporter,
      reverse_charge,
      agent_name,
      receiver_name,
      receiver_gstin,
      receiver_address,
      receiver_phone,
      receiver_state,
      JSON.stringify(normalizedItems),
      taxableAmount,
      tax_type,
      finalSgstRate,
      finalSgstAmount,
      finalCgstRate,
      finalCgstAmount,
      finalIgstRate,
      finalIgstAmount,
      roundOff,
      totalAmount,
      amountInWords,
      bank_name,
      bank_account_no,
      bank_ifsc,
      JSON.stringify(terms),
      store_name,
      store_gstin,
      store_pan,
      store_cell,
      store_tagline,
      store_address,
      payment_method,
      payment_ref,
      Number(split_cash_amount || 0),
      Number(split_upi_amount || 0),
      notes,
      id
    ];

    const { rows: updatedRows } = await query(updateSql, updateParams);
    res.json({ success: true, bill: updatedRows[0] });
  } catch (err) {
    console.error('[gst-bills] update error:', err);
    res.status(500).json({ error: err.message || 'Failed to update GST invoice.' });
  }
});

// DELETE /api/admin/gst-bills/:id — Delete a GST invoice
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await query(`DELETE FROM gst_bills WHERE id = $1 RETURNING id, invoice_number`, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'GST Invoice not found.' });
    }
    res.json({ success: true, deleted: rows[0] });
  } catch (err) {
    console.error('[gst-bills] delete error:', err);
    res.status(500).json({ error: 'Failed to delete GST invoice.' });
  }
});

export default router;
