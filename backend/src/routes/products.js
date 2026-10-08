import { Router } from 'express';
import { query, pool } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

function mapProduct(p, variants = []) {
  return {
    id: p.id,
    name: p.name,
    category: p.category_id,
    categoryId: p.category_id,
    price: p.price,
    mrp: p.mrp,
    stock: p.stock,
    sku: p.sku || '',
    shortDescription: p.short_description || '',
    description: p.description || '',
    image: p.image || '',
    hoverImage: p.hover_image || '',
    hover_image: p.hover_image || '',
    images: Array.isArray(p.images) ? p.images : [],
    weightGrams: p.weight_grams ?? 500,
    lengthCm: p.length_cm ?? 30,
    widthCm: p.width_cm ?? 20,
    heightCm: p.height_cm ?? 5,
    returnAvailable: p.return_available ?? true,
    returnWindowHours: p.return_window_hours ?? 24,
    cancellationAvailable: p.cancellation_available ?? true,
    tags: Array.isArray(p.tags) ? p.tags : [],
    attributes: p.attributes || {},
    seoTitle: p.seo_title || '',
    seoDescription: p.seo_description || '',
    slug: p.slug || p.id,
    active: p.active ?? true,
    createdAt: p.created_at,
    variants: variants.map(mapVariant),
  };
}

function mapVariant(v) {
  return {
    id: v.id,
    productId: v.product_id,
    colorName: v.color_name,
    colorCode: v.color_code || '',
    sku: v.sku || '',
    price: v.price != null ? Number(v.price) : null,
    mrp: v.mrp != null ? Number(v.mrp) : null,
    stock: Number(v.stock) || 0,
    weightGrams: v.weight_grams != null ? Number(v.weight_grams) : null,
    images: Array.isArray(v.images) ? v.images : [],
    active: v.active ?? true,
    createdAt: v.created_at,
  };
}

// GET /api/products — public catalog with lightweight columns + active color variants
router.get('/', async (req, res) => {
  const { category } = req.query;
  const listColumns = `
    id, name, category_id, price, mrp, stock, sku, short_description,
    image, hover_image, weight_grams, return_available, return_window_hours, cancellation_available,
    active, created_at
  `;

  const { rows } = category
    ? await query(`SELECT ${listColumns} FROM products WHERE active = true AND category_id = $1 ORDER BY created_at DESC`, [category])
    : await query(`SELECT ${listColumns} FROM products WHERE active = true ORDER BY created_at DESC`);

  if (!rows.length) return res.json({ products: [] });

  const productIds = rows.map((p) => p.id);
  const { rows: variantRows } = await query(
    `SELECT id, product_id, color_name, color_code, sku, price, mrp, stock, weight_grams, images, active
     FROM product_variants
     WHERE product_id = ANY($1) AND active = true
     ORDER BY id ASC`,
    [productIds]
  );

  const variantsByProduct = {};
  for (const v of variantRows) {
    if (!variantsByProduct[v.product_id]) variantsByProduct[v.product_id] = [];
    variantsByProduct[v.product_id].push(v);
  }

  res.json({
    products: rows.map((p) => mapProduct(p, variantsByProduct[p.id] || [])),
  });
});

// GET /api/products/admin/all — all products with lightweight list columns (prevents multi-megabyte payloads)
router.get('/admin/all', requireAdmin, async (_req, res) => {
  const adminListColumns = `
    id, name, category_id, price, mrp, stock, sku, short_description,
    image, hover_image, active, created_at,
    (SELECT COUNT(*) FROM product_variants WHERE product_id = products.id) AS variant_count
  `;
  const { rows } = await query(`SELECT ${adminListColumns} FROM products ORDER BY created_at DESC`);
  if (!rows.length) return res.json({ products: [] });

  res.json({
    products: rows.map((p) => mapProduct(p, [])),
  });
});

