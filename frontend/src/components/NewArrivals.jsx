import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import ScrollReveal from './ScrollReveal';
import TextReveal from './TextReveal';

export default function NewArrivals({
  products = [],
  curatedIds = [],
  eyebrow = 'Fresh Off The Loom',
  heading = 'New Arrivals',
  subheading = 'Discover our latest handpicked weaves, newly arrived from master artisan looms.',
  ctaLabel = 'View All New Arrivals',
  ctaLink = '/products?sort=newest',
}) {
  // If curatedIds are set by the admin, resolve them in order;
  // otherwise, take the first 4 products (newest first from catalog).
  const displayed = curatedIds.length > 0
    ? curatedIds.map((id) => products.find((p) => p.id === id)).filter(Boolean)
    : products.slice(0, 4);

  if (!displayed || displayed.length === 0) return null;

  return (
    <section className="new-arrivals" id="new-arrivals">
      <div className="sparkle-bg sparkle-bg-new" aria-hidden="true">
        <img src="/images/sparkle-bg.svg" alt="" />
      </div>
      <div className="container">
        <div className="new-arrivals-head">
          <div className="new-arrivals-title-group">
            <TextReveal as="p" direction="fade" className="eyebrow new-arrivals-eyebrow">
              {eyebrow}
            </TextReveal>
            <TextReveal as="h2" delay={0.06} direction="left" distance={30} className="new-arrivals-heading">
              {heading}
            </TextReveal>
            {subheading && (
              <TextReveal as="p" delay={0.12} direction="fade" className="new-arrivals-sub">
                {subheading}
              </TextReveal>
            )}
          </div>
          {ctaLabel && (
            <ScrollReveal delay={0.15} className="new-arrivals-cta-wrap">
              <Link to={ctaLink || '/products?sort=newest'} className="new-arrivals-link">
                <span>{ctaLabel}</span>
                <span className="arrow-icon" aria-hidden="true">→</span>
              </Link>
            </ScrollReveal>
          )}
        </div>

        <div className="new-arrivals-grid">
          {displayed.map((product, index) => (
            <ScrollReveal key={product.id} delay={0.08 * (index + 1)} y={24} duration={0.8}>
              <ProductCard product={product} isNew={true} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      <style>{`
        .new-arrivals {
          position: relative;
          overflow: hidden;
          background-color: #ffffff;
          background-image: url('/images/new-arrivals-bg.jpg');
          background-repeat: no-repeat;
          background-position: center top;
          background-size: 100% auto;
          padding: 140px 0 100px;
          border-top: 1px solid rgba(197, 139, 56, 0.2);
        }
        .new-arrivals::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.05) 40%,
            rgba(255, 255, 255, 0.75) 75%,
            #ffffff 100%
          );
          pointer-events: none;
          z-index: 0;
        }
        .new-arrivals .container {
          position: relative;
          z-index: 1;
        }
        .sparkle-bg { position: absolute; pointer-events: none; z-index: 0; }
        .sparkle-bg img { width: 100%; height: auto; display: block; }
        .sparkle-bg-new {
          top: -30px;
          right: -70px;
          width: 360px;
          opacity: 0.18;
          mix-blend-mode: multiply;
          transform: rotate(-15deg);
        }
        @media (max-width: 768px) {
          .sparkle-bg-new {
            width: 250px;
            right: -50px;
            top: -20px;
          }
        }
        .new-arrivals-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 50px;
          background: linear-gradient(135deg, rgba(255, 253, 248, 0.88) 0%, rgba(253, 246, 234, 0.72) 100%);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: 24px 32px;
          border-radius: var(--radius-md);
          border: 1px solid rgba(197, 139, 56, 0.3);
          box-shadow: 0 12px 32px rgba(88, 30, 21, 0.08);
          max-width: 760px;
        }
        .new-arrivals-title-group {
          max-width: 600px;
        }
        .new-arrivals-eyebrow {
          color: var(--brand-secondary, #b0732e);
          letter-spacing: 0.22em;
          font-weight: 600;
          font-size: 11.5px;
          margin-bottom: 6px;
        }
        .new-arrivals-heading {
          font-family: var(--font-heading, 'Marcellus', serif);
          font-size: 38px;
          line-height: 1.15;
          color: var(--brand-primary, #581e15);
          font-weight: 400;
          margin: 0;
        }
        .new-arrivals-sub {
          margin: 10px 0 0;
          font-size: 14.5px;
          line-height: 1.6;
          color: var(--ink-600, #735e59);
        }
        .new-arrivals-cta-wrap {
          flex-shrink: 0;
          padding-bottom: 4px;
        }
        .new-arrivals-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--brand-primary, #581e15);
          text-decoration: none;
          padding-bottom: 3px;
          border-bottom: 1.5px solid var(--brand-secondary, #b0732e);
          transition: color 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
        }
        .new-arrivals-link .arrow-icon {
          display: inline-block;
          font-size: 15px;
          transition: transform 0.25s ease;
        }
        .new-arrivals-link:hover {
          color: var(--brand-secondary, #b0732e);
          border-color: var(--brand-primary, #581e15);
        }
        .new-arrivals-link:hover .arrow-icon {
          transform: translateX(4px);
        }
        .new-arrivals-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 26px;
        }

        @media (max-width: 980px) {
          .new-arrivals {
            padding: 80px 0 70px;
            background-size: cover;
            background-position: 65% top;
          }
          .new-arrivals-heading {
            font-size: 30px;
          }
          .new-arrivals-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }
        @media (max-width: 600px) {
          .new-arrivals {
            padding: 50px 0 60px;
            background-size: cover;
            background-position: 75% top;
          }
          .new-arrivals-head {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 28px;
            padding: 18px 20px;
          }
          .new-arrivals-heading {
            font-size: 24px;
          }
          .new-arrivals-sub {
            font-size: 13px;
          }
          .new-arrivals-grid {
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
}
