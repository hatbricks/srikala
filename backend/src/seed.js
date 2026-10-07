import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { pool, ensureSchema } from './db.js';

const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

const categories = [
  { id: 'dharmavaram', name: 'Dharmavaram Pattu', image: '/images/styles/kanchivaram.jpg', tagline: 'Master handlooms directly from Dharmavaram', sort: 1 },
  { id: 'kanjivaram', name: 'Kanchivaram', image: '/images/styles/kanchivaram.jpg', tagline: 'Temple-woven silk, heirloom weight', sort: 2 },
  { id: 'banarasi', name: 'Banarasi', image: '/images/styles/banarasi.jpg', tagline: 'Brocade zari from the ghats', sort: 3 },
  { id: 'tussar', name: 'Tussar & Cotton', image: img('photo-1676696706907-0e04665b80bd'), tagline: 'Everyday drape, breathable weave', sort: 4 },
  { id: 'bridal', name: 'Bridal Edit', image: img('photo-1692992193981-d3d92fabd9cb'), tagline: 'Curated for the big day', sort: 5 },
  { id: 'organza', name: 'Organza', image: img('photo-1610189012906-4c0aa9b9781e'), tagline: 'Sheer, modern, festive', sort: 6 },
  { id: 'linen', name: 'Linen', image: img('photo-1609748340041-f5d61e061ebc'), tagline: 'Light weaves for warm days', sort: 7 },
];

const products = [
  { id: 'p1', name: 'Purple Kanjivaram with Gold Zari', category: 'kanjivaram', price: 18500, mrp: 24000, image: img('photo-1641699862936-be9f49b1c38d'), hoverImage: img('photo-1617627143750-d86bc21e42bb'), stock: 4, description: 'Handwoven Kanjivaram silk saree in deep purple with a temple-border gold zari pallu.' },
  { id: 'p2', name: 'Maroon Banarasi Silk', category: 'banarasi', price: 15200, mrp: 19000, image: img('photo-1610030469983-98e550d6193c'), hoverImage: img('photo-1618901185975-d59f7091bcfe'), stock: 0, description: 'Classic Banarasi weave in maroon with fine brocade work through the body and pallu.' },
  { id: 'p3', name: 'Emerald Tussar Cotton', category: 'tussar', price: 4200, mrp: 5200, image: img('photo-1717585679395-bbe39b5fb6bc'), hoverImage: img('photo-1676696706907-0e04665b80bd'), stock: 12, description: 'Breathable tussar-cotton blend, ideal for daily wear and office festivities.' },
  { id: 'p4', name: 'Ivory Bridal Kanjivaram', category: 'bridal', price: 32500, mrp: 39000, image: img('photo-1619516388835-2b60acc4049e'), hoverImage: img('photo-1692992193981-d3d92fabd9cb'), stock: 2, description: 'Statement bridal Kanjivaram in ivory and gold, paired with a heavy contrast pallu.' },
  { id: 'p5', name: 'Sage Linen Saree', category: 'linen', price: 3600, mrp: 4400, image: img('photo-1609748340041-f5d61e061ebc'), hoverImage: img('photo-1588140686379-1b76a52103dc'), stock: 9, description: 'Handloom linen in sage green with a woven self-border, styled for warm afternoons.' },
  { id: 'p6', name: 'Blush Organza Festive', category: 'organza', price: 6800, mrp: 8500, image: img('photo-1610189013429-a703f4b245cf'), hoverImage: img('photo-1610189012906-4c0aa9b9781e'), stock: 6, description: 'Sheer organza with sequin scatter work, light enough for festive evenings.' },
  { id: 'p7', name: 'Teal Kanjivaram Temple Border', category: 'kanjivaram', price: 21000, mrp: 26500, image: img('photo-1676696706907-0e04665b80bd'), hoverImage: img('photo-1641699862936-be9f49b1c38d'), stock: 3, description: 'Rich teal Kanjivaram with a wide temple-border pallu and contrast blouse piece.' },
  { id: 'p8', name: 'Gold Banarasi Tissue', category: 'banarasi', price: 17800, mrp: 22000, image: img('photo-1727430228383-aa1fb59db8bf'), hoverImage: img('photo-1619516388835-2b60acc4049e'), stock: 5, description: 'Tissue-finish Banarasi in gold with all-over floral butis.' },
  { id: 'p9', name: 'Rust Cotton Handloom', category: 'tussar', price: 3800, mrp: 4600, image: img('photo-1588140686379-1b76a52103dc'), hoverImage: img('photo-1609748340041-f5d61e061ebc'), stock: 15, description: 'Rust handloom cotton with a simple striped border, easy for daily wear.' },
  { id: 'p10', name: 'Wine Bridal Silk', category: 'bridal', price: 28900, mrp: 35000, image: img('photo-1618901185975-d59f7091bcfe'), hoverImage: img('photo-1692992193981-d3d92fabd9cb'), stock: 0, description: 'Deep wine bridal silk with heavy gold zari work through the pallu and border.' },
  { id: 'p11', name: 'Mustard Linen Weave', category: 'linen', price: 3900, mrp: 4700, image: img('photo-1617627143750-d86bc21e42bb'), hoverImage: img('photo-1717585679395-bbe39b5fb6bc'), stock: 7, description: 'Mustard handloom linen with a fine self-check pattern.' },
  { id: 'p12', name: 'Peacock Blue Organza', category: 'organza', price: 7200, mrp: 8900, image: img('photo-1610189012906-4c0aa9b9781e'), hoverImage: img('photo-1610189013429-a703f4b245cf'), stock: 8, description: 'Peacock-blue organza with delicate thread embroidery along the border.' },
];

