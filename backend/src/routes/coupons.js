import { Router } from 'express';
import { query } from '../db.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

function computeDiscount(coupon, subtotal) {
  let raw = coupon.type === 'flat' ? Number(coupon.value) : Math.round((subtotal * Number(coupon.value)) / 100);
  if (coupon.type === 'percent' && coupon.max_discount && Number(coupon.max_discount) > 0) {
    raw = Math.min(raw, Number(coupon.max_discount));
  }
  return Math.max(0, Math.min(raw, subtotal)); // never discount below ₹0 or more than the subtotal
}

async function findUsableCoupon(code, userId, items = []) {
  const { rows } = await query('SELECT * FROM coupons WHERE code = $1', [String(code || '').trim().toUpperCase()]);
  const coupon = rows[0];
  if (!coupon) return { error: 'Invalid coupon code.' };
  if (!coupon.active) return { error: 'This coupon is no longer active.' };

  const now = new Date();
  if (coupon.start_date && new Date(coupon.start_date) > now) {
    return { error: 'This coupon is not active yet.' };
  }
  if (coupon.expires_at && new Date(coupon.expires_at) < now) {
    return { error: 'This coupon has expired.' };
  }

  // Global usage limit
  if (coupon.usage_limit && coupon.usage_limit > 0) {
    const { rows: totalUsed } = await query(
      'SELECT COUNT(*) as count FROM coupon_redemptions WHERE coupon_id = $1',
      [coupon.id]
    );
    if (parseInt(totalUsed[0]?.count || 0, 10) >= coupon.usage_limit) {
      return { error: 'This coupon usage limit has been reached.' };
    }
  }

  // Per user limit
  const perUserLimit = coupon.per_user_limit || 1;
  const { rows: userUsed } = await query(
    'SELECT COUNT(*) as count FROM coupon_redemptions WHERE coupon_id = $1 AND user_id = $2',
    [coupon.id, userId]
  );
  if (parseInt(userUsed[0]?.count || 0, 10) >= perUserLimit) {
    return { error: perUserLimit === 1 ? "You've already used this coupon." : `You have reached the limit of ${perUserLimit} uses for this coupon.` };
  }

  // First order only
  if (coupon.first_order_only) {
    const { rows: userOrders } = await query(
      "SELECT 1 FROM orders WHERE user_id = $1 AND payment_status = 'paid' LIMIT 1",
      [userId]
    );
    if (userOrders.length > 0) {
      return { error: 'This coupon is only valid on your first order.' };
    }
  }

  // Item/category applicability restrictions
  const appProds = Array.isArray(coupon.applicable_products) ? coupon.applicable_products : [];
  const appCats = Array.isArray(coupon.applicable_categories) ? coupon.applicable_categories : [];
  if (items && items.length > 0 && (appProds.length > 0 || appCats.length > 0)) {
    const hasMatch = items.some((item) => {
      const matchProd = appProds.length === 0 || appProds.includes(item.productId || item.id);
      const matchCat = appCats.length === 0 || appCats.includes(item.category || item.categoryId);
      return matchProd && matchCat;
    });
    if (!hasMatch) {
      return { error: 'This coupon is not applicable to any items in your bag.' };
    }
  }

  return { coupon };
}

// POST /api/coupons/validate
router.post('/validate', requireAuth, async (req, res) => {
  const { code, subtotal, items } = req.body || {};
  if (!code) return res.status(400).json({ error: 'Enter a coupon code.' });

  const { coupon, error } = await findUsableCoupon(code, req.user.id, items);
  if (error) return res.status(400).json({ error });

  const sub = Number(subtotal) || 0;
  if (coupon.min_order && sub < coupon.min_order) {
    return res.status(400).json({ error: `This coupon needs a minimum order of ₹${coupon.min_order}.` });
  }

  const discount = computeDiscount(coupon, sub);
  res.json({
    valid: true,
    code: coupon.code,
    type: coupon.type,
    value: Number(coupon.value),
    maxDiscount: coupon.max_discount ? Number(coupon.max_discount) : null,
    discount,
  });
});

// --- Admin CRUD ---

router.get('/', requireAdmin, async (_req, res) => {
  const { rows } = await query('SELECT * FROM coupons ORDER BY created_at DESC');
  res.json({ coupons: rows });
});

