import { useEffect, useRef, useState } from 'react';

const PATTO_SAREES = [
  {
    id: 'kanjivaram-purple',
    title: 'Kanjivaram Pattu',
    tagline: 'Deep Purple Silk • Pure Gold Zari Pallu',
    badge: 'Temple Border Heritage',
    src: 'https://images.unsplash.com/photo-1641699862936-be9f49b1c38d?auto=format&fit=crop&w=2000&q=85',
    alt: 'Handwoven purple Kanjivaram pattu saree with gold zari pallu',
  },
  {
    id: 'banarasi-crimson',
    title: 'Banarasi Brocade',
    tagline: 'Royal Crimson Silk • Intricate Floral Jaal',
    badge: 'Artisan Zari Weave',
    src: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=85',
    alt: 'Royal crimson Banarasi pattu silk saree with fine gold brocade',
  },
  {
    id: 'bridal-ivory',
    title: 'Bridal Kanjivaram',
    tagline: 'Ivory & Gold • Heirloom Wedding Drape',
    badge: 'Sacred Bridal Edit',
    src: 'https://images.unsplash.com/photo-1619516388835-2b60acc4049e?auto=format&fit=crop&w=2000&q=85',
    alt: 'Ivory and gold bridal Kanjivaram pattu saree with heavy contrast border',
  },
  {
    id: 'kanjivaram-teal',
    title: 'Teal Temple Silk',
    tagline: 'Peacock Teal • Korvai Handwoven Border',
    badge: 'Master Weaver Craft',
    src: 'https://images.unsplash.com/photo-1676696706907-0e04665b80bd?auto=format&fit=crop&w=2000&q=85',
    alt: 'Teal Kanjivaram pattu saree with traditional temple border and gold motifs',
  },
];

const FRAME_DURATION = 4200; // ms per saree transition

export default function TraditionalSareeTransition({ isSlideActive = true, onCycleComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isSlideActive) return undefined;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % PATTO_SAREES.length;
        if (next === 0 && onCycleComplete) {
          onCycleComplete();
        }
        return next;
      });
    }, FRAME_DURATION);

    return () => clearInterval(timerRef.current);
  }, [isSlideActive, onCycleComplete]);

  const activeSaree = PATTO_SAREES[currentIndex];

  return (
    <div className="saree-transition-stage" aria-label="Traditional Pattu Saree Showcase">
      {PATTO_SAREES.map((saree, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={saree.id}
            className={`saree-frame ${isActive ? 'active' : ''} zoom-${idx % 2 === 0 ? 'in' : 'out'}`}
            aria-hidden={!isActive}
          >
            <img
              src={saree.src}
              alt={saree.alt}
              loading={idx === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>
        );
      })}

      {/* Radiant golden silk shimmer sweep */}
      <div className="saree-shimmer-layer" key={`shimmer-${currentIndex}`} aria-hidden="true" />

      {/* Subtle vignette and gradient for text readability */}
      <div className="saree-vignette-overlay" aria-hidden="true" />

      {/* Floating Artisan Weave Tag */}
      <div className="saree-artisan-badge" key={`badge-${activeSaree.id}`}>
        <span className="saree-badge-sparkle">✦</span>
        <span className="saree-badge-type">{activeSaree.badge}</span>
        <span className="saree-badge-sep">•</span>
        <span className="saree-badge-title">{activeSaree.title}</span>
      </div>

      <style>{`
        .saree-transition-stage {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #1a0508;
        }

        .saree-frame {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          will-change: opacity, transform;
        }

        .saree-frame.active {
          opacity: 1;
          pointer-events: auto;
        }

        .saree-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
          transform-origin: center center;
        }

        /* Cinematic Ken Burns slow panning & scaling */
        .saree-frame.zoom-in img {
          animation: sareeKenBurnsIn ${FRAME_DURATION + 1400}ms ease-out forwards;
        }

        .saree-frame.zoom-out img {
          animation: sareeKenBurnsOut ${FRAME_DURATION + 1400}ms ease-out forwards;
        }

        @keyframes sareeKenBurnsIn {
          0% { transform: scale(1.01) translateY(0); }
          100% { transform: scale(1.08) translateY(-1.2%); }
        }

        @keyframes sareeKenBurnsOut {
          0% { transform: scale(1.08) translateY(-1%); }
          100% { transform: scale(1.02) translateY(0.5%); }
        }

        /* Subtle gold zari light-sweep */
        .saree-shimmer-layer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            115deg,
            transparent 0%,
            rgba(212, 175, 55, 0.08) 45%,
            rgba(255, 235, 170, 0.18) 50%,
            rgba(212, 175, 55, 0.08) 55%,
            transparent 100%
          );
          opacity: 0;
          animation: zariSweep 1.6s ease-in-out forwards;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        @keyframes zariSweep {
          0% { transform: translateX(-100%); opacity: 0; }
          30% { opacity: 0.9; }
          100% { transform: translateX(100%); opacity: 0; }
        }

        /* Subtle dark vignette to ensure text contrast */
        .saree-vignette-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(20, 4, 8, 0.2) 0%,
            rgba(15, 2, 5, 0.65) 100%
          );
          pointer-events: none;
        }

        /* Floating artisan label in bottom corner */
        .saree-artisan-badge {
          position: absolute;
          bottom: 24px;
          right: 28px;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(30, 8, 14, 0.65);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(212, 175, 55, 0.35);
          color: #f7eed8;
          font-family: var(--font-body, inherit);
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
          animation: badgeFade 0.8s ease forwards;
        }

        .saree-badge-sparkle {
          color: #d4af37;
          font-size: 12px;
        }

        .saree-badge-type {
          color: #f3dfa2;
          font-weight: 500;
        }

        .saree-badge-sep {
          color: rgba(255, 255, 255, 0.4);
        }

        .saree-badge-title {
          color: #fff;
          font-weight: 600;
        }

        @keyframes badgeFade {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
          .saree-artisan-badge {
            bottom: 38px;
            right: 16px;
            padding: 4px 10px;
            font-size: 10px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .saree-frame.zoom-in img,
          .saree-frame.zoom-out img {
            animation: none;
          }
          .saree-shimmer-layer {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