const homeSections = [
  { key: 'hero', title: 'Hero Banner', sort: 1, content: {
    eyebrow: '',
    heading: 'Handwoven Heritage.',
    headingAccent: 'Woven for Generations.',
    subheading: 'Handwoven silk sarees created in limited existence — crafted slowly, woven with heritage, and never mass produced.',
    ctaLabel: 'Explore All Collections »',
    ctaLink: '/products',
    secondaryCtaLabel: 'Discover Ravichandra Textiles',
    secondaryCtaLink: '/about',
    slides: [
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
    ],
  } },
  { key: 'ticker', title: 'Scrolling Sale & Announcement Ticker (Below Hero)', sort: 2, enabled: true, content: {
    bgColor: '#581e15',
    textColor: '#ffffff',
    speed: 'normal',
    pauseOnHover: true,
    items: [
      { id: 't1', icon: 'bag', text: 'New arrivals every week - Stay tuned!', link: '/products?sort=newest' },
      { id: 't2', icon: 'sparkles', text: '100% Authentic Handcrafted Sarees', link: '/about' },
      { id: 't3', icon: 'whatsapp', text: 'WhatsApp us for personalized assistance', link: 'https://wa.me/918317551337' },
      { id: 't4', icon: 'truck', text: 'Free Shipping on orders above ₹5000', link: '/products' },
      { id: 't5', icon: 'gift', text: 'Use code WELCOME10 for 10% off', link: '/products' },
    ],
  } },
  { key: 'showcase', title: 'Our Collections (rail)', sort: 3, content: {
    note: "Ravichandra Textiles brings together the best traditional sarees in Dharmavaram, honoring centuries of sacred weaving heritage.",
    heading: 'Our Collections',
  } },
  { key: 'featured_categories', title: 'Shop by Category', sort: 3, content: {
    heading: 'Shop by category',
    categoryIds: ['heirloom', 'vintage', 'wedding', 'festive', 'office'],
  } },
  { key: 'promo_banner', title: 'Promo Banner', sort: 4, enabled: false, content: {
    heading: 'Festive edit is live',
    subheading: 'Free shipping on orders above ₹5,000.',
    ctaLabel: 'Explore now',
    ctaLink: '/products',
  } },
  { key: 'new_arrivals', title: 'New Arrivals', sort: 3, content: {
    eyebrow: 'Fresh Off The Loom',
    heading: 'New Arrivals',
    subheading: 'Discover our latest handpicked weaves, newly arrived from master artisan looms.',
    ctaLabel: 'View All New Arrivals',
    ctaLink: '/products?sort=newest',
    productIds: [],
  } },
  { key: 'shop_by_style', title: 'Shop by Style', sort: 4, content: {
    heading: 'Shop by Style',
    categoryIds: ['heirloom', 'vintage', 'wedding', 'festive', 'office'],
  } },
  { key: 'recommended', title: 'Recommended Sarees', sort: 5, content: {
    heading: 'Recommended For You',
    // Hand-picked product ids shown at the bottom of Home and on every
    // product page (current product skipped automatically). Empty = a
    // random pick from the catalog each time.
    productIds: [],
  } },
  { key: 'shipping_settings', title: 'Shipping', sort: 5, content: {
    fee: 100,
    // 0 = free-shipping tier turned off; otherwise orders at or above
    // this subtotal get free shipping instead of the flat fee above.
    freeThreshold: 0,
  } },
  { key: 'story', title: 'Our Craft', sort: 6, content: {
    eyebrow: 'Our story',
    heading: 'Where Tradition Meets Grace',
    body: "Ravichandra Textiles celebrates the timeless beauty of Indian craftsmanship. We bring together thoughtfully selected Dharmavaram silk sarees that honour traditional artistry while fitting effortlessly into the modern wardrobe. Every weave is selected with reverent care for authenticity, drape, and enduring elegance.",
    ctaLabel: 'Discover Ravichandra Textiles',
    ctaLink: '/about',
    image: img('photo-1692992193981-d3d92fabd9cb'),
  } },
  { key: 'testimonials', title: 'Customer Testimonials', sort: 7, content: {
    heading: 'Loved by our customers',
  } },
  { key: 'social_links', title: 'Footer — Social & Contact Links', sort: 20, content: {
    whatsapp: '+918317551337',
    facebook: 'https://www.facebook.com/ravichandrahandlooms',
    twitter: 'https://twitter.com/ravichandratextiles',
    instagram: 'https://www.instagram.com/ravichandra_handlooms',
  } },
  { key: 'about_hero', title: 'About Page — Header', sort: 8, content: {
    eyebrow: "ABOUT RAVICHANDRA TEXTILES",
    heading: 'Curating Dharmavaram & Indian Heritage, Honoring Timeless Artistry',
    subtitle: 'Woven slowly on traditional pit looms in Dharmavaram, honoring centuries of sacred weaving devotion and pure zari craftsmanship.',
    image: '/images/about-hero-artisan.jpg',
  } },
  { key: 'products_hero', title: 'Products Page — Curved Hero Header', sort: 15, content: {
    badge: 'HERITAGE HANDLOOMS',
    title: 'Our Collection',
    description: "Rooted in Andhra Pradesh's weaving heritage, our sarees are crafted slowly, thoughtfully, and meant to be treasured for a lifetime.",
    image: '/images/collection-hero-artisan.jpg',
  } },
  { key: 'about_story', title: 'About Page — Our Story', sort: 9, content: {
    heading: 'Our story',
    // Each string here becomes its own paragraph on the About page.
    paragraphs: [
      'Ravichandra Textiles celebrates the timeless beauty of Indian craftsmanship. We bring together thoughtfully selected Dharmavaram pure silk sarees that honour traditional artistry while fitting effortlessly into the modern wardrobe.',
      'From pure temple-woven silks and intricate brocades to breathable everyday handlooms, each piece is chosen for its character, richness of weave, and fine craftsmanship.',
      'Every saree that reaches you has been checked by hand for weave quality, zari luster and finish before it leaves our store.',
    ],
    image: img('photo-1717585679395-bbe39b5fb6bc'),
    // Optional extra photos shown as a strip below the story text.
    gallery: [],
  } },
  { key: 'google_reviews', title: 'Google Reviews (Before Footer)', sort: 10, enabled: true, content: {
    heading: 'Loved by Saree Connoisseurs',
    subheading: 'Genuine verified customer reviews from Google',
    googleBusinessUrl: 'https://share.google/rLeQl6DO3cPtU5rql',
    averageRating: 4.9,
    totalReviews: '150+ reviews',
    reviews: [
      {
        id: 'gr-1',
        name: 'Pooja Gowda',
        avatarInitial: 'P',
        avatarColor: '#E65100',
        userBadge: '1 review',
        rating: 5,
        timeAgo: '5 months ago',
        text: 'They have amazing wedding collection at very reasonable price. You guys must visit for any occasion',
        reviewUrl: 'https://share.google/rLeQl6DO3cPtU5rql',
        likesCount: 1,
      },
      {
        id: 'gr-2',
        name: 'Meenakshi Sundaram',
        avatarInitial: 'M',
        avatarColor: '#1B5E20',
        userBadge: 'Local Guide · 14 reviews',
        rating: 5,
        timeAgo: '3 months ago',
        text: 'Authentic pure silk Kanchivaram sarees. The gold zari lustre and weight of the saree speaks for its quality. Highly recommended for bridal shopping.',
        reviewUrl: 'https://share.google/rLeQl6DO3cPtU5rql',
        likesCount: 3,
      },
      {
        id: 'gr-3',
        name: 'Deepa Hegde',
        avatarInitial: 'D',
        avatarColor: '#0D47A1',
        userBadge: '6 reviews',
        rating: 5,
        timeAgo: '2 months ago',
        text: 'Ordered online and received within 3 days in pristine packaging with silk mark certificate. Saree looks even richer than pictures!',
        reviewUrl: 'https://share.google/rLeQl6DO3cPtU5rql',
        likesCount: 2,
      },
    ],
  } },
];

