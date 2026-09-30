/**
 * Central Ravichandra Textiles Brand Configuration
 *
 * Single source of truth for all brand identity, copy, contact details,
 * URLs, colors, and asset references across the application.
 */

export const BRAND = {
  name: 'Ravichandra Textiles',
  legalName: 'Ravichandra Textiles & Handlooms',
  tagline: 'Best Traditional Sarees in Dharmavaram — Authentic Pure Silk Handlooms',
  shortTitle: 'Ravichandra Textiles',
  fullTitle: 'Best Traditional Sarees in Dharmavaram | Ravichandra Textiles — Authentic Silk Handlooms',
  slogan: 'Tradition of Pure Weaves & Timeless Craft',
  subheading: 'Discover the best traditional sarees in Dharmavaram crafted with sacred precision, pure zari, and heirloom artistry directly from master weaving families.',
  description: 'Ravichandra Textiles is renowned for the best traditional sarees in Dharmavaram, featuring authentic pure silk handloom sarees, rich temple borders, pure gold zari brocades, and bridal heirloom weaves.',

  story: {
    eyebrow: 'Our Heritage',
    heading: 'The Sacred Art of Dharmavaram Handloom Silk',
    lead: 'Rooted in the historic weaving heartland of Dharmavaram, Ravichandra Textiles celebrates generations of master artisans dedicated to preserving pure Indian silk traditions.',
    body: 'Ravichandra Textiles brings together the finest handloom weaves directly from master weaver looms in Dharmavaram, Andhra Pradesh. Renowned across the world for rich gold zari brocades, temple pallus, and enduring mulberry silk lustre, each saree is checked by hand for authentic silk mark quality and finish.',
    paragraphs: [
      'Rooted in the historic weaving heartland of Dharmavaram, Andhra Pradesh, Ravichandra Textiles celebrates the sacred heritage of pure Indian silk craftsmanship.',
      'From regal bridal silks with heavy gold zari borders to lightweight festive weaves, each piece is thoughtfully handwoven on traditional pit looms by master artisans.',
      'Every saree is hand-inspected for weave integrity, zari luster, and flawless drape before reaching your hands with guaranteed authenticity.',
    ],
    values: [
      {
        title: 'Authentic Dharmavaram Weaves',
        description: 'Directly sourced from master artisan looms in Dharmavaram, preserving sacred handloom heritage.',
      },
      {
        title: 'Pure Silk & Genuine Zari',
        description: 'Crafted with premium mulberry silk and certified zari threads for enduring heirloom elegance.',
      },
      {
        title: 'Hand-Inspected Excellence',
        description: 'Every single saree undergoes rigorous quality checks for weave density, borders, and pallu brilliance.',
      },
    ],
  },

  contact: {
    phone: import.meta.env.VITE_PHONE || '+91 83175 51337',
    whatsapp: import.meta.env.VITE_WHATSAPP || '918317551337',
    email: import.meta.env.VITE_EMAIL || 'ravichandratextiles39@gmail.com',
    address: import.meta.env.VITE_ADDRESS || '10-28, Kpt street, near Punjab National Bank, Dharmavaram 515671, Andhra Pradesh',
    hoursWeekday: 'Sun – Sat: 10:00 AM – 10:00 PM',
    hoursSunday: 'Sun – Sat: 10:00 AM – 10:00 PM',
    instagram: import.meta.env.VITE_INSTAGRAM || 'https://www.instagram.com/ravichandra_handlooms',
    facebook: import.meta.env.VITE_FACEBOOK || 'https://www.facebook.com/ravichandrahandlooms',
    twitter: import.meta.env.VITE_TWITTER || 'https://twitter.com/ravichandratextiles',
    mapQuery: '10-28+Kpt+street+near+Punjab+National+Bank+Dharmavaram+515671+Andhra+Pradesh',
  },

  seo: {
    siteName: 'Ravichandra Textiles',
    siteUrl: 'https://ravichandratextiles.com',
    defaultTitle: 'Best Traditional Sarees in Dharmavaram | Ravichandra Textiles — Authentic Silk Handlooms',
    defaultDescription: 'Discover the best traditional sarees in Dharmavaram at Ravichandra Textiles. Shop authentic Dharmavaram pure silk handloom sarees, bridal pattu, rich temple borders & pure zari brocades directly from master weavers with guaranteed purity.',
    defaultKeywords: 'best traditional sarees in dharmavaram, best saree shop in dharmavaram, dharmavaram silk sarees, dharmavaram handloom sarees, pure pattu sarees dharmavaram, ravichandra textiles, bridal silk sarees dharmavaram, wedding pattu sarees andhra pradesh, dharmavaram pattu sarees online, authentic silk mark sarees, kanchivaram silk, banarasi silk',
  },

  assets: {
    logoLight: '/images/logo.png',
    logoWhite: '/images/logo-white.png',
    logoHorizontal: '/images/logo-horizontal.png',
    logoVertical: '/images/logo-vertical.png',
    logoIntro: '/images/logo-vertical.png',
    logoDark: '/images/logo.png',
    monogram: '/images/monogram.png',
    monogramWhite: '/images/monogram-white.png',
    favicon: '/favicon.png',
    faviconSvg: '/favicon.svg',
    appleTouchIcon: '/apple-touch-icon.png',
  },

  colors: {
    primary: '#b87d2b',
    primaryHover: '#9c661d',
    primaryDark: '#2c1810',
    secondary: '#c58b38',
    accent: '#d4af37',
    goldLight: '#fbf0d8',
    navBackground: '#FAF8F5',
    background: '#FAF6F0',
    surface: '#FFFFFF',
    surfaceWarm: '#F8F3ED',
    text: '#220D0A',
    muted: '#735E59',
    border: '#E6DCCE',
  },
};

export default BRAND;