// GET /api/products/:id — single product with all variants (admins can view inactive products)
router.get('/:id', async (req, res) => {
  const isAdmin = Boolean(req.user?.isAdmin);
  const { rows } = isAdmin
    ? await query('SELECT * FROM products WHERE id = $1', [req.params.id])
    : await query('SELECT * FROM products WHERE id = $1 AND active = true', [req.params.id]);

  if (!rows[0]) return res.status(404).json({ error: 'Product not found.' });

  const { rows: variantRows } = isAdmin
    ? await query('SELECT * FROM product_variants WHERE product_id = $1 ORDER BY id ASC', [req.params.id])
    : await query('SELECT * FROM product_variants WHERE product_id = $1 AND active = true ORDER BY id ASC', [req.params.id]);

  res.json({ product: mapProduct(rows[0], variantRows) });
});

// POST /api/products — admin create product with optional initial variants
router.post('/', requireAdmin, async (req, res) => {
  const {
    name,
    category,
    price,
    mrp,
    stock,
    sku,
    shortDescription,
    description,
    image,
    hoverImage,
    hover_image,
    images,
    weightGrams,
    lengthCm,
    widthCm,
    heightCm,
    returnAvailable,
    returnWindowHours,
    cancellationAvailable,
    tags,
    attributes,
    seoTitle,
    seoDescription,
    slug,
    variants,
  } = req.body || {};

  if (!name?.trim() || !category) return res.status(400).json({ error: 'name and category are required.' });

  const id = 'p' + Date.now();
  const cleanSlug = (slug || name).trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  const cleanSku = (sku || `SK-${id.toUpperCase()}`).trim();
  const finalHoverImage = (hoverImage !== undefined ? hoverImage : hover_image) || '';

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const insertResult = await client.query(
      `INSERT INTO products (
         id, name, category_id, price, mrp, stock, sku, short_description, description,
         image, hover_image, images, weight_grams, length_cm, width_cm, height_cm,
         return_available, return_window_hours, cancellation_available,
         tags, attributes, seo_title, seo_description, slug
       ) VALUES (
         $1, $2, $3, $4, $5, $6, $7, $8, $9,
         $10, $11, $12::jsonb, $13, $14, $15, $16,
         $17, $18, $19,
         $20, $21::jsonb, $22, $23, $24
       ) RETURNING *`,
      [
        id,
        name.trim(),
        category,
        Number(price) || 0,
        Number(mrp) || Number(price) || 0,
        Number(stock) || 0,
        cleanSku,
        shortDescription || '',
        description || '',
        image || '',
        finalHoverImage,
        JSON.stringify(Array.isArray(images) ? images : []),
        Number(weightGrams) || 500,
        Number(lengthCm) || 30,
        Number(widthCm) || 20,
        Number(heightCm) || 5,
        returnAvailable !== false,
        Number(returnWindowHours) || 24,
        cancellationAvailable !== false,
        Array.isArray(tags) ? tags : [],
        JSON.stringify(attributes || {}),
        seoTitle || '',
        seoDescription || '',
        cleanSlug,
      ]
    );

    const insertedVariants = [];
    if (Array.isArray(variants) && variants.length) {
      for (const v of variants) {
        if (!v.colorName?.trim()) continue;
        const vResult = await client.query(
          `INSERT INTO product_variants (
             product_id, color_name, color_code, sku, price, mrp, stock, weight_grams, images, active
           ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10) RETURNING *`,
          [
            id,
            v.colorName.trim(),
            v.colorCode || '',
            v.sku || `${cleanSku}-${v.colorName.trim().toUpperCase().slice(0, 3)}`,
            v.price != null ? Number(v.price) : null,
            v.mrp != null ? Number(v.mrp) : null,
            Number(v.stock) || 0,
            v.weightGrams != null ? Number(v.weightGrams) : null,
            JSON.stringify(Array.isArray(v.images) ? v.images : []),
            v.active !== false,
          ]
        );
        insertedVariants.push(vResult.rows[0]);
      }
    }

    await client.query('COMMIT');
    res.status(201).json({ product: mapProduct(insertResult.rows[0], insertedVariants) });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[products/create]', err);
    res.status(500).json({ error: 'Could not create product. ' + err.message });
  } finally {
    client.release();
  }
});

