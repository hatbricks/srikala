# Sri Kala — Silk Emporium

Full-stack e-commerce application for **Sri Kala Silk Emporium**, featuring a curated Indian saree storefront and a custom CMS administration portal.

## Architecture

- **`frontend/`** — React 19 + Vite storefront, shopping bag, user accounts, and Sri Kala CMS.
- **`backend/`** — Node.js + Express API with PostgreSQL database, JWT authentication, Razorpay payments, and Resend transactional emails.
- **`scripts/`** — Brand asset generation and processing utilities.

## Getting Started

### 1. Start the Backend API

```bash
cd backend
cp .env.example .env     # configure DATABASE_URL and JWT_SECRET
npm install
npm run seed             # creates schema, seed sarees, and admin account
npm run dev              # runs API on http://localhost:4000
```

### 2. Start the Frontend Storefront

```bash
cd frontend
cp .env.example .env     # VITE_API_URL defaults to http://localhost:4000
npm install
npm run dev              # opens at http://localhost:5173
```

- `/` — Home (hero, category strip, featured products, brand story)
- `/about` — About Us
- `/products` — Product grid with category filter
- `/products/:id` — Product detail
- `/orders` — Order history preview (static sample data for now)
- `/contact` — Contact form + store details
- `/admin` — CMS: Dashboard, Categories, Products (add/edit/delete, photo upload)

## Admin CMS

Visit `/admin` to manage categories and products — add a photo, name, price,
stock, etc. Data is saved to the browser's localStorage for this demo, so it
persists on reload but only on this device/browser. Every screen reads
through `src/data/store.js`, so once the backend is ready, that's the one
file to swap for real API calls — the rest of the app doesn't need to change.

## Notes for next phase (backend)

- Swap `src/data/store.js` functions for API calls (categories, products CRUD)
- Add auth (Google login) for customers, separate auth for `/admin`
- Wire Razorpay at the `Add to Cart` / checkout step
- Replace the sample `Orders` data with real order history per user
- Replace the placeholder photography (`public/images/model-saree.png`) with
  final product photography per category/product

## Stack

React 19, Vite, react-router-dom. No UI framework — plain CSS with design
tokens in `src/index.css` (colors, fonts, spacing) so the palette is easy to
adjust in one place.
