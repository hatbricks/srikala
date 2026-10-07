import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecommendedProducts from '../components/RecommendedProducts';
import ScrollReveal from '../components/ScrollReveal';
import Seo from '../components/Seo';
import { api } from '../data/api';
import BRAND from '../config/brand';

const defaults = {
  hero: {
    eyebrow: `ABOUT ${BRAND.name.toUpperCase()}`,
    heading: 'Curating Dharmavaram & Indian Heritage, Honoring Timeless Artistry',
    subtitle: 'Woven slowly on traditional pit looms in Dharmavaram, honoring centuries of sacred weaving devotion and pure zari craftsmanship.',
  },
  story: {
    heading: 'Our Story',
    paragraphs: BRAND.story.paragraphs,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
    gallery: [],
  },
};

export default function About() {
  const [hero, setHero] = useState(defaults.hero);
  const [story, setStory] = useState(defaults.story);

  useEffect(() => {
    Promise.all([
      api.getHomeSection('about_hero').catch(() => null),
      api.getHomeSection('about_story').catch(() => null),
    ]).then(([heroRes, storyRes]) => {
      if (heroRes?.section?.content) setHero({ ...defaults.hero, ...heroRes.section.content });
      if (storyRes?.section?.content) setStory({ ...defaults.story, ...storyRes.section.content });
    });
  }, []);

  const paragraphs = story.paragraphs?.length ? story.paragraphs : defaults.story.paragraphs;

  return (
    <div className="about-page">
      <Seo
        title={`Best Traditional Sarees in Dharmavaram — Our Heritage | ${BRAND.name}`}
        path="/about"
        description="Learn about Ravichandra Textiles, weavers of the best traditional sarees in Dharmavaram. Discover generations of master artisan heritage, authentic pure silk pit looms, and bridal pattu excellence."
        keywords="about ravichandra textiles, best traditional sarees in dharmavaram, dharmavaram silk heritage, master weavers dharmavaram, pure silk sarees andhra pradesh"
      />

      {/* --- About Story Hero Banner (Curved Header Editorial Layout) --- */}
      <section className="about-hero-banner" aria-label="About Ravichandra Textiles">
        <div className="container about-hero-container">
          <nav className="about-breadcrumb-top" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="crumb-sep">›</span>
            <span className="crumb-current">About Us</span>
          </nav>

          <div className="about-curved-banner-card">
            {/* Left Photographic Artisan Pit-Loom Visual */}
            <div className="about-curved-photo-wrap">
              <img
                src={hero.image || '/images/about-hero-artisan.jpg'}
                alt="Ravichandra Textiles Master Weavers Pit Loom Craftsmanship Dharmavaram"
                className="about-curved-img"
              />
              <div className="about-curved-img-overlay" aria-hidden="true" />
            </div>

            {/* Right Arched Content Area */}
            <div className="about-curved-content">
              <span className="about-curved-badge">{hero.eyebrow || `ABOUT ${BRAND.name.toUpperCase()}`}</span>
              <h1 className="about-curved-title">{hero.heading}</h1>
              <p className="about-curved-description">
                {hero.subtitle || defaults.hero.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-body">
        <div className="container about-grid">
          <ScrollReveal as="div" className="about-image" y={0} duration={1}>
            <img src={story.image} alt={story.heading} />
          </ScrollReveal>
          <ScrollReveal className="about-copy" delay={0.1}>
            <h2>{story.heading}</h2>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </ScrollReveal>
        </div>

        {story.gallery?.length > 0 && (
          <div className="container">
            <ScrollReveal delay={0.15} className="about-gallery">
              {story.gallery.map((src, i) => (
                <div className="gallery-thumb" key={i}>
                  <img src={src} alt={`${story.heading} ${i + 1}`} />
                </div>
              ))}
            </ScrollReveal>
          </div>
        )}
      </section>

      <section className="about-values">
        <div className="container values-grid">
          {BRAND.story.values.map((v, i) => (
            <ScrollReveal as="div" className="value-card" delay={i * 0.1} key={v.title}>
              <h3>{v.title}</h3>
              <p>{v.description}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <RecommendedProducts />

      <style>{`
        /* --- About Story Hero Banner (Curved Header Editorial) --- */
        .about-hero-banner {
          position: relative;
          z-index: 2;
          padding: 10px 32px 0;
          width: 100%;
          box-sizing: border-box;
        }

        .about-hero-container {
          max-width: var(--container, 1240px);
          margin: 0 auto;
          padding: 0;
        }

        .about-breadcrumb-top {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: 13px;
          color: var(--brand-muted, #735e59);
          margin-bottom: 10px;
        }

        .about-breadcrumb-top a {
          color: var(--brand-muted, #735e59);
          text-decoration: none;
          transition: color 0.18s ease;
        }

        .about-breadcrumb-top a:hover {
          color: var(--brand-primary, #581e15);
          text-decoration: underline;
        }

        .crumb-sep {
          opacity: 0.6;
          font-size: 13px;
          line-height: 1;
        }

        .crumb-current {
          font-weight: 600;
          color: var(--brand-primary, #581e15);
        }

        /* Curved Banner Card: Left photo, right curved arch container */
        .about-curved-banner-card {
          position: relative;
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          align-items: stretch;
          min-height: 380px;
          background: #d8cec4; /* Warm tactile earthen stone tone */
          border-radius: 20px 190px 190px 20px; /* Signature curved arch on the right */
          overflow: hidden;
          box-shadow: 0 12px 36px rgba(44, 24, 16, 0.08);
          border: 1px solid rgba(197, 139, 56, 0.28);
        }

        .about-curved-photo-wrap {
          position: relative;
          height: 100%;
          min-height: 380px;
          overflow: hidden;
        }

        .about-curved-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 25%;
          display: block;
        }

        .about-curved-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.05) 0%,
            rgba(216, 206, 196, 0.2) 65%,
            rgba(216, 206, 196, 0.95) 100%
          );
          pointer-events: none;
        }

        .about-curved-content {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 44px 56px 44px 20px;
          z-index: 2;
        }

        .about-curved-badge {
          display: inline-block;
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--brand-primary, #581e15);
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(4px);
          padding: 4px 14px;
          border-radius: 999px;
          margin-bottom: 14px;
          border: 1px solid rgba(197, 139, 56, 0.25);
        }

        .about-curved-title {
          font-family: var(--font-display);
          font-size: clamp(28px, 3.2vw, 44px);
          font-weight: 500;
          line-height: 1.15;
          color: #2b1812;
          margin: 0 0 16px;
          letter-spacing: -0.01em;
        }

        .about-curved-description {
          font-family: var(--font-body);
          font-size: clamp(13px, 1.1vw, 15px);
          line-height: 1.65;
          color: #4b362c;
          margin: 0;
          max-width: 480px;
          font-weight: 400;
        }

        .about-body {
          padding: 50px 0 60px;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 60px;
          align-items: center;
        }
        .about-image {
          border-radius: var(--radius-md);
          overflow: hidden;
          aspect-ratio: 4 / 5;
          box-shadow: 0 16px 36px rgba(32, 8, 11, 0.12);
          border: 1px solid rgba(197, 139, 56, 0.2);
        }
        .about-image img { width: 100%; height: 100%; object-fit: cover; object-position: top center; }
        .about-copy h2 {
          font-family: var(--font-display);
          font-size: 32px;
          color: var(--brand-primary);
          margin-bottom: 20px;
        }
        .about-copy p {
          font-size: 15px;
          line-height: 1.85;
          color: var(--ink-600);
          margin-bottom: 18px;
          max-width: 520px;
        }
        .about-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 16px;
          margin-top: 44px;
        }
        .gallery-thumb {
          border-radius: var(--radius-sm);
          overflow: hidden;
          aspect-ratio: 1 / 1;
        }
        .gallery-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .about-values {
          background: var(--brand-background);
          padding-top: 70px;
          padding-bottom: 70px;
          border-top: 1px solid var(--brand-border);
          border-bottom: 1px solid var(--brand-border);
        }
        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        .value-card {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 34px 28px;
          border: 1px solid rgba(197, 139, 56, 0.2);
          box-shadow: 0 8px 22px rgba(32, 8, 11, 0.04);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .value-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(32, 8, 11, 0.08);
        }
        .value-card h3 {
          font-family: var(--font-display);
          font-size: 20px;
          color: var(--brand-primary);
          margin-bottom: 10px;
        }
        .value-card p { font-size: 14px; line-height: 1.7; color: var(--ink-600); margin: 0; }
        @media (max-width: 980px) {
          .about-hero-banner {
            padding: 16px 18px 0;
          }

          .about-curved-banner-card {
            grid-template-columns: 1fr;
            border-radius: 20px 20px 90px 20px;
            min-height: auto;
          }

          .about-curved-photo-wrap {
            height: 280px;
            min-height: 280px;
          }

          .about-curved-img-overlay {
            background: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.05) 0%,
              rgba(216, 206, 196, 0.4) 65%,
              rgba(216, 206, 196, 1) 100%
            );
          }

          .about-curved-content {
            padding: 30px 28px 36px;
          }

          .about-curved-title {
            font-size: 30px;
            margin-bottom: 12px;
          }

          .about-breadcrumb-top {
            margin-bottom: 10px;
            font-size: 12px;
          }
        }

        @media (max-width: 860px) {
          .about-grid { grid-template-columns: 1fr; gap: 28px; }
          .values-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 480px) {
          .about-hero-banner {
            padding: 12px 12px 0;
          }

          .about-curved-banner-card {
            border-radius: 16px 16px 60px 16px;
          }

          .about-curved-photo-wrap {
            height: 220px;
            min-height: 220px;
          }

          .about-curved-content {
            padding: 22px 18px 26px;
          }

          .about-curved-title {
            font-size: 24px;
            margin-bottom: 8px;
          }

          .about-curved-description {
            font-size: 13px;
            line-height: 1.55;
          }

          .about-breadcrumb-top {
            font-size: 11px;
            gap: 6px;
            margin-bottom: 8px;
          }
        }
      `}</style>
    </div>
  );
}
