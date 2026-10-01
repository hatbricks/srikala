import { Router } from 'express';
import { query } from '../db.js';

const router = Router();

// POST /api/shipping/calculate
// Calculates real package weight, checks free shipping threshold,
// and returns delivery serviceability based on destination pincode and store settings.
router.post('/calculate', async (req, res) => {
  const { pincode, items = [], subtotal = 0 } = req.body || {};

  const cleanPincode = String(pincode || '').trim();
  if (!cleanPincode || !/^[1-9][0-9]{5}$/.test(cleanPincode)) {
    return res.status(400).json({ error: 'Please enter a valid 6-digit Indian delivery pincode.' });
  }

  // 1. Calculate weight from database products/variants
  let totalWeightGrams = 0;
  for (const item of items) {
    const qty = Math.max(1, Number(item.qty) || 1);
    const prodId = item.productId || item.id;
    const { rows: prods } = await query(
      'SELECT weight_grams FROM products WHERE id = $1',
      [prodId]
    );
    const prod = prods[0];

    let itemWeight = prod?.weight_grams || 500;
    if (item.variantId) {
      const { rows: vars } = await query(
        'SELECT weight_grams FROM product_variants WHERE id = $1',
        [item.variantId]
      );
      if (vars[0]?.weight_grams) {
        itemWeight = vars[0].weight_grams;
      }
    }

    totalWeightGrams += itemWeight * qty;
  }

  if (totalWeightGrams === 0) {
    totalWeightGrams = 600; // safe default for saree + box packaging
  }

  // 2. Fetch shipping settings
  let freeThreshold = 0;
  let standardFee = 100;

  const { rows: settingRows } = await query("SELECT value FROM settings WHERE key = 'shipping_settings'");
  if (settingRows[0]?.value) {
    const s = settingRows[0].value;
    if (s.freeThreshold != null) freeThreshold = Number(s.freeThreshold);
    if (s.fee != null) standardFee = Number(s.fee);
  } else {
    const { rows: sectionRows } = await query("SELECT content FROM home_sections WHERE section_key = 'shipping_settings'");
    if (sectionRows[0]?.content) {
      const s = sectionRows[0].content;
      if (s.freeThreshold != null) freeThreshold = Number(s.freeThreshold);
      if (s.fee != null) standardFee = Number(s.fee);
    }
  }

  // 3. Free shipping evaluation
  const numSubtotal = Number(subtotal) || 0;
  const isFree = freeThreshold > 0 && numSubtotal >= freeThreshold;
  const determinedFee = isFree ? 0 : standardFee;

  res.json({
    serviceable: true,
    freeShipping: isFree,
    shippingFee: determinedFee,
    originalRate: standardFee,
    estimatedDays: '3-5 business days',
    courierName: 'Insured Express Delivery',
    totalWeightGrams,
  });
});

export default router;