const testimonials = [
  { name: 'Ananya R.', rating: 5, text: "The zari work is even richer in person. Wore it for my sister's wedding and got so many compliments.", productId: 'p1', sort: 1 },
  { name: 'Meera K.', rating: 5, text: 'Beautiful drape, true to the photos, and the pallu sits perfectly without adjusting all evening.', productId: 'p1', sort: 2 },
  { name: 'Sowmya P.', rating: 5, text: 'This was my bridal saree and it exceeded every expectation. Worth every rupee.', productId: 'p4', sort: 1 },
  // General homepage band — productId left blank so these rotate site-wide.
  { name: 'Divya N.', rating: 5, text: "Fast shipping, careful packaging, and the saree itself is even more beautiful in hand. Ravichandra Textiles is now my go-to for authentic Dharmavaram silks.", productId: null, sort: 1 },
  { name: 'Priya S.', rating: 5, text: 'Genuinely handwoven quality at a fair price. I appreciate that they work directly with weaving families.', productId: null, sort: 2 },
  { name: 'Kavya M.', rating: 4, text: 'Lovely collection and easy ordering experience. Would love to see more everyday cotton options.', productId: null, sort: 3 },
];

const cancellationPolicy = [
  { label: 'Within 24 hours of payment', maxDays: 1, refundPercent: 100, sort: 1 },
  { label: '2–3 days after payment', maxDays: 3, refundPercent: 75, sort: 2 },
  { label: '4–7 days after payment', maxDays: 7, refundPercent: 40, sort: 3 },
];

