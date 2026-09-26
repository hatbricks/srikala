/**
 * Central Sri Kala Brand Configuration
 *
 * Single source of truth for all brand identity, copy, contact details,
 * URLs, colors, and asset references across the application.
 */

export const BRAND = {
  name: 'Sri Kala',
  legalName: 'Sri Kala Silk Emporium',
  tagline: 'Silk Emporium',
  shortTitle: 'Sri Kala',
  fullTitle: 'Sri Kala — Silk Emporium | Timeless Indian Sarees',
  slogan: 'Timeless Elegance, Woven in Tradition',
  subheading: 'Discover thoughtfully curated Indian sarees crafted to celebrate timeless beauty, artistry and tradition.',

  story: {
    eyebrow: 'Our Story',
    heading: 'Where Tradition Meets Grace',
    lead: 'Sri Kala celebrates the timeless beauty of Indian craftsmanship. We bring together thoughtfully selected sarees that honour traditional artistry while fitting effortlessly into the modern wardrobe.',
    body: 'Sri Kala celebrates the timeless beauty of Indian craftsmanship. We bring together thoughtfully selected sarees that honour traditional artistry while fitting effortlessly into the modern wardrobe. Every weave is selected with reverent care for authenticity, drape, and enduring elegance.',
    paragraphs: [
      'Sri Kala celebrates the timeless beauty of Indian craftsmanship. We bring together thoughtfully selected sarees that honour traditional artistry while fitting effortlessly into the modern wardrobe.',
      'From pure temple-woven silks and intricate brocades to breathable everyday handlooms, each piece is chosen for its character, richness of weave, and fine craftsmanship.',
      'Every saree is hand-inspected for weave integrity, zari luster, and finish before it arrives at your doorstep.',
    ],
    values: [
      {
        title: 'Authentic Weaves',
        description: 'Honoring genuine Indian textile traditions and time-honored weaving artistry.',
      },
      {
        title: 'Curated Elegance',
        description: 'Every design is hand-selected to balance timeless heritage with effortless contemporary wear.',
      },
      {
        title: 'Hand-Inspected Quality',
        description: 'Each piece undergoes meticulous inspection for weave density, zari brilliance, and impeccable finish.',
      },
    ],
  },

  contact: {
    // Configurable placeholders that can be overridden via environment variables
    phone: import.meta.env.VITE_SRI_KALA_PHONE || '+91 98765 43210',
    whatsapp: import.meta.env.VITE_SRI_KALA_WHATSAPP || '+919876543210',
    email: import.meta.env.VITE_SRI_KALA_EMAIL || 'contact@srikala.com',
    address: import.meta.env.VITE_SRI_KALA_ADDRESS || 'Sri Kala Silk Emporium, MG Road, Hyderabad, Telangana 500001',
    hoursWeekday: 'Mon – Sat: 10:00 AM – 9:00 PM',
    hoursSunday: 'Sunday: 10:00 AM – 7:00 PM',
    instagram: import.meta.env.VITE_SRI_KALA_INSTAGRAM || 'https://www.instagram.com/srikalasilks',
    facebook: import.meta.env.VITE_SRI_KALA_FACEBOOK || 'https://www.facebook.com/srikalasilks',
    twitter: import.meta.env.VITE_SRI_KALA_TWITTER || 'https://twitter.com/srikalasilks',
    mapQuery: 'Sri+Kala+Silk+Emporium+Hyderabad',
  },

  seo: {
    siteName: 'Sri Kala',
    siteUrl: 'https://www.srikala.com',
    defaultTitle: 'Sri Kala — Silk Emporium | Timeless Indian Sarees',
    defaultDescription: 'Discover thoughtfully curated Indian sarees crafted to celebrate timeless beauty, artistry and tradition. Shop Kanjivaram, Banarasi, pure silk, and festive sarees at Sri Kala.',
    defaultKeywords: 'Sri Kala, Sri Kala Silk Emporium, pure silk sarees online, Kanjivaram silk saree, Banarasi silk saree, pattu sarees online, Indian bridal sarees, wedding sarees online India, handloom sarees, festive sarees',
  },

  assets: {
    logoLight: '/images/logo.png', // Maroon & Gold for light/white backgrounds
    logoWhite: '/images/logo-white.png', // Luminous Gold for dark header/footer
    logoIntro: '/images/given-logo-transparent.png', // Provided master logo with transparency
    logoDark: '/images/srikala-logo-dark.png', // Master given logo on royal dark
    monogram: '/images/monogram.png',
    monogramWhite: '/images/monogram-white.png',
    favicon: '/favicon.png',
    faviconSvg: '/favicon.svg',
    appleTouchIcon: '/apple-touch-icon.png',
  },

  colors: {
    primary: '#581e15',
    primaryHover: '#6c241a',
    primaryDark: '#260a0e',
    secondary: '#b0732e',
    accent: '#c58b38',
    goldLight: '#fbdfa2',
    background: '#FAF6F0',
    surface: '#FFFFFF',
    surfaceWarm: '#F8F3ED',
    text: '#220D0A',
    muted: '#735E59',
    border: '#E6DCCE',
  },
};

export default BRAND;
