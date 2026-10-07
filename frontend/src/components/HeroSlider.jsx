import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import TraditionalSareeTransition from './TraditionalSareeTransition';

const defaultSlides = [
  {
    id: 'hero-photo-1',
    type: 'image',
    src: '/images/hero-slide-1.jpg',
    mobileSrc: '/images/hero-mobile-slide-1.jpg',
    alt: 'Handwoven Heritage Saree - Ravichandra Textiles',
    eyebrow: '',
    heading: 'Handwoven Heritage.',
    headingAccent: 'Woven for Generations.',
    subheading: 'Handwoven silk sarees created in limited existence — crafted slowly, woven with heritage, and never mass produced.',
    ctaLabel: 'Explore All Collections »',
    ctaLink: '/products',
  },
  {
    id: 'hero-photo-2',
    type: 'image',
    src: '/images/hero-slide-2.jpg',
    mobileSrc: '/images/hero-mobile-slide-2.jpg',
    alt: 'Temple Traditions Dharmavaram Silk Saree',
    eyebrow: 'TEMPLE TRADITIONS',
    heading: 'Temple Traditions.',
    headingAccent: 'Woven in Sacred Zari.',
    subheading: 'Authentic Dharmavaram & Kanchivaram silks, handpicked for divine celebrations and weddings.',
    ctaLabel: 'Shop Dharmavaram »',
    ctaLink: '/products?category=kanjivaram',
  },
  {
    id: 'hero-photo-3',
    type: 'image',
    src: '/images/hero-slide-3.jpg',
    alt: 'Royal Bridal Weaves - Dharmavaram Silk',
    eyebrow: 'ROYAL WEAVES',
    heading: 'Royal Bridal Weaves.',
    headingAccent: 'Heirloom for Lifetimes.',
    subheading: 'Master artisan craftsmanship with pure mulberry silk and authentic silk mark certification.',
    ctaLabel: 'Discover Bridal Pattu »',
    ctaLink: '/products?category=banarasi',
  },
];

const BLANK_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
const loadingSlides = [{ id: 'loading', type: 'image', src: BLANK_IMAGE, alt: '' }];

export default function HeroSlider({ slides: cmsSlides, mobileSlides: cmsMobileSlides }) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false,
  );

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const stillLoading = cmsSlides === null && cmsMobileSlides === null;

  const activeCmsSlides = isMobile && Array.isArray(cmsMobileSlides) && cmsMobileSlides.length
    ? cmsMobileSlides
    : cmsSlides;

  const slides = stillLoading
    ? loadingSlides
    : (Array.isArray(activeCmsSlides) && activeCmsSlides.length
      ? activeCmsSlides.map((s, i) => ({
          id: s.id || `${i}-${s.url}`,
          type: s.type || 'image',
          src: (isMobile && (s.mobileUrl || s.mobileSrc)) ? (s.mobileUrl || s.mobileSrc) : (s.url || s.src),
          alt: s.alt || s.heading || 'Ravichandra Textiles Sarees',
          eyebrow: s.eyebrow,
          heading: s.heading,
          headingAccent: s.headingAccent,
          subheading: s.subheading,
          ctaLabel: s.ctaLabel,
          ctaLink: s.ctaLink,
        }))
      : defaultSlides.map((s) => ({
          ...s,
          src: (isMobile && s.mobileSrc) ? s.mobileSrc : s.src,
        })));

  return <HorizontalHeroSlider slides={slides} isMobile={isMobile} />;
}

// High-performance 4K video element: Hardware accelerated, plays when active,
// pauses and rewinds when inactive to save decoder bandwidth and CPU/GPU resources.
function HeroVideoSlide({ src, alt, isActive, onEnded, isSingle }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isActive) {
      vid.currentTime = 0;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      vid.pause();
    }
  }, [isActive]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      playsInline
      preload="auto"
      autoPlay={isActive}
      loop={isSingle}
      onEnded={onEnded}
      aria-label={alt}
      className="hero-media"
    />
  );
}