async function main() {
  await ensureSchema();

  for (const c of categories) {
    await pool.query(
      `INSERT INTO categories (id,name,image,tagline,sort_order) VALUES ($1,$2,$3,$4,$5)
       ON CONFLICT (id) DO UPDATE SET name=$2, image=$3, tagline=$4, sort_order=$5`,
      [c.id, c.name, c.image, c.tagline, c.sort]
    );
  }
  console.log(`Seeded ${categories.length} categories`);

  for (const p of products) {
    const sku = `SK-${p.id.toUpperCase()}`;
    await pool.query(
      `INSERT INTO products (id,name,category_id,price,mrp,stock,description,image,hover_image,sku,weight_grams,return_available,return_window_hours,cancellation_available)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,650,TRUE,24,TRUE)
       ON CONFLICT (id) DO UPDATE SET
         name=$2, category_id=$3, price=$4, mrp=$5, stock=$6, description=$7, image=$8, hover_image=$9, sku=$10`,
      [p.id, p.name, p.category, p.price, p.mrp, p.stock, p.description, p.image, p.hoverImage || '', sku]
    );

    // Seed sample color variants if none exist for this product
    const { rows: existingVariants } = await pool.query('SELECT id FROM product_variants WHERE product_id = $1 LIMIT 1', [p.id]);
    if (!existingVariants.length) {
      const colors = [
        { name: 'Royal Crimson', code: '#8B0000', stock: Math.max(1, Math.floor(p.stock / 2)) },
        { name: 'Peacock Teal', code: '#005f73', stock: Math.max(1, Math.ceil(p.stock / 2)) },
        { name: 'Antique Gold', code: '#c58b38', stock: Math.max(1, p.stock) },
      ];
      for (const [idx, c] of colors.entries()) {
        await pool.query(
          `INSERT INTO product_variants (product_id, color_name, color_code, sku, price, mrp, stock, weight_grams)
           VALUES ($1, $2, $3, $4, $5, $6, $7, 650)`,
          [p.id, c.name, c.code, `${sku}-${idx + 1}`, p.price, p.mrp, c.stock]
        );
      }
    }
  }
  console.log(`Seeded ${products.length} products and their color variants`);

  // Default Shiprocket Pickup Location
  const { rows: existingPickup } = await pool.query('SELECT id FROM pickup_locations LIMIT 1');
  if (!existingPickup.length) {
    await pool.query(
      `INSERT INTO pickup_locations (
         pickup_location_name, name, email, phone, address, address_2, city, state, pincode, country, is_default, active
       ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,TRUE,TRUE)`,
      [
        'Primary Hub',
        'Ravichandra Textiles Logistics',
        'ravichandratextiles39@gmail.com',
        '8317551337',
        '10-28, Kpt street',
        'Near Punjab National Bank',
        'Dharmavaram',
        'Andhra Pradesh',
        '515671',
        'India'
      ]
    );
    console.log('Seeded default Shiprocket pickup location');
  }

  // Global Settings
  const defaultSettings = [
    {
      key: 'shipping',
      value: {
        mode: 'shiprocket', // 'shiprocket' | 'flat'
        fallbackFee: 100,
        freeShippingThreshold: 5000,
        packagingAllowanceGrams: 100,
        defaultPickupPincode: '631501',
      },
    },
    {
      key: 'returns',
      value: {
        globalEnabled: true,
        defaultWindowHours: 24,
        allowPhotoUpload: true,
        policyNote: 'Return request must be placed within 24 hours of delivery. Saree must be unworn with original tags and fold intact.',
      },
    },
    {
      key: 'cancellations',
      value: {
        globalEnabled: true,
        allowBeforeShipment: true,
      },
    },
  ];

  for (const s of defaultSettings) {
    await pool.query(
      `INSERT INTO settings (key, value) VALUES ($1, $2)
       ON CONFLICT (key) DO UPDATE SET value = $2`,
      [s.key, JSON.stringify(s.value)]
    );
  }
  console.log('Seeded global store settings');

  for (const s of homeSections) {
    await pool.query(
      `INSERT INTO home_sections (section_key,title,enabled,content,sort_order) VALUES ($1,$2,$5,$3,$4)
       ON CONFLICT (section_key) DO NOTHING`,
      [s.key, s.title, JSON.stringify(s.content), s.sort, s.enabled !== false]
    );
  }
  console.log(`Seeded ${homeSections.length} home sections`);

  const { rows: existingTestimonials } = await pool.query('SELECT id FROM testimonials LIMIT 1');
  if (!existingTestimonials.length) {
    for (const t of testimonials) {
      await pool.query(
        `INSERT INTO testimonials (product_id,name,rating,text,active,sort_order) VALUES ($1,$2,$3,$4,TRUE,$5)`,
        [t.productId, t.name, t.rating, t.text, t.sort]
      );
    }
    console.log(`Seeded ${testimonials.length} testimonials`);
  } else {
    console.log('Testimonials already exist, skipped seeding.');
  }

  const { rows: existingPolicy } = await pool.query('SELECT id FROM cancellation_policy LIMIT 1');
  if (!existingPolicy.length) {
    for (const t of cancellationPolicy) {
      await pool.query(
        `INSERT INTO cancellation_policy (label,max_days,refund_percent,sort_order) VALUES ($1,$2,$3,$4)`,
        [t.label, t.maxDays, t.refundPercent, t.sort]
      );
    }
    console.log(`Seeded ${cancellationPolicy.length} cancellation policy tiers`);
  } else {
    console.log('Cancellation policy already exists, skipped seeding.');
  }

  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@srikala.com').toLowerCase();
  const existing = await pool.query('SELECT id FROM users WHERE email=$1', [adminEmail]);
  if (!existing.rows.length) {
    const hash = await bcrypt.hash('ChangeMe123!', 10);
    await pool.query(
      `INSERT INTO users (name,email,password_hash,is_admin) VALUES ($1,$2,$3,TRUE)`,
      ['Admin', adminEmail, hash]
    );
    console.log(`Created admin user: ${adminEmail} / ChangeMe123!  (change this password after first login)`);
  } else {
    console.log(`Admin user ${adminEmail} already exists`);
  }

  const defaultCoupons = [
    { code: 'WELCOME10', type: 'percent', value: 10, minOrder: 0, perUserLimit: 1 },
    { code: 'FESTIVE10', type: 'percent', value: 10, minOrder: 0, perUserLimit: 2 },
    { code: 'SILK15', type: 'percent', value: 15, minOrder: 5000, perUserLimit: 2 },
  ];
  for (const c of defaultCoupons) {
    await pool.query(
      `INSERT INTO coupons (code, type, value, min_order, active, per_user_limit)
       VALUES ($1, $2, $3, $4, TRUE, $5)
       ON CONFLICT (code) DO NOTHING`,
      [c.code, c.type, c.value, c.minOrder, c.perUserLimit]
    );
  }
  console.log('Seeded default coupons');

  await pool.end();
  console.log('Seed complete.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
