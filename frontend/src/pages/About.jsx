import { useEffect, useState } from 'react';
import RecommendedProducts from '../components/RecommendedProducts';
import ScrollReveal from '../components/ScrollReveal';
import Seo from '../components/Seo';
import { api } from '../data/api';
import BRAND from '../config/brand';

const defaults = {
  hero: {
    eyebrow: 'About Sri Kala',
    heading: 'Curating Indian Heritage, Honoring Timeless Artistry',
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
        title="About Us"
        path="/about"
        description="Sri Kala celebrates the timeless beauty of Indian craftsmanship, bringing together thoughtfully selected sarees that honour traditional artistry."
      />
      <section className="about-hero">
        <div className="container">
          <p className="eyebrow" style={{ color: 'var(--brand-gold-light)', letterSpacing: '0.22em' }}>{hero.eyebrow}</p>
          <h1>{hero.heading}</h1>
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
        .about-hero {
          background: var(--maroon-950);
          padding: 100px 0 64px;
          border-bottom: 1px solid rgba(197, 139, 56, 0.2);
        }
        .about-hero h1 {
          color: var(--ivory);
          font-size: 40px;
          max-width: 660px;
          margin-top: 14px;
          line-height: 1.25;
          font-family: var(--font-display);
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
        @media (max-width: 860px) {
          .about-grid { grid-template-columns: 1fr; gap: 28px; }
          .values-grid { grid-template-columns: 1fr; }
          .about-hero h1 { font-size: 30px; }
        }
      `}</style>
    </div>
  );
}
