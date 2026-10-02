-- Ravichandra Textiles — full schema. Works on Neon now, and on plain Postgres (VPS) later
-- with zero changes — just point DATABASE_URL at the new instance.

CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  mobile        TEXT,
  is_admin      BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Set only for accounts that have signed in with Google at least once
-- (either created via Google, or an existing email/password account that
-- later linked Google sign-in). Lookup for login is always by email
-- either way — this is just a record of the link, not used to authenticate.
ALTER TABLE users ADD COLUMN IF NOT EXISTS google_id TEXT;

-- Forgot-password flow. We store a hash of the reset token (never the raw
-- token itself — same reasoning as password_hash on users), so a leaked DB
-- alone can't be used to reset anyone's account. The raw token only ever
-- exists in the emailed link and briefly in memory on this request.
CREATE TABLE IF NOT EXISTS password_resets (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at    TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_password_resets_user ON password_resets(user_id);


CREATE TABLE IF NOT EXISTS addresses (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  mobile     TEXT NOT NULL,
  line1      TEXT NOT NULL,
  city       TEXT NOT NULL,
  state      TEXT,
  pincode    TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS categories (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  image      TEXT,
  tagline    TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  category_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
  price       INTEGER NOT NULL DEFAULT 0,
  mrp         INTEGER NOT NULL DEFAULT 0,
  stock       INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  image       TEXT,
  hover_image TEXT,
  -- Extra gallery photos beyond the main `image` (cover), shown as a
  -- thumbnail strip on the product page. Array of image URLs / data URLs.
  images      JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Safe on every boot: adds the column for databases created before the
-- gallery feature existed. No-op once it's there.
ALTER TABLE products ADD COLUMN IF NOT EXISTS images JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE products ADD COLUMN IF NOT EXISTS hover_image TEXT;
-- Lets the admin hide a product from the storefront without deleting it
-- (and losing its order history / reviews link) — hidden products stay
-- fully visible and editable in the admin panel.
ALTER TABLE products ADD COLUMN IF NOT EXISTS active BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS active BOOLEAN NOT NULL DEFAULT TRUE;

-- Home page CMS — every section on the home screen is a row here, keyed by
-- a stable `section_key` (e.g. 'hero', 'promo_banner', 'featured_categories').
-- `content` is free-form JSON so the admin panel can add fields per-section
-- without a migration every time.
CREATE TABLE IF NOT EXISTS home_sections (
  section_key TEXT PRIMARY KEY,
  title       TEXT,
  enabled     BOOLEAN NOT NULL DEFAULT TRUE,
  content     JSONB NOT NULL DEFAULT '{}'::jsonb,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Testimonials — short customer quotes used in two places: a general
-- rotating band on the homepage (product_id NULL) and/or tied to a specific
-- product's detail page. Backend-stored (not localStorage) so an admin's
-- edits are visible to every visitor, not just their own browser.
CREATE TABLE IF NOT EXISTS testimonials (
  id         SERIAL PRIMARY KEY,
  product_id TEXT REFERENCES products(id) ON DELETE SET NULL,
  name       TEXT NOT NULL,
  rating     INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  text       TEXT NOT NULL,
  photo      TEXT,
  active     BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reviews (
  id         SERIAL PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating     INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment    TEXT,
  -- Up to 3 customer-uploaded photos of the product they received.
  photos     JSONB NOT NULL DEFAULT '[]'::jsonb,
  approved   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Safe on every boot: adds the column for databases created before review
-- photos existed. No-op once present.
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS photos JSONB NOT NULL DEFAULT '[]'::jsonb;

-- Coupons — admin-created discount codes. `type` is 'percent' or 'flat'.
-- One redemption per user per coupon is enforced at the DB level via the
-- unique constraint on coupon_redemptions below, not just app logic, so it
-- holds up even under concurrent requests.
CREATE TABLE IF NOT EXISTS coupons (
  id          SERIAL PRIMARY KEY,
  code        TEXT NOT NULL UNIQUE,
  type        TEXT NOT NULL DEFAULT 'percent', -- percent | flat
  value       INTEGER NOT NULL,                -- percent: 1-100, flat: rupees
  min_order   INTEGER NOT NULL DEFAULT 0,
  active      BOOLEAN NOT NULL DEFAULT TRUE,
  expires_at  TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id                 SERIAL PRIMARY KEY,
  user_id            INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  razorpay_order_id  TEXT UNIQUE,
  razorpay_payment_id TEXT,
  status             TEXT NOT NULL DEFAULT 'created', -- created | paid | failed | paid_oversold | cancelled
  subtotal           INTEGER NOT NULL,
  shipping_fee       INTEGER NOT NULL DEFAULT 0,
  coupon_id          INTEGER REFERENCES coupons(id) ON DELETE SET NULL,
  coupon_code        TEXT,
  discount           INTEGER NOT NULL DEFAULT 0,
  address_name       TEXT,
  address_mobile     TEXT,
  address_line1      TEXT,
  address_city       TEXT,
  address_state      TEXT,
  address_pincode    TEXT,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  paid_at            TIMESTAMPTZ,
  cancelled_at       TIMESTAMPTZ,
  refund_percent     INTEGER,
  refund_amount      INTEGER
);

-- Safe on every boot: adds these columns for databases created before
-- coupons/cancellation existed. No-op once present.
ALTER TABLE orders ADD COLUMN IF NOT EXISTS coupon_id INTEGER REFERENCES coupons(id) ON DELETE SET NULL;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS coupon_code TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS discount INTEGER NOT NULL DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMPTZ;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS refund_percent INTEGER;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS refund_amount INTEGER;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_fee INTEGER NOT NULL DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tax_amount INTEGER NOT NULL DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS gst_rate NUMERIC(5,2) DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS gst_type TEXT DEFAULT 'inclusive';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS gstin TEXT;

-- Cancellation policy — fully admin-editable tiers, e.g. "within 1 day,
-- 100% refund" / "within 3 days, 50% refund". max_days is the cutoff (in
-- whole days since payment) that tier applies up to; the app picks the
-- first tier (sorted by max_days ascending) the order still qualifies for.
CREATE TABLE IF NOT EXISTS cancellation_policy (
  id             SERIAL PRIMARY KEY,
  label          TEXT NOT NULL,
  max_days       INTEGER NOT NULL,
  refund_percent INTEGER NOT NULL CHECK (refund_percent BETWEEN 0 AND 100),
  sort_order     INTEGER NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Records that a user has used a given coupon. Inserted once payment is
-- confirmed (not just on "apply"), so an abandoned checkout doesn't burn a
-- customer's one-time use of a code. The unique constraint is what actually
-- guarantees "once per account", even if two requests race.
CREATE TABLE IF NOT EXISTS coupon_redemptions (
  id           SERIAL PRIMARY KEY,
  coupon_id    INTEGER NOT NULL REFERENCES coupons(id) ON DELETE CASCADE,
  user_id      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  order_id     INTEGER REFERENCES orders(id) ON DELETE SET NULL,
  redeemed_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (coupon_id, user_id)
);

CREATE TABLE IF NOT EXISTS order_items (
  id           SERIAL PRIMARY KEY,
  order_id     INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id   TEXT REFERENCES products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_image TEXT,
  price        INTEGER NOT NULL,
  qty          INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_coupon_redemptions_user ON coupon_redemptions(user_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_product ON testimonials(product_id);

-- Address extensions
ALTER TABLE addresses ADD COLUMN IF NOT EXISTS line2 TEXT;
ALTER TABLE addresses ADD COLUMN IF NOT EXISTS country TEXT NOT NULL DEFAULT 'India';
ALTER TABLE addresses ADD COLUMN IF NOT EXISTS is_default BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE addresses ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

-- Category extensions
ALTER TABLE categories ADD COLUMN IF NOT EXISTS banner_image TEXT;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS slug TEXT;

-- Product extensions (weight, dimensions, SKU, return & cancellation policies, tags, attributes, SEO)
ALTER TABLE products ADD COLUMN IF NOT EXISTS weight_grams INTEGER NOT NULL DEFAULT 500;
ALTER TABLE products ADD COLUMN IF NOT EXISTS length_cm NUMERIC(6,2) DEFAULT 30;
ALTER TABLE products ADD COLUMN IF NOT EXISTS width_cm NUMERIC(6,2) DEFAULT 20;
ALTER TABLE products ADD COLUMN IF NOT EXISTS height_cm NUMERIC(6,2) DEFAULT 5;
ALTER TABLE products ADD COLUMN IF NOT EXISTS sku TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS short_description TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS return_available BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE products ADD COLUMN IF NOT EXISTS return_window_hours INTEGER NOT NULL DEFAULT 24;
ALTER TABLE products ADD COLUMN IF NOT EXISTS cancellation_available BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE products ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
ALTER TABLE products ADD COLUMN IF NOT EXISTS attributes JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE products ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

-- Product color variants
CREATE TABLE IF NOT EXISTS product_variants (
  id           SERIAL PRIMARY KEY,
  product_id   TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  color_name   TEXT NOT NULL,
  color_code   TEXT,
  sku          TEXT,
  price        INTEGER,
  mrp          INTEGER,
  stock        INTEGER NOT NULL DEFAULT 0,
  weight_grams INTEGER,
  images       JSONB NOT NULL DEFAULT '[]'::jsonb,
  active       BOOLEAN NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_product_variants_product ON product_variants(product_id);

-- Shiprocket pickup locations
CREATE TABLE IF NOT EXISTS pickup_locations (
  id                   SERIAL PRIMARY KEY,
  pickup_location_name TEXT NOT NULL UNIQUE,
  name                 TEXT NOT NULL,
  email                TEXT,
  phone                TEXT NOT NULL,
  address              TEXT NOT NULL,
  address_2            TEXT,
  city                 TEXT NOT NULL,
  state                TEXT NOT NULL,
  pincode              TEXT NOT NULL,
  country              TEXT NOT NULL DEFAULT 'India',
  is_default           BOOLEAN NOT NULL DEFAULT FALSE,
  active               BOOLEAN NOT NULL DEFAULT TRUE,
  shiprocket_id        TEXT,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Coupon extensions
ALTER TABLE coupons ADD COLUMN IF NOT EXISTS max_discount INTEGER;
ALTER TABLE coupons ADD COLUMN IF NOT EXISTS start_date TIMESTAMPTZ;
ALTER TABLE coupons ADD COLUMN IF NOT EXISTS usage_limit INTEGER;
ALTER TABLE coupons ADD COLUMN IF NOT EXISTS per_user_limit INTEGER NOT NULL DEFAULT 1;
ALTER TABLE coupons ADD COLUMN IF NOT EXISTS applicable_categories TEXT[] DEFAULT '{}';
ALTER TABLE coupons ADD COLUMN IF NOT EXISTS applicable_products TEXT[] DEFAULT '{}';
ALTER TABLE coupons ADD COLUMN IF NOT EXISTS first_order_only BOOLEAN NOT NULL DEFAULT FALSE;

-- Order extensions for full lifecycle, Shiprocket tracking, and payment statuses
ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_number TEXT UNIQUE;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'PENDING';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipment_status TEXT NOT NULL DEFAULT 'PENDING';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS total_weight_grams INTEGER NOT NULL DEFAULT 500;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS total_amount INTEGER;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tax_amount INTEGER NOT NULL DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS address_line2 TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS address_country TEXT NOT NULL DEFAULT 'India';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS pickup_location_id INTEGER REFERENCES pickup_locations(id) ON DELETE SET NULL;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS razorpay_signature TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shiprocket_order_id TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shiprocket_shipment_id TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS awb_code TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS courier_name TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS courier_company_id TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS etd TIMESTAMPTZ;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_url TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_history JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS cancellation_reason TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS cancellation_requested_at TIMESTAMPTZ;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS cancellation_reject_reason TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS cancelled_by TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipped_at TIMESTAMPTZ;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivered_at TIMESTAMPTZ;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

-- Order items extensions (variants and return policy snapshots)
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS variant_id INTEGER REFERENCES product_variants(id) ON DELETE SET NULL;
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS variant_name TEXT;
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS sku TEXT;
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS mrp INTEGER NOT NULL DEFAULT 0;
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS weight_grams INTEGER NOT NULL DEFAULT 500;
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS return_available BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS return_window_hours INTEGER NOT NULL DEFAULT 24;
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS cancellation_available BOOLEAN NOT NULL DEFAULT TRUE;

-- Return requests
CREATE TABLE IF NOT EXISTS return_requests (
  id            SERIAL PRIMARY KEY,
  order_id      INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  order_item_id INTEGER NOT NULL REFERENCES order_items(id) ON DELETE CASCADE,
  user_id       INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reason        TEXT NOT NULL,
  details       TEXT,
  photos        JSONB NOT NULL DEFAULT '[]'::jsonb,
  status        TEXT NOT NULL DEFAULT 'PENDING', -- PENDING | APPROVED | REJECTED | PICKED_UP | RECEIVED | REFUNDED
  admin_notes   TEXT,
  refund_amount INTEGER,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_return_requests_order ON return_requests(order_id);
CREATE INDEX IF NOT EXISTS idx_return_requests_user ON return_requests(user_id);

-- Refunds tracking
CREATE TABLE IF NOT EXISTS refunds (
  id                 SERIAL PRIMARY KEY,
  order_id           INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  payment_id         TEXT,
  razorpay_refund_id TEXT UNIQUE,
  amount             INTEGER NOT NULL,
  status             TEXT NOT NULL DEFAULT 'processed',
  reason             TEXT,
  initiated_by       TEXT,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at       TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_refunds_order ON refunds(order_id);

-- Webhook events for idempotency
CREATE TABLE IF NOT EXISTS webhook_events (
  id          SERIAL PRIMARY KEY,
  event_id    TEXT NOT NULL,
  source      TEXT NOT NULL, -- 'razorpay' | 'shiprocket'
  event_type  TEXT NOT NULL,
  payload     JSONB NOT NULL,
  processed   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (source, event_id)
);

-- Audit logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id          SERIAL PRIMARY KEY,
  admin_id    INTEGER REFERENCES users(id) ON DELETE SET NULL,
  admin_email TEXT,
  action      TEXT NOT NULL,
  entity      TEXT NOT NULL,
  entity_id   TEXT,
  metadata    JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at DESC);

-- Global CMS and store settings
CREATE TABLE IF NOT EXISTS settings (
  key        TEXT PRIMARY KEY,
  value      JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

