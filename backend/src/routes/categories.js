import { Router } from 'express';
import { query } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';

import { saveImageToDisk } from '../lib/storage.js';

const router = Router();

router.get('/', async (_req, res) => {
  const { rows } = await query('SELECT * FROM categories WHERE active = true ORDER BY sort_order ASC, created_at ASC');
  res.json({ categories: rows });
});

// GET /api/categories/admin/all — every category regardless of active
// status, for the admin panel (which needs to see hidden ones to unhide
// them).
router.get('/admin/all', requireAdmin, async (_req, res) => {
  const { rows } = await query('SELECT * FROM categories ORDER BY sort_order ASC, created_at ASC');
  res.json({ categories: rows });
});

router.post('/', requireAdmin, async (req, res) => {
  const { id, name, image, bannerImage, tagline, description, slug, sortOrder } = req.body || {};
  if (!id?.trim() || !name?.trim()) return res.status(400).json({ error: 'id and name are required.' });
  const cleanSlug = (slug || id).trim().toLowerCase().replace(/\s+/g, '-');
  const savedImage = await saveImageToDisk(image, 'categories', 1200, 80);
  const savedBanner = await saveImageToDisk(bannerImage, 'categories', 1600, 80);
  const { rows } = await query(
    `INSERT INTO categories (id, name, image, banner_image, tagline, description, slug, sort_order)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     ON CONFLICT (id) DO UPDATE SET
       name=$2, image=$3, banner_image=$4, tagline=$5, description=$6, slug=$7, sort_order=$8 RETURNING *`,
    [id.trim(), name.trim(), savedImage || null, savedBanner || null, tagline || null, description || null, cleanSlug, sortOrder ?? 0]
  );
  res.status(201).json({ category: rows[0] });
});

router.put('/:id', requireAdmin, async (req, res) => {
  const { name, image, bannerImage, tagline, description, slug, sortOrder, active } = req.body || {};
  const savedImage = image !== undefined ? await saveImageToDisk(image, 'categories', 1200, 80) : undefined;
  const savedBanner = bannerImage !== undefined ? await saveImageToDisk(bannerImage, 'categories', 1600, 80) : undefined;
  const { rows } = await query(
    `UPDATE categories SET
       name = COALESCE($1, name),
       image = COALESCE($2, image),
       banner_image = COALESCE($3, banner_image),
       tagline = COALESCE($4, tagline),
       description = COALESCE($5, description),
       slug = COALESCE($6, slug),
       sort_order = COALESCE($7, sort_order),
       active = COALESCE($8, active)
     WHERE id = $9 RETURNING *`,
    [name, savedImage, savedBanner, tagline, description, slug, sortOrder, active, req.params.id]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Category not found.' });
  res.json({ category: rows[0] });
});

router.delete('/:id', requireAdmin, async (req, res) => {
  await query('DELETE FROM categories WHERE id = $1', [req.params.id]);
  res.json({ ok: true });
});

export default router;
