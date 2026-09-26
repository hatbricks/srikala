# Sri Kala — Backend API

Node.js / Express backend API with PostgreSQL database, JWT authentication, Razorpay payments, and Resend transactional emails for **Sri Kala Silk Emporium**.

## Quick Start

1. **Configure Environment:**
   ```bash
   cp .env.example .env
   # Edit .env and supply DATABASE_URL and JWT_SECRET
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Seed Database:**
   ```bash
   npm run seed
   # Creates database schema, seeds default sarees/categories/sections, and outputs admin credentials
   ```

4. **Start the API:**
   - Development (with live watch):
     ```bash
     npm run dev
     ```
   - Production:
     ```bash
     npm start
     ```

The API starts on http://localhost:4000.

## Endpoints Overview

- `/api/auth` — Signup, Login, Profile, Password Resets, Google Sign-in
- `/api/categories` — Browse and manage saree categories
- `/api/products` — Catalog, product details, stock, search, and filtering
- `/api/orders` — Checkout creation, Razorpay signature verification, order history, cancellation, and PDF invoice downloads
- `/api/home-sections` — CMS management for homepage hero, collections, and story
- `/api/reviews` — Customer product reviews and ratings
- `/api/testimonials` — Curated customer quotes
- `/api/cancellation-policy` — Cancellation tiers and refund percentages
- `/sitemap.xml` — Dynamic SEO sitemap

For VPS deployment instructions using PM2 and Nginx, refer to [DEPLOY.md](./DEPLOY.md).
