import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import TextReveal from './TextReveal';

const DEFAULT_COLLECTIONS = [
  { id: 'heirloom', name: 'Heirloom Collection', image: '/images/styles/kanchivaram.jpg' },
  { id: 'vintage', name: 'Vintage Collection', image: '/images/styles/banarasi.jpg' },
  { id: 'wedding', name: 'Wedding Collection', image: 'https://images.unsplash.com/photo-1692992193981-d3d92fabd9cb?auto=format&fit=crop&w=800&q=80' },
  { id: 'festive', name: 'Festive Collection', image: 'https://images.unsplash.com/photo-1610189012906-4c0aa9b9781e?auto=format&fit=crop&w=800&q=80' },
  { id: 'office', name: 'Office Collection', image: 'https://images.unsplash.com/photo-1609748340041-f5d61e061ebc?auto=format&fit=crop&w=800&q=80' },
];

export default function ShopByStyle({
  categories = [],
  categoryIds = [],
  items = [],
  heading = 'Shop by Style',
  eyebrow = '',
}) {
  // If items are passed directly from CMS or defaults
  let displayedStyles = items && items.length > 0 ? items : null;

  if (!displayedStyles) {
    if (categoryIds && categoryIds.length > 0) {
      displayedStyles = categoryIds
        .map((id) => categories.find((c) => c.id === id) || DEFAULT_COLLECTIONS.find((c) => c.id === id))
        .filter(Boolean);
    }
  }

  if (!displayedStyles || displayedStyles.length === 0) {
    displayedStyles = DEFAULT_COLLECTIONS;
  }

  if (displayedStyles.length === 0) return null;

  return (
    <section className="shop-by-style" id="shop-by-style">
      <div className="sparkle-bg sparkle-bg-style" aria-hidden="true">
        <img src="/images/temple-bg.svg" alt="" />
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
              <div className="style-card-label-wrap">
                <span className="style-card-label">
                  <span>{style.name}</span>
                  <span className="style-card-arrow" aria-hidden="true">→</span>
                </span>
              </div>
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
          transform: translateY(-50%);
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
        .style-card-label-wrap {
          position: absolute;
          bottom: 20px;
          left: 20px;
          right: 20px;
          z-index: 2;
          pointer-events: none;
        }
        .style-card-label {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px;
          background: rgba(32, 8, 11, 0.75);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(251, 223, 162, 0.4);
          border-radius: 999px;
          color: #ffffff;
          font-family: var(--font-heading, 'Marcellus', serif);
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.28);
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .style-card-arrow {
          display: inline-block;
          font-size: 14px;
          color: var(--brand-gold-light, #fbdfa2);
          transition: transform 0.25s ease;
        }
        .style-card:hover .style-card-arrow {
          transform: translateX(4px);
        }
        .style-card:hover .style-card-label {
          background: rgba(45, 12, 17, 0.9);
          border-color: rgba(251, 223, 162, 0.75);
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
            height: 280px;
          }
          .style-card-2,
          .style-card-3,
          .style-card-4 {
            grid-column: span 1;
            height: 260px;
          }
          .style-card-5 {
            grid-column: span 2;
            height: 260px;
          }
        }
        @media (max-width: 600px) {
          .shop-by-style {
            padding: 44px 0 92px;
          }
          .shop-by-style-head {
            margin-bottom: 22px;
          }
          .shop-by-style-title {
            font-size: 26px;
          }
          .style-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .style-card {
            border-radius: 14px;
          }
          .style-card-1 {
            grid-column: span 2;
            height: 190px;
          }
          .style-card-2,
          .style-card-3,
          .style-card-4,
          .style-card-5,
          .style-card-6 {
            grid-column: span 1;
            height: 220px;
          }
          .style-card-label-wrap {
            bottom: 12px;
            left: 10px;
            right: 10px;
          }
          .style-card-label {
            padding: 6px 12px;
            font-size: 12.5px;
            gap: 6px;
            width: auto;
            max-width: 100%;
          }
          .style-card-label span:first-child {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .style-card-arrow {
            font-size: 12px;
          }
        }
      `}</style>
    </section>
  );
}