// PUT /api/products/:id — admin update product and its variants
router.put('/:id', requireAdmin, async (req, res) => {
  const {
    name,
    category,
    price,
    mrp,
    stock,
    sku,
    shortDescription,
    description,
    image,
    hoverImage,
    hover_image,
    images,
    weightGrams,
    lengthCm,
    widthCm,
    heightCm,
    returnAvailable,
    returnWindowHours,
    cancellationAvailable,
    tags,
    attributes,
    seoTitle,
    seoDescription,
    slug,
    active,
    variants,
  } = req.body || {};

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const passedHover = hoverImage !== undefined ? hoverImage : (hover_image !== undefined ? hover_image : null);

    const { rows } = await client.query(
      `UPDATE products SET
         name = COALESCE($1, name),
         category_id = COALESCE($2, category_id),
         price = COALESCE($3, price),
         mrp = COALESCE($4, mrp),
         stock = COALESCE($5, stock),
         sku = COALESCE($6, sku),
         short_description = COALESCE($7, short_description),
         description = COALESCE($8, description),
         image = COALESCE($9, image),
         hover_image = COALESCE($10, hover_image),
         images = COALESCE($11::jsonb, images),
         weight_grams = COALESCE($12, weight_grams),
         length_cm = COALESCE($13, length_cm),
         width_cm = COALESCE($14, width_cm),
         height_cm = COALESCE($15, height_cm),
         return_available = COALESCE($16, return_available),
         return_window_hours = COALESCE($17, return_window_hours),
         cancellation_available = COALESCE($18, cancellation_available),
         tags = COALESCE($19, tags),
         attributes = COALESCE($20::jsonb, attributes),
         seo_title = COALESCE($21, seo_title),
         seo_description = COALESCE($22, seo_description),
         slug = COALESCE($23, slug),
         active = COALESCE($24, active),
         updated_at = now()
       WHERE id = $25 RETURNING *`,
      [
        name,
        category,
        price != null ? Number(price) : null,
        mrp != null ? Number(mrp) : null,
        stock != null ? Number(stock) : null,
        sku,
        shortDescription,
        description,
        image,
        passedHover,
        images !== undefined ? JSON.stringify(images) : null,
        weightGrams != null ? Number(weightGrams) : null,
        lengthCm != null ? Number(lengthCm) : null,
        widthCm != null ? Number(widthCm) : null,
        heightCm != null ? Number(heightCm) : null,
        returnAvailable,
        returnWindowHours != null ? Number(returnWindowHours) : null,
        cancellationAvailable,
        tags,
        attributes !== undefined ? JSON.stringify(attributes) : null,
        seoTitle,
        seoDescription,
        slug,
        active,
        req.params.id,
      ]
    );

    if (!rows[0]) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Product not found.' });
    }

    // If variants array is provided, sync variants
    if (Array.isArray(variants)) {
      const incomingIds = variants.filter((v) => v.id).map((v) => v.id);
      if (incomingIds.length) {
        await client.query('DELETE FROM product_variants WHERE product_id = $1 AND id != ALL($2)', [req.params.id, incomingIds]);
      }

      for (const v of variants) {
        if (!v.colorName?.trim()) continue;
        if (v.id) {
          await client.query(
            `UPDATE product_variants SET
               color_name = $1, color_code = $2, sku = $3, price = $4, mrp = $5, stock = $6,
               weight_grams = $7, images = $8::jsonb, active = $9, updated_at = now()
             WHERE id = $10 AND product_id = $11`,
            [
              v.colorName.trim(),
              v.colorCode || '',
              v.sku || '',
              v.price != null ? Number(v.price) : null,
              v.mrp != null ? Number(v.mrp) : null,
              Number(v.stock) || 0,
              v.weightGrams != null ? Number(v.weightGrams) : null,
              JSON.stringify(Array.isArray(v.images) ? v.images : []),
              v.active !== false,
              v.id,
              req.params.id,
            ]
          );
        } else {
          await client.query(
            `INSERT INTO product_variants (
               product_id, color_name, color_code, sku, price, mrp, stock, weight_grams, images, active
             ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10)`,
            [
              req.params.id,
              v.colorName.trim(),
              v.colorCode || '',
              v.sku || '',
              v.price != null ? Number(v.price) : null,
              v.mrp != null ? Number(v.mrp) : null,
              Number(v.stock) || 0,
              v.weightGrams != null ? Number(v.weightGrams) : null,
              JSON.stringify(Array.isArray(v.images) ? v.images : []),
              v.active !== false,
            ]
          );
        }
      }
    }

    const { rows: currentVariants } = await client.query(
      'SELECT * FROM product_variants WHERE product_id = $1 ORDER BY id ASC',
      [req.params.id]
    );

    await client.query('COMMIT');
    res.json({ product: mapProduct(rows[0], currentVariants) });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[products/update]', err);
    res.status(500).json({ error: 'Could not update product. ' + err.message });
  } finally {
    client.release();
  }
});

