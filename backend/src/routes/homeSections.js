import { Router } from 'express';
import { query } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// Public: only enabled sections, in display order — this is what the home
// screen renders from.
router.get('/', async (_req, res) => {
  const { rows } = await query(
    'SELECT * FROM home_sections WHERE enabled = TRUE ORDER BY sort_order ASC'
  );
  res.json({ sections: rows });
});

// Admin: every section including disabled ones, so the CMS can toggle them.
// Must be registered BEFORE the public GET /:key below — Express matches
// routes in registration order, and /:key matches any single path segment
// including literally "all", which would otherwise shadow this admin
// route entirely.
router.get('/all', requireAdmin, async (_req, res) => {
  const { rows } = await query('SELECT * FROM home_sections ORDER BY sort_order ASC');
  res.json({ sections: rows });
});

// Public: a single section by key. For anything that only needs ONE
// section's content (e.g. the footer reading social_links) rather than
// the whole home page — GET / returns every enabled section's full
// content in one payload, which includes things like hero video (stored
// raw, since video can't be resized the way photos are; easily several
// MB). Footer.jsx renders on every page site-wide, so before this existed
// it was fetching that entire payload — hero video included — on every
// single page view, not just when someone visited Home.
router.get('/:key', async (req, res) => {
  const { rows } = await query(
    'SELECT * FROM home_sections WHERE section_key = $1 AND enabled = TRUE',
    [req.params.key]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Section not found.' });
  res.json({ section: rows[0] });
});

const DEFAULT_SORT_ORDERS = {
  hero: 1,
  ticker: 2,
  showcase: 3,
  featured_categories: 4,
  promo_banner: 5,
  new_arrivals: 6,
  featured: 6,
  process: 7,
  shop_by_style: 8,
  recommended: 9,
  story: 10,
  google_reviews: 11,
  about_hero: 13,
  about_story: 14,
  products_hero: 15,
};

router.put('/:key', requireAdmin, async (req, res) => {
  const { title, enabled, content, sortOrder } = req.body || {};
  const effectiveSort = sortOrder ?? DEFAULT_SORT_ORDERS[req.params.key] ?? 50;
  const { rows } = await query(
    `INSERT INTO home_sections (section_key, title, enabled, content, sort_order, updated_at)
     VALUES ($1,$2,$3, COALESCE($4::jsonb, '{}'::jsonb), $5, now())
     ON CONFLICT (section_key) DO UPDATE SET
       title = COALESCE($2, home_sections.title),
       enabled = COALESCE($3, home_sections.enabled),
       content = COALESCE($4::jsonb, home_sections.content),
       sort_order = COALESCE($5, home_sections.sort_order),
       updated_at = now()
     RETURNING *`,
    // content is only passed through when the caller actually sent one —
    // otherwise this stays NULL, so a brand-new row falls back to '{}' and
    // an existing row keeps what it already had. This matters because a
    // visibility toggle (enabled-only, no content) must never blank out a
    // section's saved text/media.
    [req.params.key, title ?? null, enabled ?? true, content !== undefined ? JSON.stringify(content) : null, effectiveSort]
  );
  res.json({ section: rows[0] });
});

router.delete('/:key', requireAdmin, async (req, res) => {
  await query('DELETE FROM home_sections WHERE section_key = $1', [req.params.key]);
  res.json({ ok: true });
});

export default router;
