import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import TraditionalSareeTransition from './TraditionalSareeTransition';

const defaultSlides = [
  {
    id: 'hero-video-1',
    type: 'video',
    src: '/videos/hero1.mp4',
    alt: 'Ravichandra Textiles Traditional Saree Showcase - 4K Video',
    eyebrow: 'PURE HANDLOOM SILKS',
    heading: 'Crafted with Devotion',
    subheading: 'Experience authentic heirloom weaves with pure zari threads.',
    ctaLabel: 'Explore Collection',
    ctaLink: '/products',
  },
  {
    id: 'hero-image-2',
    type: 'image',
    src: '/images/styles/kanchivaram.jpg',
    alt: 'Ravichandra Textiles Kanchivaram Silk Saree',
    eyebrow: 'TEMPLE TRADITIONS',
    heading: 'Kanchivaram Elegance',
    subheading: 'Heirloom drape with temple-woven gold zari motifs.',
    ctaLabel: 'Shop Kanchivaram',
    ctaLink: '/products?category=kanjivaram',
  },
  {
    id: 'hero-image-3',
    type: 'image',
    src: '/images/styles/banarasi.jpg',
    alt: 'Ravichandra Textiles Banarasi Saree Showcase',
    eyebrow: 'ROYAL WEAVES',
    heading: 'Banarasi Splendor',
    subheading: 'Brocade zari woven by master craftsmen from the sacred ghats.',
    ctaLabel: 'Shop Banarasi',
    ctaLink: '/products?category=banarasi',
  },
];

const BLANK_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
const loadingSlides = [{ id: 'loading', type: 'image', src: BLANK_IMAGE, alt: '' }];

export default function HeroSlider({ slides: cmsSlides, mobileSlides: cmsMobileSlides }) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 640 : false,
  );

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth <= 640);
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
          src: s.url || s.src,
          alt: s.alt || s.heading || 'Ravichandra Textiles Sarees',
          eyebrow: s.eyebrow,
          heading: s.heading,
          subheading: s.subheading,
          ctaLabel: s.ctaLabel,
          ctaLink: s.ctaLink,
        }))
      : defaultSlides);

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

            {/* Left-side dark scrim for crystal clear contrast on text */}
            <div className="hero-left-scrim" aria-hidden="true" />
            <div className="hero-bottom-scrim" aria-hidden="true" />

            {/* Left-side text overlay */}
            {(s.heading || s.subheading || s.eyebrow) && (
              <div className="hero-left-content">
                <div className="hero-left-inner">
                  {s.eyebrow && (
                    <span className="hero-left-eyebrow">{s.eyebrow}</span>
                  )}
                  {s.heading && (
                    <h2 className="hero-left-title">{s.heading}</h2>
                  )}
                  {s.subheading && (
                    <p className="hero-left-sub">{s.subheading}</p>
                  )}
                  {s.ctaLabel && (
                    <div className="hero-left-actions">
                      <Link to={s.ctaLink || '/products'} className="hero-slide-cta-btn">
                        {s.ctaLabel}
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
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
        height: 100vh;
        height: 100svh;
        min-height: 560px;
        overflow: hidden;
        background: #0f0406;
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
        object-position: center;
        display: block;
        transform: translateZ(0);
        backface-visibility: hidden;
      }

      /* Subtle gradient scrim on the left for text legibility */
      .hero-left-scrim {
        position: absolute;
        inset: 0;
        z-index: 2;
        pointer-events: none;
        background: linear-gradient(
          90deg,
          rgba(15, 4, 6, 0.78) 0%,
          rgba(15, 4, 6, 0.55) 35%,
          rgba(15, 4, 6, 0.15) 65%,
          transparent 100%
        );
      }

      .hero-bottom-scrim {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 140px;
        z-index: 2;
        pointer-events: none;
        background: linear-gradient(to top, rgba(15, 4, 6, 0.6) 0%, transparent 100%);
      }

      /* Left-aligned small text container */
      .hero-left-content {
        position: absolute;
        inset: 0;
        z-index: 3;
        display: flex;
        align-items: center;
        padding: 0 6vw;
        pointer-events: none;
      }

      .hero-left-inner {
        max-width: 520px;
        pointer-events: auto;
        color: #fff;
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
        font-size: 11.5px;
        font-weight: 600;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--gold-400, #dfb15b);
        margin-bottom: 12px;
        text-shadow: 0 2px 4px rgba(0,0,0,0.5);
      }

      .hero-left-title {
        font-family: var(--font-display, 'Playfair Display', Georgia, serif);
        font-size: clamp(30px, 4.4vw, 54px);
        line-height: 1.12;
        color: #fffaf4;
        font-weight: 400;
        margin: 0 0 16px;
        text-shadow: 0 3px 12px rgba(0,0,0,0.6);
        letter-spacing: -0.01em;
      }

      .hero-left-sub {
        font-size: clamp(13px, 1.2vw, 15.5px);
        line-height: 1.65;
        color: #f0e6de;
        max-width: 440px;
        margin: 0 0 26px;
        text-shadow: 0 2px 8px rgba(0,0,0,0.6);
        font-weight: 300;
      }

      .hero-left-actions {
        display: flex;
        align-items: center;
        gap: 14px;
      }

      .hero-slide-cta-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 26px;
        border-radius: var(--radius-sm, 6px);
        background: linear-gradient(135deg, #c58b38 0%, #a26d24 100%);
        color: #fff;
        font-size: 13.5px;
        font-weight: 500;
        letter-spacing: 0.04em;
        box-shadow: 0 6px 20px rgba(0,0,0,0.35);
        transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        text-decoration: none;
      }

      .hero-slide-cta-btn:hover {
        transform: translateY(-2px);
        background: linear-gradient(135deg, #d89c47 0%, #b27a2c 100%);
        box-shadow: 0 10px 24px rgba(197, 139, 56, 0.45);
        color: #fff;
      }

      /* Controls */
      .hero-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 5;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(15, 4, 6, 0.45);
        border: 1px solid rgba(255, 255, 255, 0.25);
        color: #fff;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        cursor: pointer;
        transition: background 0.25s ease, transform 0.25s ease, border-color 0.25s ease;
      }

      .hero-arrow:hover {
        background: rgba(197, 139, 56, 0.85);
        border-color: rgba(255, 255, 255, 0.6);
        transform: translateY(-50%) scale(1.08);
      }

      .hero-arrow-prev { left: 24px; }
      .hero-arrow-next { right: 24px; }

      .hero-slider-dots {
        position: absolute;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 5;
      }

      .hero-dot {
        width: 8px;
        height: 8px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.4);
        border: none;
        padding: 0;
        cursor: pointer;
        transition: background 0.3s ease, width 0.3s ease;
      }

      .hero-dot.active {
        background: #dfb15b;
        width: 24px;
        border-radius: 999px;
      }

      @media (max-width: 640px) {
        .hero-left-content { padding: 0 20px; }
        .hero-left-title { font-size: 28px; margin-bottom: 12px; }
        .hero-left-sub { font-size: 13px; line-height: 1.5; margin-bottom: 20px; }
        .hero-arrow { width: 36px; height: 36px; }
        .hero-arrow-prev { left: 10px; }
        .hero-arrow-next { right: 10px; }
        .hero-slider-dots { bottom: 14px; }
      }
    `}</style>
  );
}
