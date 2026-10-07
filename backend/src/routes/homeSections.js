import { Router } from 'express';
import { query } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

const defaultHeroSlides = [
  {
    id: 'hero-photo-1',
    type: 'image',
    url: '/images/hero-slide-1.jpg',
    mobileUrl: '/images/hero-mobile-slide-1.jpg',
    alt: 'Handwoven Heritage Saree - Ravichandra Textiles',
    eyebrow: '',
    heading: 'Handwoven Heritage.',
    headingAccent: 'Woven for Generations.',
    subheading: 'Handwoven silk sarees created in limited existence — crafted slowly, woven with heritage, and never mass produced.',
    ctaLabel: 'Explore All Collections »',
    ctaLink: '/products',
  },
  {
    id: 'hero-photo-2',
    type: 'image',
    url: '/images/hero-slide-2.jpg',
    mobileUrl: '/images/hero-mobile-slide-2.jpg',
    alt: 'Temple Traditions Dharmavaram Silk Saree',
    eyebrow: 'TEMPLE TRADITIONS',
    heading: 'Temple Traditions.',
    headingAccent: 'Woven in Sacred Zari.',
    subheading: 'Authentic Dharmavaram & Kanchivaram silks, handpicked for divine celebrations and weddings.',
    ctaLabel: 'Shop Dharmavaram »',
    ctaLink: '/products?category=kanjivaram',
  },
  {
    id: 'hero-photo-3',
    type: 'image',
    url: '/images/hero-slide-3.jpg',
    alt: 'Royal Bridal Weaves - Dharmavaram Silk',
    eyebrow: 'ROYAL WEAVES',
    heading: 'Royal Bridal Weaves.',
    headingAccent: 'Heirloom for Lifetimes.',
    subheading: 'Master artisan craftsmanship with pure mulberry silk and authentic silk mark certification.',
    ctaLabel: 'Discover Bridal Pattu »',
    ctaLink: '/products?category=banarasi',
  },
];

function sanitizeHeroSection(row) {
  if (!row || row.section_key !== 'hero' || !row.content) return row;
  let slides = Array.isArray(row.content.slides) ? row.content.slides : [];
  slides = slides.filter((s) => s.type !== 'video' && !s.url?.endsWith?.('.mp4'));
  if (!slides.length) {
    slides = defaultHeroSlides;
  }
  return {
    ...row,
    content: {
      ...row.content,
      slides,
    },
  };
}

// Public: only enabled sections, in display order — this is what the home
// screen renders from.
router.get('/', async (_req, res) => {
  const { rows } = await query(
    'SELECT * FROM home_sections WHERE enabled = TRUE ORDER BY sort_order ASC'
  );
  res.json({ sections: rows.map(sanitizeHeroSection) });
});

// Admin: every section including disabled ones, so the CMS can toggle them.
router.get('/all', requireAdmin, async (_req, res) => {
  const { rows } = await query('SELECT * FROM home_sections ORDER BY sort_order ASC');
  res.json({ sections: rows.map(sanitizeHeroSection) });
});

const DEFAULT_SECTION_FALLBACKS = {
  products_hero: {
    title: 'Products Page — Curved Hero Header',
    sort_order: 15,
    enabled: true,
    content: {
      badge: 'HERITAGE HANDLOOMS',
      title: 'Our Collection',
      description: "Rooted in Andhra Pradesh's weaving heritage, our sarees are crafted slowly, thoughtfully, and meant to be treasured for a lifetime.",
      image: '/images/collection-hero-artisan.jpg',
    },
  },
  about_hero: {
    title: 'About Page — Header',
    sort_order: 13,
    enabled: true,
    content: {
      eyebrow: 'ABOUT RAVICHANDRA TEXTILES',
      heading: 'Curating Dharmavaram & Indian Heritage, Honoring Timeless Artistry',
      subtitle: 'Woven slowly on traditional pit looms in Dharmavaram, honoring centuries of sacred weaving devotion and pure zari craftsmanship.',
      image: '/images/about-hero-artisan.jpg',
    },
  },
  about_story: {
    title: 'About Page — Our Story',
    sort_order: 14,
    enabled: true,
    content: {
      heading: 'Our story',
      paragraphs: [
        'Ravichandra Textiles celebrates the timeless beauty of Indian craftsmanship. We bring together thoughtfully selected Dharmavaram pure silk sarees that honour traditional artistry while fitting effortlessly into the modern wardrobe.',
        'From pure temple-woven silks and intricate brocades to breathable everyday handlooms, each piece is chosen for its character, richness of weave, and fine craftsmanship.',
        'Every saree that reaches you has been checked by hand for weave quality, zari luster and finish before it leaves our store.',
      ],
      image: 'https://images.unsplash.com/photo-1717585679395-bbe39b5fb6bc?auto=format&fit=crop&w=1600&q=80',
      gallery: [],
    },
  },
  social_links: {
    title: 'Footer — Social & Contact Links',
    sort_order: 20,
    enabled: true,
    content: {
      whatsapp: '+918317551337',
      facebook: 'https://www.facebook.com/ravichandrahandlooms',
      twitter: 'https://twitter.com/ravichandratextiles',
      instagram: 'https://www.instagram.com/ravichandra_handlooms',
    },
  },
  shipping_settings: {
    title: 'Shipping Settings',
    sort_order: 5,
    enabled: true,
    content: {
      fee: 100,
      freeThreshold: 0,
    },
  },
};

// Public: a single section by key.
router.get('/:key', async (req, res) => {
  const { rows } = await query(
    'SELECT * FROM home_sections WHERE section_key = $1 AND enabled = TRUE',
    [req.params.key]
  );
  if (!rows[0]) {
    const fallback = DEFAULT_SECTION_FALLBACKS[req.params.key];
    if (fallback) {
      // Auto-insert in background so DB has it for next time
      query(
        `INSERT INTO home_sections (section_key, title, enabled, content, sort_order)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (section_key) DO NOTHING`,
        [
          req.params.key,
          fallback.title,
          fallback.enabled,
          JSON.stringify(fallback.content),
          fallback.sort_order,
        ]
      ).catch((err) => console.warn('Auto-seed fallback notice:', err?.message));

      return res.json({
        section: {
          section_key: req.params.key,
          ...fallback,
        },
      });
    }
    return res.status(404).json({ error: 'Section not found.' });
  }
  res.json({ section: sanitizeHeroSection(rows[0]) });
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