// Unified horizontal slider with smooth sliding carousel transition
function HorizontalHeroSlider({ slides, isMobile }) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const slidesKey = slides.map((s) => s.src || s.id).join('|');

  useEffect(() => {
    setActive(0);
  }, [slidesKey]);

  useEffect(() => {
    clearInterval(timerRef.current);
    if (slides.length <= 1 || isPaused) return undefined;

    const currentSlide = slides[active];
    const firstImageIndex = slides.findIndex((s) => s.type === 'image');
    // First hero slide (index 0) or first image slide gets +20s
    const isFirstHero = active === 0 || active === firstImageIndex;
    const additionalTime = isFirstHero ? 20000 : 0;

    // If the active slide is a static image, auto-advance after 5.5s (+20s for first hero image = 25.5s)
    if (currentSlide?.type === 'image') {
      const duration = (currentSlide.duration || 5500) + additionalTime;
      timerRef.current = setInterval(() => {
        setActive((i) => (i + 1) % slides.length);
      }, duration);
    } else if (currentSlide?.type === 'video') {
      // Safety auto-advance in case video is extra long or fails onEnded event (+20s for slide 0 = 28.5s)
      const duration = (currentSlide.duration || 8500) + additionalTime;
      timerRef.current = setInterval(() => {
        setActive((i) => (i + 1) % slides.length);
      }, duration);
    }

    return () => clearInterval(timerRef.current);
  }, [active, slidesKey, slides, isPaused]);

  function handleSlideEnded() {
    if (slides.length > 1) {
      setActive((i) => (i + 1) % slides.length);
    }
  }

  function goTo(i) {
    setActive((i + slides.length) % slides.length);
  }

  return (
    <div
      className="hero-slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Sliding track for buttery 60fps horizontal slide animation */}
      <div
        className="hero-slider-track"
        style={{
          transform: `translate3d(-${active * 100}%, 0, 0)`,
        }}
      >
        {slides.map((s, i) => (
          <div key={s.id} className="hero-slide-item">
            {s.type === 'video' ? (
              <HeroVideoSlide
                src={s.src}
                alt={s.alt}
                isActive={i === active}
                onEnded={handleSlideEnded}
                isSingle={slides.length === 1}
              />
            ) : s.type === 'transition' ? (
              <TraditionalSareeTransition
                isSlideActive={i === active}
                onCycleComplete={slides.length > 1 ? handleSlideEnded : undefined}
              />
            ) : (
              <img
                src={s.src}
                alt={s.alt}
                className="hero-media"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            )}

            {/* Soft white/warm scrim for crystal clear contrast on text */}
            <div className="hero-left-scrim" aria-hidden="true" />

            {/* Left-side text overlay */}
            {(s.heading || s.subheading || s.eyebrow) && (
              <div className="hero-left-content">
                <div className="hero-left-inner">
                  {s.eyebrow && (
                    <span className="hero-left-eyebrow">{s.eyebrow}</span>
                  )}
                  {s.heading && (
                    <h2 className="hero-left-title">
                      <span className="hero-title-main">{s.heading}</span>
                      {s.headingAccent && (
                        <span className="hero-heading-accent">
                          {s.headingAccent.split(' ').map((word, wIdx, arr) => 
                            wIdx === arr.length - 1 ? <em key={wIdx}>{word}</em> : word + ' '
                          )}
                        </span>
                      )}
                    </h2>
                  )}
                  {s.subheading && (
                    <p className="hero-left-sub">{s.subheading}</p>
                  )}
                  {s.ctaLabel && (
                    <div className="hero-left-actions">
                      <Link to={s.ctaLink || '/products'} className="hero-slide-cta-btn">
                        {s.ctaLabel}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            className="hero-arrow hero-arrow-prev"
            onClick={() => goTo(active - 1)}
            aria-label="Previous slide"
          >
            <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className="hero-arrow hero-arrow-next"
            onClick={() => goTo(active + 1)}
            aria-label="Next slide"
          >
            <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {/* Navigation Dots Indicator */}
      {slides.length > 1 && (
        <div className="hero-slider-dots">
          {slides.map((s, i) => (
            <button
              key={s.id}
              className={'hero-dot' + (i === active ? ' active' : '')}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      <HeroSliderStyles />
    </div>
  );
}

function HeroSliderStyles() {
  return (
    <style>{`
      .hero-slider {
        position: relative;
        width: 100%;
        height: clamp(580px, 80vh, 760px);
        min-height: 560px;
        border-radius: clamp(32px, 4.5vw, 64px);
        overflow: hidden;
        background: #ede4dc;
        box-shadow: 0 16px 50px rgba(43, 24, 20, 0.08), 0 2px 10px rgba(0, 0, 0, 0.03);
        border: 1px solid rgba(197, 139, 56, 0.22);
      }

      .hero-slider-track {
        display: flex;
        width: 100%;
        height: 100%;
        transition: transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
        will-change: transform;
      }

      .hero-slide-item {
        position: relative;
        flex: 0 0 100%;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      .hero-media {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center right;
        display: block;
        transform: translateZ(0);
        backface-visibility: hidden;
      }

      /* Soft white/warm scrim on the left for crystal clear typography */
      .hero-left-scrim {
        position: absolute;
        inset: 0;
        z-index: 2;
        pointer-events: none;
        background: linear-gradient(
          90deg,
          rgba(255, 252, 248, 0.92) 0%,
          rgba(255, 252, 248, 0.82) 35%,
          rgba(255, 252, 248, 0.45) 55%,
          rgba(255, 252, 248, 0.08) 72%,
          transparent 100%
        );
      }

      /* Left-aligned text container */
      .hero-left-content {
        position: absolute;
        inset: 0;
        z-index: 3;
        display: flex;
        align-items: center;
        padding: 0 5vw 0 6vw;
        pointer-events: none;
      }

      .hero-left-inner {
        max-width: 600px;
        pointer-events: auto;
        animation: heroFadeSlideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
      }

      @keyframes heroFadeSlideIn {
        from {
          opacity: 0;
          transform: translateX(-24px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .hero-left-eyebrow {
        display: inline-block;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: #8c3b30;
        margin-bottom: 12px;
      }

      .hero-left-title {
        font-family: var(--font-display, 'Marcellus', serif);
        font-size: clamp(30px, 3.4vw, 48px);
        line-height: 1.18;
        color: #1a0b08;
        font-weight: 500;
        margin: 0 0 16px;
        letter-spacing: -0.01em;
        text-shadow: 0 1px 2px rgba(255, 255, 255, 0.95), 0 0 18px rgba(255, 255, 255, 0.95);
      }

      .hero-title-main {
        display: block;
        white-space: nowrap;
      }

      .hero-heading-accent {
        display: block;
        margin-top: 4px;
        font-family: var(--font-display, 'Marcellus', serif);
        font-size: 1em;
        white-space: nowrap;
      }

      .hero-heading-accent em {
        font-family: var(--font-script, 'Cormorant Garamond', Georgia, serif);
        font-style: italic;
        font-weight: 600;
        font-size: 1.08em;
        color: #421008;
        text-shadow: 0 1px 2px rgba(255, 255, 255, 0.95), 0 0 18px rgba(255, 255, 255, 0.95);
      }

      .hero-left-sub {
        font-family: var(--font-body, 'Poppins', sans-serif);
        font-size: clamp(13.5px, 1.08vw, 15px);
        line-height: 1.65;
        color: #24140e;
        max-width: 440px;
        margin: 0 0 26px;
        font-weight: 500;
        text-shadow: 0 1px 2px rgba(255, 255, 255, 0.9), 0 0 14px rgba(255, 255, 255, 0.9);
      }

      .hero-left-actions {
        display: flex;
        align-items: center;
        gap: 14px;
      }

      /* Pill CTA button matching screenshot */
      .hero-slide-cta-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 13px 30px;
        border-radius: 999px;
        background: #581e15;
        color: #ffffff;
        font-family: var(--font-body, 'Poppins', sans-serif);
        font-size: 13.5px;
        font-weight: 500;
        letter-spacing: 0.02em;
        box-shadow: 0 6px 20px rgba(88, 30, 21, 0.28);
        transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
        text-decoration: none;
      }

      .hero-slide-cta-btn:hover {
        background: #702024;
        transform: translateY(-2px);
        box-shadow: 0 10px 26px rgba(112, 32, 36, 0.35);
        color: #ffffff;
      }

      /* Subtle refined controls - visible on hover */
      .hero-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 5;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.85);
        border: 1px solid rgba(220, 205, 190, 0.8);
        color: #2b1814;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
        box-shadow: 0 4px 14px rgba(43, 24, 20, 0.1);
      }

      .hero-slider:hover .hero-arrow {
        opacity: 0.9;
        pointer-events: auto;
      }

      .hero-arrow:hover {
        background: #581e15;
        border-color: #581e15;
        color: #ffffff;
        opacity: 1 !important;
        transform: translateY(-50%) scale(1.06);
      }

      .hero-arrow-prev { left: 20px; }
      .hero-arrow-next { right: 20px; }

      .hero-slider-dots {
        position: absolute;
        bottom: 18px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 8px;
        z-index: 5;
        opacity: 0.55;
        transition: opacity 0.3s ease;
      }

      .hero-slider:hover .hero-slider-dots {
        opacity: 1;
      }

      .hero-dot {
        width: 7px;
        height: 7px;
        border-radius: 999px;
        background: rgba(43, 24, 20, 0.22);
        border: none;
        padding: 0;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .hero-dot.active {
        background: #581e15;
        width: 22px;
      }

      @media (max-width: 768px) {
        .hero-slider {
          height: clamp(520px, 80vh, 660px);
          border-radius: 32px;
        }
        .hero-media {
          object-position: center 12%;
        }
        /* Soft white/warm scrim on mobile for crystal clear text readability */
        .hero-left-scrim {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(
            to top,
            rgba(255, 252, 248, 0.96) 0%,
            rgba(255, 252, 248, 0.88) 42%,
            rgba(255, 252, 248, 0.45) 66%,
            rgba(255, 252, 248, 0.05) 82%,
            transparent 100%
          );
        }
        .hero-left-content {
          padding: 24px 20px 42px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        .hero-left-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 480px;
          margin: 0 auto;
        }
        .hero-title-main,
        .hero-heading-accent {
          white-space: normal;
          text-align: center;
        }
        .hero-left-title {
          font-size: clamp(26px, 6.8vw, 34px);
          line-height: 1.18;
          text-align: center;
          margin-bottom: 12px;
        }
        .hero-heading-accent {
          margin-top: 3px;
        }
        .hero-left-sub {
          font-size: 13.5px;
          line-height: 1.55;
          text-align: center;
          margin: 0 auto 22px;
          max-width: 390px;
        }
        .hero-left-actions {
          display: flex;
          justify-content: center;
          width: 100%;
        }
        .hero-slide-cta-btn {
          margin: 0 auto;
        }
        .hero-arrow {
          display: none;
        }
        .hero-slider-dots {
          bottom: 12px;
        }
      }
    `}</style>
  );
}
