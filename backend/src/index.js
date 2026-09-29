import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { ensureSchema } from './db.js';
import { attachUser } from './middleware/auth.js';

import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/categories.js';
import productRoutes from './routes/products.js';
import homeSectionRoutes from './routes/homeSections.js';
import reviewRoutes from './routes/reviews.js';
import orderRoutes from './routes/orders.js';
import couponRoutes from './routes/coupons.js';
import testimonialRoutes from './routes/testimonials.js';
import cancellationPolicyRoutes from './routes/cancellationPolicy.js';
import sitemapRoutes from './routes/sitemap.js';
import shippingRoutes from './routes/shipping.js';
import pickupLocationRoutes from './routes/pickupLocations.js';
import webhookRoutes from './routes/webhooks.js';
import returnRoutes from './routes/returns.js';
import settingsRoutes from './routes/settings.js';
import adminRoutes from './routes/admin.js';

const app = express();

// CLIENT_URL can be a single origin or a comma-separated list — handy once
// you're on Vercel, since preview deployments get their own throwaway URL
// alongside your main production domain.
const allowedOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (!allowedOrigins.length) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    console.warn(`[cors] rejected origin: ${origin} — allowed: ${allowedOrigins.join(', ')}`);
    callback(new Error('Not allowed by CORS'));
  },
}));

// Preserve rawBody for HMAC webhook verification (Razorpay, Shiprocket)
app.use(express.json({
  limit: '30mb',
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  },
}));
app.use(attachUser);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Not under /api — sitemaps live at the domain root by convention, and the
// frontend (Vercel) proxies /sitemap.xml to this exact path (see vercel.json).
app.use(sitemapRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/home-sections', homeSectionRoutes);
app.use('/api', reviewRoutes); // mounts /api/products/:id/reviews and /api/admin/reviews
app.use('/api/orders', orderRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/cancellation-policy', cancellationPolicyRoutes);
app.use('/api/shipping', shippingRoutes);
app.use('/api/pickup-locations', pickupLocationRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/returns', returnRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/admin', adminRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong on our end.' });
});

const PORT = process.env.PORT || 4000;

ensureSchema()
  .then(() => {
    app.listen(PORT, () => console.log(`Sri Kala API listening on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to the database. Check DATABASE_URL in server/.env');
    console.error(err.message);
    process.exit(1);
  });