// DELETE /api/products/:id — admin delete product
router.delete('/:id', requireAdmin, async (req, res) => {
  await query('DELETE FROM products WHERE id = $1', [req.params.id]);
  res.json({ ok: true });
});

// --- Variant specific subroutes ---
router.post('/:id/variants', requireAdmin, async (req, res) => {
  const { colorName, colorCode, sku, price, mrp, stock, weightGrams, images, active } = req.body || {};
  if (!colorName?.trim()) return res.status(400).json({ error: 'Color name is required.' });

  const { rows } = await query(
    `INSERT INTO product_variants (
       product_id, color_name, color_code, sku, price, mrp, stock, weight_grams, images, active
     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10) RETURNING *`,
    [
      req.params.id,
      colorName.trim(),
      colorCode || '',
      sku || '',
      price != null ? Number(price) : null,
      mrp != null ? Number(mrp) : null,
      Number(stock) || 0,
      weightGrams != null ? Number(weightGrams) : null,
      JSON.stringify(Array.isArray(images) ? images : []),
      active !== false,
    ]
  );
  res.status(201).json({ variant: mapVariant(rows[0]) });
});

router.put('/:id/variants/:variantId', requireAdmin, async (req, res) => {
  const { colorName, colorCode, sku, price, mrp, stock, weightGrams, images, active } = req.body || {};
  const { rows } = await query(
    `UPDATE product_variants SET
       color_name = COALESCE($1, color_name),
       color_code = COALESCE($2, color_code),
       sku = COALESCE($3, sku),
       price = $4,
       mrp = $5,
       stock = COALESCE($6, stock),
       weight_grams = $7,
       images = COALESCE($8::jsonb, images),
       active = COALESCE($9, active),
       updated_at = now()
     WHERE id = $10 AND product_id = $11 RETURNING *`,
    [
      colorName?.trim() || null,
      colorCode !== undefined ? colorCode : null,
      sku !== undefined ? sku : null,
      price !== undefined ? (price != null ? Number(price) : null) : null,
      mrp !== undefined ? (mrp != null ? Number(mrp) : null) : null,
      stock != null ? Number(stock) : null,
      weightGrams !== undefined ? (weightGrams != null ? Number(weightGrams) : null) : null,
      images !== undefined ? JSON.stringify(images) : null,
      active,
      req.params.variantId,
      req.params.id,
    ]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Variant not found.' });
  res.json({ variant: mapVariant(rows[0]) });
});

router.delete('/:id/variants/:variantId', requireAdmin, async (req, res) => {
  await query('DELETE FROM product_variants WHERE id = $1 AND product_id = $2', [req.params.variantId, req.params.id]);
  res.json({ ok: true });
});

export default router;
