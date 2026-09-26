import ProductCard from './ProductCard';
import ScrollReveal from './ScrollReveal';
import TextReveal from './TextReveal';

// Deterministic-ish shuffle so it doesn't feel identical to the featured grid on Home
function pickRandom(products, count, excludeId) {
  const pool = products.filter((p) => p.id !== excludeId);
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// `products` is the already-fetched live catalog (passed down from the
// page, not fetched here — see Home.jsx / ProductDetail.jsx). `curatedIds`
// is the admin's hand-picked list from the "Recommended Sarees" section in
// /admin/home, in the order they set it; when empty, falls back to a
// random pick from the real catalog, same as before.
export default function RecommendedProducts({ products = [], curatedIds = [], excludeId, title = 'Recommended For You' }) {
  const picked = curatedIds.length > 0
    ? curatedIds.map((id) => products.find((p) => p.id === id)).filter((p) => p && p.id !== excludeId)
    : pickRandom(products, 4, excludeId);

  if (picked.length === 0) return null;

  return (
    <section className="recommended">
      <div className="sparkle-bg sparkle-bg-rec" aria-hidden="true">
        <img src="/images/sparkle-bg.svg" alt="" />
      </div>
      <div className="container">
        <TextReveal as="p" direction="fade" className="eyebrow">You might also like</TextReveal>
        <TextReveal as="h2" delay={0.08} direction="left" distance={32}>{title}</TextReveal>
        <ScrollReveal delay={0.15} className="recommended-grid">
          {picked.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </ScrollReveal>
      </div>

      <style>{`
        .recommended {
          position: relative;
          overflow: hidden;
          background: var(--stone-100);
          padding: 80px 0;
          border-top: 1px solid rgba(197, 139, 56, 0.12);
        }
        .recommended .container {
          position: relative;
          z-index: 1;
        }
        .sparkle-bg { position: absolute; pointer-events: none; z-index: 0; }
        .sparkle-bg img { width: 100%; height: auto; display: block; }
        .sparkle-bg-rec {
          top: -30px;
          right: -70px;
          width: 360px;
          opacity: 0.24;
          mix-blend-mode: multiply;
          transform: rotate(-18deg);
        }
        .recommended h2 { font-size: 26px; margin: 8px 0 30px; }
        .recommended-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 26px;
        }
        @media (max-width: 980px) {
          .recommended-grid { grid-template-columns: repeat(2, 1fr); }
          .sparkle-bg-rec {
            width: 250px;
            right: -50px;
            top: -20px;
          }
        }
        @media (max-width: 520px) {
          .recommended-grid { gap: 16px; }
        }
      `}</style>
    </section>
  );
}
