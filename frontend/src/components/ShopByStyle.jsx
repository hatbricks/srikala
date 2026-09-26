import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import TextReveal from './TextReveal';

export default function ShopByStyle({
  categories = [],
  categoryIds = [],
  heading = 'Shop by Style',
  eyebrow = '',
}) {
  const defaultIds = ['kanjivaram', 'banarasi', 'tussar', 'bridal', 'organza'];
  const ids = categoryIds && categoryIds.length > 0 ? categoryIds : defaultIds;
  const styleItems = ids
    .map((id) => categories.find((c) => c.id === id))
    .filter(Boolean);

  const displayedStyles = styleItems.length > 0 ? styleItems : categories.slice(0, 5);

  if (displayedStyles.length === 0) return null;

  return (
    <section className="shop-by-style" id="shop-by-style">
      <div className="sparkle-bg sparkle-bg-style" aria-hidden="true">
        <img src="/images/sparkle-bg.svg" alt="" />
      </div>
      <div className="container">
        <div className="shop-by-style-head">
          {eyebrow && (
            <TextReveal as="p" direction="fade" className="eyebrow">
              {eyebrow}
            </TextReveal>
          )}
          <TextReveal as="h2" delay={0.06} direction="fade" className="shop-by-style-title">
            {heading || 'Shop by Style'}
          </TextReveal>
        </div>
        <ScrollReveal delay={0.12} className="style-grid">
          {displayedStyles.map((style, idx) => (
            <Link
              key={style.id}
              to={`/products?category=${style.id}`}
              className={`style-card style-card-${idx + 1}`}
              aria-label={`Shop ${style.name} Sarees`}
            >
              <img
                src={style.image}
                alt={style.name}
                className="style-card-img"
                loading="lazy"
              />
              <div className="style-card-overlay" aria-hidden="true" />
              <span className="style-card-label">{style.name}</span>
            </Link>
          ))}
        </ScrollReveal>
      </div>

      <style>{`
        .shop-by-style {
          background: var(--paper, #FAF6F0);
          position: relative;
          overflow: hidden;
          padding: 72px 0 84px;
          border-top: 1px solid rgba(197, 139, 56, 0.14);
        }
        .shop-by-style .container {
          position: relative;
          z-index: 1;
        }
        .sparkle-bg { position: absolute; pointer-events: none; z-index: 0; }
        .sparkle-bg img { width: 100%; height: auto; display: block; }
        .sparkle-bg-style {
          top: 50%;
          left: -110px;
          transform: translateY(-50%) rotate(22deg);
          width: 380px;
          opacity: 0.24;
          mix-blend-mode: multiply;
        }
        .shop-by-style-head {
          text-align: center;
          margin-bottom: 38px;
        }
        .shop-by-style-title {
          font-family: var(--font-heading, 'Marcellus', serif);
          font-size: 38px;
          font-weight: 400;
          color: var(--brand-primary, #581e15);
          letter-spacing: -0.01em;
          margin: 0;
        }
        .style-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        .style-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          display: block;
          text-decoration: none;
          background: var(--stone-200, #eee);
          box-shadow: 0 4px 18px rgba(34, 13, 10, 0.08);
          transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s ease;
        }
        .style-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(34, 13, 10, 0.16);
        }
        .style-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .style-card:hover .style-card-img {
          transform: scale(1.04);
        }
        .style-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.68) 0%, rgba(0, 0, 0, 0.18) 40%, transparent 70%);
          pointer-events: none;
        }
        .style-card-label {
          position: absolute;
          bottom: 22px;
          left: 24px;
          color: #ffffff;
          font-family: var(--font-heading, 'Marcellus', serif);
          font-size: 20px;
          font-weight: 500;
          letter-spacing: 0.02em;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
          z-index: 2;
        }
        /* Asymmetric bento grid matching user reference photo */
        .style-card-1 {
          grid-column: span 2;
          height: 380px;
        }
        .style-card-2 {
          grid-column: span 1;
          height: 380px;
        }
        .style-card-3,
        .style-card-4,
        .style-card-5 {
          grid-column: span 1;
          height: 360px;
        }
        .style-card-6 {
          grid-column: span 3;
          height: 320px;
        }

        @media (max-width: 980px) {
          .style-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
          .style-card-1 {
            grid-column: span 2;
            height: 320px;
          }
          .style-card-2,
          .style-card-3,
          .style-card-4 {
            grid-column: span 1;
            height: 280px;
          }
          .style-card-5 {
            grid-column: span 2;
            height: 280px;
          }
        }
        @media (max-width: 600px) {
          .shop-by-style {
            padding: 48px 0 54px;
          }
          .shop-by-style-head {
            margin-bottom: 22px;
          }
          .shop-by-style-title {
            font-size: 26px;
          }
          .style-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .style-card-1,
          .style-card-2,
          .style-card-3,
          .style-card-4,
          .style-card-5,
          .style-card-6 {
            grid-column: span 1;
            height: 230px;
          }
          .style-card-label {
            bottom: 14px;
            left: 16px;
            font-size: 16px;
          }
        }
      `}</style>
    </section>
  );
}
