import { Router } from 'express';
import { query } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/settings — Public read of general store settings
router.get('/', async (_req, res) => {
  const { rows } = await query('SELECT key, value FROM settings');
  const map = {};
  for (const row of rows) {
    map[row.key] = row.value;
  }
  res.json({ settings: map });
});

// GET /api/settings/:key
router.get('/:key', async (req, res) => {
  const { rows } = await query('SELECT value FROM settings WHERE key = $1', [req.params.key]);
  res.json({ key: req.params.key, value: rows[0]?.value || null });
});

// PUT /api/settings/:key — Admin update of a setting
router.put('/:key', requireAdmin, async (req, res) => {
  const { value } = req.body;
  const { rows } = await query(
    `INSERT INTO settings (key, value, updated_at)
     VALUES ($1, $2, now())
     ON CONFLICT (key) DO UPDATE
     SET value = EXCLUDED.value, updated_at = now()
     RETURNING *`,
    [req.params.key, JSON.stringify(value)]
  );

  res.json({ setting: rows[0] });
});

export default router;