function toPgArray(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val.map(String).filter(Boolean);
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean);
    } catch {
      return val.split(',').map((s) => s.trim()).filter(Boolean);
    }
  }
  return [];
}

router.post('/', requireAdmin, async (req, res) => {
  const {
    code,
    type,
    value,
    minOrder,
    maxDiscount,
    startDate,
    expiresAt,
    usageLimit,
    perUserLimit,
    applicableCategories,
    applicableProducts,
    firstOrderOnly,
    active,
  } = req.body || {};

  const cleanCode = String(code || '').trim().toUpperCase();
  if (!cleanCode) return res.status(400).json({ error: 'Coupon code is required.' });
  if (!['percent', 'flat'].includes(type)) return res.status(400).json({ error: 'Type must be percent or flat.' });
  const numValue = Number(value);
  if (!numValue || numValue <= 0) return res.status(400).json({ error: 'Enter a discount value greater than 0.' });
  if (type === 'percent' && numValue > 100) return res.status(400).json({ error: 'Percent discount cannot exceed 100.' });

  try {
    const { rows } = await query(
      `INSERT INTO coupons (
         code, type, value, min_order, max_discount, start_date, expires_at,
         usage_limit, per_user_limit, applicable_categories, applicable_products,
         first_order_only, active
       )
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
      [
        cleanCode,
        type,
        numValue,
        Number(minOrder) || 0,
        maxDiscount ? Number(maxDiscount) : null,
        startDate || null,
        expiresAt || null,
        usageLimit ? Number(usageLimit) : null,
        perUserLimit ? Number(perUserLimit) : 1,
        toPgArray(applicableCategories),
        toPgArray(applicableProducts),
        Boolean(firstOrderOnly),
        active !== false,
      ]
    );
    res.status(201).json({ coupon: rows[0] });
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'A coupon with this code already exists.' });
    throw err;
  }
});

router.put('/:id', requireAdmin, async (req, res) => {
  const {
    code,
    type,
    value,
    minOrder,
    maxDiscount,
    startDate,
    expiresAt,
    usageLimit,
    perUserLimit,
    applicableCategories,
    applicableProducts,
    firstOrderOnly,
    active,
  } = req.body || {};

  const { rows } = await query(
    `UPDATE coupons SET
       code = COALESCE($1, code),
       type = COALESCE($2, type),
       value = COALESCE($3, value),
       min_order = COALESCE($4, min_order),
       max_discount = COALESCE($5, max_discount),
       start_date = COALESCE($6, start_date),
       expires_at = COALESCE($7, expires_at),
       usage_limit = COALESCE($8, usage_limit),
       per_user_limit = COALESCE($9, per_user_limit),
       applicable_categories = COALESCE($10, applicable_categories),
       applicable_products = COALESCE($11, applicable_products),
       first_order_only = COALESCE($12, first_order_only),
       active = COALESCE($13, active)
     WHERE id = $14 RETURNING *`,
    [
      code ? String(code).trim().toUpperCase() : null,
      type || null,
      value !== undefined ? Number(value) : null,
      minOrder !== undefined ? Number(minOrder) : null,
      maxDiscount !== undefined ? (maxDiscount ? Number(maxDiscount) : null) : null,
      startDate !== undefined ? (startDate || null) : null,
      expiresAt !== undefined ? (expiresAt || null) : null,
      usageLimit !== undefined ? (usageLimit ? Number(usageLimit) : null) : null,
      perUserLimit !== undefined ? Number(perUserLimit) : null,
      applicableCategories !== undefined ? toPgArray(applicableCategories) : null,
      applicableProducts !== undefined ? toPgArray(applicableProducts) : null,
      firstOrderOnly !== undefined ? Boolean(firstOrderOnly) : null,
      active !== undefined ? active : null,
      req.params.id,
    ]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Coupon not found.' });
  res.json({ coupon: rows[0] });
});

router.delete('/:id', requireAdmin, async (req, res) => {
  await query('DELETE FROM coupons WHERE id = $1', [req.params.id]);
  res.json({ ok: true });
});

export default router;
export { findUsableCoupon, computeDiscount };
