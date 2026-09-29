import { Router } from 'express';
import { query } from '../db.js';
import { checkServiceability } from '../lib/shiprocket.js';

const router = Router();

// POST /api/shipping/calculate
// Calculates real server-side package weight, dimensions, free shipping threshold,
// and courier rates via Shiprocket based on customer destination pincode.
router.post('/calculate', async (req, res) => {
  const { pincode, items = [], subtotal = 0 } = req.body || {};

  const cleanPincode = String(pincode || '').trim();
  if (!cleanPincode || !/^[1-9][0-9]{5}$/.test(cleanPincode)) {
    return res.status(400).json({ error: 'Please enter a valid 6-digit Indian delivery pincode.' });
  }

  // 1. Calculate weight & dimensions from database products/variants
  let totalWeightGrams = 0;
  let maxLength = 30;
  let maxWidth = 20;
  let totalHeight = 0;

  for (const item of items) {
    const qty = Math.max(1, Number(item.qty) || 1);
    const prodId = item.productId || item.id;
    const { rows: prods } = await query(
      'SELECT weight_grams, length_cm, width_cm, height_cm FROM products WHERE id = $1',
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
    if (prod?.length_cm && prod.length_cm > maxLength) maxLength = prod.length_cm;
    if (prod?.width_cm && prod.width_cm > maxWidth) maxWidth = prod.width_cm;
    totalHeight += (prod?.height_cm || 5) * qty;
  }

  if (totalWeightGrams === 0) {
    totalWeightGrams = 600; // safe default for saree + box packaging
  }

  // 2. Fetch shipping settings
  let freeThreshold = 0;
  let fallbackFee = 100;

  const { rows: settingRows } = await query("SELECT value FROM settings WHERE key = 'shipping_settings'");
  if (settingRows[0]?.value) {
    const s = settingRows[0].value;
    if (s.freeThreshold != null) freeThreshold = Number(s.freeThreshold);
    if (s.fee != null) fallbackFee = Number(s.fee);
  } else {
    const { rows: sectionRows } = await query("SELECT content FROM home_sections WHERE id = 'shipping_settings'");
    if (sectionRows[0]?.content) {
      const s = sectionRows[0].content;
      if (s.freeThreshold != null) freeThreshold = Number(s.freeThreshold);
      if (s.fee != null) fallbackFee = Number(s.fee);
    }
  }

  // 3. Free shipping evaluation
  const numSubtotal = Number(subtotal) || 0;
  const isFree = freeThreshold > 0 && numSubtotal >= freeThreshold;

  // 4. Pickup location
  const { rows: pickups } = await query('SELECT pincode, nickname FROM pickup_locations WHERE is_default = TRUE LIMIT 1');
  const pickupPincode = pickups[0]?.pincode || '500001';

  // 5. Courier serviceability check
  const serviceResult = await checkServiceability({
    pickupPincode,
    deliveryPincode: cleanPincode,
    weightGrams: totalWeightGrams,
    lengthCm: maxLength,
    widthCm: maxWidth,
    heightCm: Math.max(5, totalHeight),
    isCod: false,
  });

  if (!serviceResult.serviceable) {
    return res.status(400).json({
      serviceable: false,
      error: serviceResult.error || 'Delivery not serviceable to this pincode.',
    });
  }

  const determinedFee = isFree ? 0 : (serviceResult.fallback ? fallbackFee : serviceResult.rate);

  res.json({
    serviceable: true,
    freeShipping: isFree,
    shippingFee: determinedFee,
    originalRate: serviceResult.rate,
    estimatedDays: serviceResult.etd || '3-5 business days',
    courierName: serviceResult.courierName || 'Standard Express',
    totalWeightGrams,
    couriers: serviceResult.couriers || [],
  });
});

export default router;
