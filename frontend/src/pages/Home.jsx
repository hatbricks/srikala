import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryShowcase from '../components/CategoryShowcase';
import GoogleReviewsSection from '../components/GoogleReviewsSection';
import HeroSlider from '../components/HeroSlider';
import NewArrivals from '../components/NewArrivals';
import RecommendedProducts from '../components/RecommendedProducts';
import ScrollReveal from '../components/ScrollReveal';
import Seo from '../components/Seo';
import ShopByStyle from '../components/ShopByStyle';
import TextReveal from '../components/TextReveal';
import ScrollingTicker from '../components/ScrollingTicker';
import { api } from '../data/api';
import { getCategories, getProducts } from '../data/store';

import BRAND from '../config/brand';

const defaults = {
  hero: {
    eyebrow: 'RAVICHANDRA TEXTILES',
    heading: 'Timeless Elegance, Woven in',
    heading2: 'Tradition',
    subheading: 'Discover the best traditional sarees in Dharmavaram, featuring pure silk handlooms, rich temple borders, and heirloom bridal pattu crafted to perfection.',
    ctaLabel: 'Explore Collection',
    ctaLink: '/products',
    secondaryCtaLabel: 'Discover Ravichandra Textiles',
    secondaryCtaLink: '/about',
    slides: [
      {
        id: 'hero-video-1',
        type: 'video',
        url: '/videos/hero1.mp4',
        alt: 'Ravichandra Textiles Traditional Saree Showcase - 4K Video',
        eyebrow: 'PURE HANDLOOM SILKS',
        heading: 'Crafted with Devotion',
        subheading: 'Experience authentic heirloom Dharmavaram weaves with pure zari threads.',
        ctaLabel: 'Explore Collection',
        ctaLink: '/products',
      },
      {
        id: 'hero-image-2',
        type: 'image',
        url: '/images/styles/kanchivaram.jpg',
        alt: 'Ravichandra Textiles Dharmavaram Silk Saree',
        eyebrow: 'TEMPLE TRADITIONS',
        heading: 'Dharmavaram & Kanchi Elegance',
        subheading: 'Heirloom drape with temple-woven gold zari motifs.',
        ctaLabel: 'Shop Dharmavaram',
        ctaLink: '/products?category=kanjivaram',
      },
      {
        id: 'hero-image-3',
        type: 'image',
        url: '/images/styles/banarasi.jpg',
        alt: 'Ravichandra Textiles Banarasi Saree Showcase',
        eyebrow: 'ROYAL WEAVES',
        heading: 'Banarasi & Pattu Splendor',
        subheading: 'Brocade zari woven by master craftsmen with authentic silk mark.',
        ctaLabel: 'Shop Collection',
        ctaLink: '/products?category=banarasi',
      },
    ],
  },
  showcase: {
    note: 'Ravichandra Textiles celebrates the timeless art of Indian weaving in Dharmavaram, curating each saree to bring grace and authentic craftsmanship to every occasion.',
    heading: 'Our Collections',
  },
  new_arrivals: {
    eyebrow: 'Fresh Off The Loom',
    heading: 'New Arrivals',
    subheading: 'Discover our latest handpicked weaves, newly arrived from master artisan looms.',
    ctaLabel: 'View All New Arrivals',
    ctaLink: '/products?sort=newest',
    productIds: [],
  },
  shop_by_style: {
    eyebrow: '',
    heading: 'Shop by Style',
    categoryIds: ['kanjivaram', 'banarasi', 'tussar', 'bridal', 'organza'],
  },
  recommended: {
    heading: 'Recommended For You',
    productIds: [],
  },
  story: {
    eyebrow: 'Our Heritage',
    heading: 'Woven with Grace, Cherished for Generations',
    body: 'Ravichandra Textiles is rooted in the legendary weaving hub of Dharmavaram, Andhra Pradesh. We bring together thoughtfully selected pure handloom silk sarees that honour traditional artistry while fitting effortlessly into modern celebrations.',
    ctaLabel: 'Discover Ravichandra Textiles',
    ctaLink: '/about',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
  },
  ticker: {
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
  },
};

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [hero, setHero] = useState(defaults.hero);
  const [heroReady, setHeroReady] = useState(false);
  const [showcase, setShowcase] = useState(defaults.showcase);
  const [newArrivals, setNewArrivals] = useState(defaults.new_arrivals);
  const [newArrivalsEnabled, setNewArrivalsEnabled] = useState(true);
  const [shopByStyle, setShopByStyle] = useState(defaults.shop_by_style);
  const [shopByStyleEnabled, setShopByStyleEnabled] = useState(true);
  const [recommended, setRecommended] = useState(defaults.recommended);
  const [story, setStory] = useState(defaults.story);
  const [promo, setPromo] = useState(null);
  const [googleReviews, setGoogleReviews] = useState(null);
  const [googleReviewsEnabled, setGoogleReviewsEnabled] = useState(true);
  const [ticker, setTicker] = useState(defaults.ticker);
  const [tickerEnabled, setTickerEnabled] = useState(true);

  useEffect(() => {
    // Categories & products — try the live backend first, fall back to the
    // local seed so the storefront still renders if the API isn't running.
    api.getCategories().then(({ categories }) => setCategories(categories)).catch(() => setCategories(getCategories()));
    api.getProducts().then(({ products }) => setProducts(products)).catch(() => setProducts(getProducts()));

    // Home CMS sections — every block below is editable from the admin panel.
    api
      .getHomeSections()
      .then(({ sections }) => {
        const byKey = Object.fromEntries(sections.map((s) => [s.section_key, s.content]));
        if (byKey.hero) setHero({ ...defaults.hero, ...byKey.hero });
        if (byKey.showcase) setShowcase({ ...defaults.showcase, ...byKey.showcase });
        if (byKey.recommended) setRecommended({ ...defaults.recommended, ...byKey.recommended });
        if (byKey.story) setStory({ ...defaults.story, ...byKey.story });
        if (byKey.promo_banner) setPromo(byKey.promo_banner);

        const tickerSection = sections.find((s) => s.section_key === 'ticker');
        if (tickerSection) {
          setTicker({ ...defaults.ticker, ...tickerSection.content });
          setTickerEnabled(tickerSection.enabled !== false);
        } else if (byKey.ticker) {
          setTicker({ ...defaults.ticker, ...byKey.ticker });
        }

        const newArrSection = sections.find((s) => s.section_key === 'new_arrivals' || s.section_key === 'featured');
        if (newArrSection) {
          setNewArrivals({ ...defaults.new_arrivals, ...newArrSection.content });
          setNewArrivalsEnabled(newArrSection.enabled !== false);
        } else if (sections.length > 0) {
          if (byKey.new_arrivals || byKey.featured) {
            setNewArrivals({ ...defaults.new_arrivals, ...(byKey.new_arrivals || byKey.featured) });
          }
        }

        const styleSection = sections.find((s) => s.section_key === 'shop_by_style' || s.section_key === 'featured_styles');
        if (styleSection) {
          setShopByStyle({ ...defaults.shop_by_style, ...styleSection.content });
          setShopByStyleEnabled(styleSection.enabled !== false);
        } else if (sections.length > 0) {
          if (byKey.shop_by_style) {
            setShopByStyle({ ...defaults.shop_by_style, ...byKey.shop_by_style });
          }
        }

        const grSection = sections.find((s) => s.section_key === 'google_reviews');
        if (grSection) {
          setGoogleReviews(grSection.content);
          setGoogleReviewsEnabled(grSection.enabled !== false);
        } else if (byKey.google_reviews) {
          setGoogleReviews(byKey.google_reviews);
        }
      })
      .catch(() => {})
      .finally(() => setHeroReady(true));
  }, []);


  return (
    <div className="home">
      <Seo
        title={BRAND.seo.defaultTitle}
        path="/"
        description={BRAND.seo.defaultDescription}
        keywords={BRAND.seo.defaultKeywords}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': ['ClothingStore', 'LocalBusiness'],
          name: BRAND.name,
          legalName: BRAND.legalName,
          url: BRAND.seo.siteUrl,
          logo: `${BRAND.seo.siteUrl}/images/logo-horizontal.png`,
          image: `${BRAND.seo.siteUrl}/images/logo-vertical.png`,
          description: BRAND.seo.defaultDescription,
          telephone: BRAND.contact.phone,
          email: BRAND.contact.email,
          address: {
            '@type': 'PostalAddress',
            streetAddress: '10-28, Kpt street, near Punjab National Bank',
            addressLocality: 'Dharmavaram',
            addressRegion: 'Andhra Pradesh',
            postalCode: '515671',
            addressCountry: 'IN',
          },
          priceRange: '₹₹ - ₹₹₹',
          sameAs: [BRAND.contact.instagram, BRAND.contact.facebook, BRAND.contact.twitter].filter(Boolean),
        }}
      />
      <section className="hero">
        <div className="hero-visual" id="page-hero">
          <HeroSlider slides={heroReady ? hero.slides : null} mobileSlides={heroReady ? hero.mobileSlides : null} />
        </div>
      </section>

      {tickerEnabled && ticker && ticker.items?.length > 0 && (
        <ScrollingTicker config={ticker} />
      )}

      <section className="collections" id="collections">
        <div className="sparkle-bg sparkle-bg-a" aria-hidden="true">
          <img src="/images/sparkle-bg.svg" alt="" />
        </div>
        <div className="sparkle-bg sparkle-bg-b" aria-hidden="true">
          <img src="/images/sparkle-bg.svg" alt="" />
        </div>
        <div className="container">
          <ScrollReveal>
            <CategoryShowcase categories={categories} note={showcase.note} heading={showcase.heading} />
          </ScrollReveal>
        </div>
      </section>

      {newArrivalsEnabled && (
        <NewArrivals
          products={products}
          curatedIds={newArrivals.productIds}
          eyebrow={newArrivals.eyebrow}
          heading={newArrivals.heading}
          subheading={newArrivals.subheading}
          ctaLabel={newArrivals.ctaLabel}
          ctaLink={newArrivals.ctaLink}
        />
      )}

      {shopByStyleEnabled && (
        <ShopByStyle
          categories={categories}
          categoryIds={shopByStyle.categoryIds}
          heading={shopByStyle.heading}
          eyebrow={shopByStyle.eyebrow}
        />
      )}

      {promo && (
        <section className="promo-banner">
          <div className="container promo-inner">
            <div>
              <h2>{promo.heading}</h2>
              {promo.subheading && <p>{promo.subheading}</p>}
            </div>
            {promo.ctaLabel && (
              <Link to={promo.ctaLink || '/products'} className="btn btn-outline">{promo.ctaLabel}</Link>
            )}
          </div>
        </section>
      )}


      <section className="story">
        <div className="sparkle-bg sparkle-bg-story" aria-hidden="true">
          <img src="/images/sparkle-bg.svg" alt="" />
        </div>
        <div className="container story-grid">
          <ScrollReveal as="div" className="story-image" y={0} duration={1.3}>
            <img src={story.image} alt={story.heading} />
          </ScrollReveal>
          <div className="story-copy">
            <TextReveal as="p" direction="fade" className="eyebrow">{story.eyebrow}</TextReveal>
            <TextReveal as="h2" delay={0.08} direction="right" distance={36}>{story.heading}</TextReveal>
            <TextReveal as="p" delay={0.16} direction="left" distance={26} className="story-text">
              {story.body}
            </TextReveal>
            <ScrollReveal delay={0.24}>
              <Link to={story.ctaLink || '/about'} className="btn btn-outline">{story.ctaLabel || 'Read our story'}</Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <RecommendedProducts products={products} curatedIds={recommended.productIds} title={recommended.heading} />

      {googleReviewsEnabled && <GoogleReviewsSection cmsData={googleReviews} />}

      <style>{`
        .hero {
          position: relative;
          background: #0f0406;
          padding: 0;
        }
        .hero-visual {
          position: relative;
        }
        .hero-card-wrap {
          position: relative;
          z-index: 2;
          margin-top: -80px;
          display: flex;
          justify-content: center;
          padding: 0 20px;
        }
        .hero-card {
          position: relative;
          background: linear-gradient(
            145deg,
            rgba(255, 253, 248, 0.98) 0%,
            rgba(252, 245, 230, 0.96) 38%,
            rgba(247, 234, 208, 0.94) 72%,
            rgba(254, 249, 239, 0.98) 100%
          );
          border-radius: var(--radius-lg);
          border: 1px solid rgba(197, 139, 56, 0.45);
          box-shadow:
            0 32px 72px rgba(88, 30, 21, 0.16),
            0 12px 30px rgba(197, 139, 56, 0.18),
            0 0 0 1px rgba(255, 255, 255, 0.8) inset;
          padding: 48px 60px;
          max-width: 740px;
          text-align: center;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          overflow: hidden;
        }
        .hero-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 12%;
          right: 12%;
          height: 2.5px;
          background: linear-gradient(90deg, transparent, rgba(197, 139, 56, 0.75), rgba(251, 223, 162, 0.95), rgba(197, 139, 56, 0.75), transparent);
          border-radius: 999px;
        }
        .hero-card::after {
          content: '';
          position: absolute;
          inset: 6px;
          border: 1px dashed rgba(197, 139, 56, 0.22);
          border-radius: calc(var(--radius-lg) - 4px);
          pointer-events: none;
        }
        .hero-eyebrow {
          color: #925c1d;
          letter-spacing: 0.28em;
          font-weight: 600;
          text-shadow: 0 1px 1px rgba(255, 255, 255, 0.6);
        }
        .hero-title {
          margin-top: 14px;
          font-size: 46px;
          line-height: 1.08;
          color: #48140c;
          font-weight: 400;
          letter-spacing: -0.01em;
          animation: heroTitleFloat 5s ease-in-out infinite alternate;
        }
        .hero-title-script {
          display: block;
          font-family: var(--font-script);
          font-style: italic;
          font-size: 98px;
          line-height: 1.02;
          margin-top: 6px;
          background: linear-gradient(
            110deg,
            #92591a 0%,
            #be8334 25%,
            #fff4d1 48%,
            #be8334 70%,
            #854b11 100%
          );
          background-size: 240% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: goldShimmerSweep 5s ease-in-out infinite, scriptFloating 4.5s ease-in-out infinite alternate;
          filter: drop-shadow(0 2px 8px rgba(197, 139, 56, 0.25));
        }
        .hero-sub {
          margin: 22px auto 28px;
          max-width: 480px;
          font-size: 15px;
          line-height: 1.75;
          color: #523c35;
          font-weight: 400;
        }
        .hero-cta-group {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }
        .hero-cta-group .btn-primary {
          background: linear-gradient(135deg, #581e15 0%, #40130d 100%);
          border: 1px solid rgba(251, 223, 162, 0.45);
          box-shadow: 0 8px 24px rgba(88, 30, 21, 0.28), 0 2px 6px rgba(0,0,0,0.1);
        }
        .hero-cta-group .btn-primary:hover {
          background: linear-gradient(135deg, #6c241a 0%, #521910 100%);
          border-color: #fbdfa2;
          box-shadow: 0 12px 30px rgba(88, 30, 21, 0.35);
        }
        .hero-sec-cta {
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(176, 115, 46, 0.65);
          color: #4a150e;
          backdrop-filter: blur(6px);
          box-shadow: 0 4px 14px rgba(197, 139, 56, 0.12);
        }
        .hero-sec-cta:hover {
          background: #b0732e;
          border-color: #b0732e;
          color: #ffffff;
          box-shadow: 0 8px 22px rgba(176, 115, 46, 0.3);
        }

        @keyframes goldShimmerSweep {
          0% { background-position: -120% center; }
          50% { background-position: 120% center; }
          100% { background-position: 280% center; }
        }
        @keyframes scriptFloating {
          0% { transform: translateY(0); }
          100% { transform: translateY(-4px); }
        }
        @keyframes heroTitleFloat {
          0% { transform: translateY(0); }
          100% { transform: translateY(-2px); }
        }

        .section-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 30px;
        }
        .see-all {
          font-size: 13px;
          color: var(--maroon-900);
          border-bottom: 1px solid var(--gold-500);
          padding-bottom: 2px;
        }

        .categories { background: var(--paper); }
        .collections { background: var(--paper); padding-top: 0; position: relative; overflow: hidden; }
        .collections .container { position: relative; z-index: 1; }
        .sparkle-bg { position: absolute; pointer-events: none; z-index: 0; }
        .sparkle-bg img { width: 100%; height: auto; display: block; }
        .sparkle-bg-a {
          top: -30px;
          left: -80px;
          width: 320px;
          opacity: 0.28;
          mix-blend-mode: multiply;
        }
        .sparkle-bg-b {
          bottom: -40px;
          right: -80px;
          width: 340px;
          opacity: 0.24;
          mix-blend-mode: multiply;
          transform: rotate(180deg);
        }

        .promo-banner { background: var(--maroon-900); padding: 40px 0; }
        .promo-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }
        .promo-inner h2 { color: var(--ivory); font-size: 24px; margin: 0 0 6px; }
        .promo-inner p { color: var(--blush-300); font-size: 13.5px; margin: 0; }
        .promo-inner .btn-outline { border-color: var(--blush-300); color: var(--ivory); }

        .story-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 64px;
          align-items: center;
        }
        .story { position: relative; overflow: hidden; }
        .sparkle-bg-story {
          top: 50%;
          right: -100px;
          transform: translateY(-50%) rotate(45deg);
          width: 440px;
          opacity: 0.25;
          mix-blend-mode: multiply;
        }
        .story-image {
          border-radius: var(--radius-md);
          overflow: hidden;
          aspect-ratio: 4 / 5;
        }
        .story-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
        }
        .story-copy p:not(.eyebrow) {
          margin: 20px 0 28px;
          font-size: 15px;
          line-height: 1.8;
          color: var(--ink-600);
          max-width: 460px;
        }

        @media (max-width: 980px) {
          .hero-title { font-size: 34px; }
          .hero-title-script { font-size: 70px; }
          .hero-card { padding: 36px 32px; }
          .hero-card-wrap { margin-top: -56px; }
          .story-grid { grid-template-columns: 1fr; gap: 32px; }
          .story-image { order: -1; }
        }
        @media (max-width: 600px) {
          .hero { padding-bottom: 44px; }
          .hero-card-wrap { margin-top: -30px; padding: 0 14px; }
          .hero-card { padding: 24px 20px; border-radius: var(--radius-md); }
          .hero-title { font-size: 23px; }
          .hero-title-script { font-size: 44px; }
          .hero-sub { font-size: 13px; margin: 14px auto 18px; }
          .promo-inner { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </div>
  );
}
