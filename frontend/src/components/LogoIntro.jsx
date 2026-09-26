import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import BRAND from '../config/brand';

export default function LogoIntro() {
  const overlayRef = useRef(null);
  const logoBoxRef = useRef(null);
  const logoImgRef = useRef(null);
  const shimmerRef = useRef(null);
  const auraRef = useRef(null);
  const lineLeftRef = useRef(null);
  const lineRightRef = useRef(null);
  const centerPipRef = useRef(null);
  const taglineRef = useRef(null);
  const skipBtnRef = useRef(null);
  const tlRef = useRef(null);

  const [done, setDone] = useState(() => {
    if (typeof window === 'undefined') return true;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('intro') || urlParams.has('replay')) return false;
    try {
      // Remove obsolete template key so it doesn't accidentally block Sri Kala intro
      sessionStorage.removeItem('miladysIntroPlayed');
      return sessionStorage.getItem('srikalaIntroPlayed') === '1';
    } catch {
      return false;
    }
  });

  const handleFinish = useCallback(() => {
    if (tlRef.current) {
      tlRef.current.kill();
    }
    document.body.style.overflow = '';
    try {
      sessionStorage.setItem('srikalaIntroPlayed', '1');
    } catch {
      /* private-browsing storage may throw — safe to ignore */
    }
    setDone(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || done) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Respect user's reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        document.body.style.overflow = prevOverflow;
        handleFinish();
      }, 900);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = prevOverflow;
      };
    }

    const overlay = overlayRef.current;
    const logoBox = logoBoxRef.current;
    const shimmer = shimmerRef.current;
    const aura = auraRef.current;
    const lineLeft = lineLeftRef.current;
    const lineRight = lineRightRef.current;
    const centerPip = centerPipRef.current;
    const tagline = taglineRef.current;
    const skipBtn = skipBtnRef.current;

    if (!overlay || !logoBox) {
      setDone(true);
      document.body.style.overflow = prevOverflow;
      return undefined;
    }

    // Initial states
    gsap.set(overlay, { opacity: 1 });
    gsap.set(logoBox, { opacity: 0, scale: 0.9, y: 16, filter: 'blur(8px)' });
    if (aura) gsap.set(aura, { opacity: 0, scale: 0.65 });
    if (lineLeft) gsap.set(lineLeft, { scaleX: 0, transformOrigin: 'right center' });
    if (lineRight) gsap.set(lineRight, { scaleX: 0, transformOrigin: 'left center' });
    if (centerPip) gsap.set(centerPip, { scale: 0, opacity: 0, rotation: -45 });
    if (tagline) gsap.set(tagline, { opacity: 0, y: 8, letterSpacing: '0.12em' });
    if (shimmer) gsap.set(shimmer, { xPercent: -130, opacity: 0 });
    if (skipBtn) gsap.set(skipBtn, { opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = prevOverflow;
        handleFinish();
      },
    });
    tlRef.current = tl;

    // Phase 1: Royal Emergence & Ambient Bloom (0.0s – 0.85s)
    tl.to(aura, {
      opacity: 1,
      scale: 1.15,
      duration: 1.1,
      ease: 'power2.out',
    }, 0.05);

    tl.to(logoBox, {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.95,
      ease: 'power3.out',
    }, 0.1);

    // Fade in subtle skip button early so users can bypass anytime
    tl.to(skipBtn, {
      opacity: 0.7,
      duration: 0.6,
      ease: 'power1.out',
    }, 0.4);

    // Phase 2: Radiant Gold Zari Shimmer & Ornament Unfurl (0.75s – 1.6s)
    tl.to(shimmer, {
      opacity: 1,
      duration: 0.15,
      ease: 'power1.in',
    }, 0.75);

    tl.to(shimmer, {
      xPercent: 140,
      duration: 0.85,
      ease: 'power2.inOut',
    }, 0.8);

    tl.to(shimmer, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.out',
    }, 1.45);

    // Gold filigree line and center diamond pip reveal
    tl.to(centerPip, {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 0.4,
      ease: 'back.out(2)',
    }, 0.85);

    tl.to([lineLeft, lineRight], {
      scaleX: 1,
      duration: 0.55,
      ease: 'power2.out',
    }, 0.95);

    // Tagline emerges with refined letter-spacing expansion
    tl.to(tagline, {
      opacity: 1,
      y: 0,
      letterSpacing: '0.22em',
      duration: 0.75,
      ease: 'power2.out',
    }, 1.05);

    // Soft secondary breathing pulse
    tl.to(aura, {
      scale: 1.25,
      opacity: 0.85,
      duration: 0.7,
      ease: 'sine.inOut',
    }, 1.3);

    // Phase 3: Hold the prestige for a moment (1.6s – 2.0s)
    tl.to({}, { duration: 0.4 });

    // Phase 4: Majestic Handoff & Page Unveil (2.0s – 2.6s)
    // Logo gently expands outward into light
    tl.to(logoBox, {
      scale: 1.04,
      opacity: 0.9,
      duration: 0.6,
      ease: 'power2.inOut',
    }, 'reveal');

    tl.to(aura, {
      scale: 1.4,
      opacity: 0,
      duration: 0.55,
      ease: 'power2.in',
    }, 'reveal');

    // Royal curtain dissolves smoothly, unveiling the storefront
    tl.to(overlay, {
      opacity: 0,
      duration: 0.65,
      ease: 'power3.inOut',
    }, 'reveal+=0.1');

    return () => {
      tl.kill();
      document.body.style.overflow = prevOverflow;
    };
  }, [handleFinish, done]);

  if (done) return null;

  return (
    <aside
      className="logo-intro"
      ref={overlayRef}
      aria-label="Welcome to Sri Kala Silk Emporium"
      aria-live="polite"
    >
      {/* Subtle royal heritage corner flourishes */}
      <div className="corner-ornament top-left" aria-hidden="true">
        <svg viewBox="0 0 60 60" fill="none">
          <path d="M4 56V16C4 9.37 9.37 4 16 4H56" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M12 48V20C12 15.58 15.58 12 20 12H48" stroke="currentColor" strokeWidth="0.8" opacity="0.6" strokeLinecap="round" />
          <circle cx="16" cy="16" r="2.5" fill="currentColor" opacity="0.8" />
        </svg>
      </div>
      <div className="corner-ornament top-right" aria-hidden="true">
        <svg viewBox="0 0 60 60" fill="none">
          <path d="M4 56V16C4 9.37 9.37 4 16 4H56" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M12 48V20C12 15.58 15.58 12 20 12H48" stroke="currentColor" strokeWidth="0.8" opacity="0.6" strokeLinecap="round" />
          <circle cx="16" cy="16" r="2.5" fill="currentColor" opacity="0.8" />
        </svg>
      </div>
      <div className="corner-ornament bottom-left" aria-hidden="true">
        <svg viewBox="0 0 60 60" fill="none">
          <path d="M4 56V16C4 9.37 9.37 4 16 4H56" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M12 48V20C12 15.58 15.58 12 20 12H48" stroke="currentColor" strokeWidth="0.8" opacity="0.6" strokeLinecap="round" />
          <circle cx="16" cy="16" r="2.5" fill="currentColor" opacity="0.8" />
        </svg>
      </div>
      <div className="corner-ornament bottom-right" aria-hidden="true">
        <svg viewBox="0 0 60 60" fill="none">
          <path d="M4 56V16C4 9.37 9.37 4 16 4H56" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M12 48V20C12 15.58 15.58 12 20 12H48" stroke="currentColor" strokeWidth="0.8" opacity="0.6" strokeLinecap="round" />
          <circle cx="16" cy="16" r="2.5" fill="currentColor" opacity="0.8" />
        </svg>
      </div>

      {/* Floating golden zari dust particles */}
      <div className="gold-dust-container" aria-hidden="true">
        <span className="dust-particle p1" />
        <span className="dust-particle p2" />
        <span className="dust-particle p3" />
        <span className="dust-particle p4" />
        <span className="dust-particle p5" />
        <span className="dust-particle p6" />
      </div>

      {/* Central Emblem Experience */}
      <div className="logo-intro-stage">
        {/* Ambient Radiant Golden Halo */}
        <div className="logo-intro-aura" ref={auraRef} aria-hidden="true" />

        {/* Master Emblem Lockup */}
        <div className="logo-intro-box" ref={logoBoxRef}>
          <div className="logo-img-wrapper">
            <img
              ref={logoImgRef}
              src={BRAND.assets.logoIntro || '/images/given-logo-transparent.png'}
              alt={BRAND.fullTitle || 'Sri Kala — Silk Emporium'}
              className="logo-intro-img"
              width="640"
              height="340"
              loading="eager"
              decoding="sync"
            />
            {/* Golden Zari Light Shimmer Sweep */}
            <div className="logo-shimmer" ref={shimmerRef} aria-hidden="true" />
          </div>

          {/* Symmetrical Gold Flourish Divider */}
          <div className="logo-divider" aria-hidden="true">
            <span className="divider-line left" ref={lineLeftRef} />
            <span className="divider-pip" ref={centerPipRef}>
              <svg viewBox="0 0 16 16" fill="currentColor" width="10" height="10">
                <path d="M8 0L10.5 5.5L16 8L10.5 10.5L8 16L5.5 10.5L0 8L5.5 5.5L8 0Z" />
              </svg>
            </span>
            <span className="divider-line right" ref={lineRightRef} />
          </div>

          {/* Heritage Tagline */}
          <p className="logo-intro-tagline" ref={taglineRef}>
            TIMELESS ELEGANCE, WOVEN IN TRADITION
          </p>
        </div>
      </div>

      {/* Elegant Skip Button */}
      <button
        ref={skipBtnRef}
        type="button"
        className="logo-intro-skip"
        onClick={handleFinish}
        aria-label="Skip introduction"
      >
        <span>Skip</span>
        <svg viewBox="0 0 16 16" fill="none" width="12" height="12" aria-hidden="true">
          <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <style>{`
        .logo-intro {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 50% 48%, #280a0e 0%, #150306 65%, #0a0103 100%);
          pointer-events: auto;
          overflow: hidden;
          user-select: none;
        }

        /* Subtle Corner Gold Ornaments */
        .corner-ornament {
          position: absolute;
          width: 50px;
          height: 50px;
          color: rgba(212, 160, 80, 0.35);
          pointer-events: none;
          z-index: 1;
        }
        .corner-ornament svg {
          width: 100%;
          height: 100%;
          display: block;
        }
        .corner-ornament.top-left { top: 20px; left: 20px; }
        .corner-ornament.top-right { top: 20px; right: 20px; transform: scaleX(-1); }
        .corner-ornament.bottom-left { bottom: 20px; left: 20px; transform: scaleY(-1); }
        .corner-ornament.bottom-right { bottom: 20px; right: 20px; transform: scale(-1); }

        @media (max-width: 600px) {
          .corner-ornament { width: 36px; height: 36px; }
          .corner-ornament.top-left { top: 12px; left: 12px; }
          .corner-ornament.top-right { top: 12px; right: 12px; }
          .corner-ornament.bottom-left { bottom: 12px; left: 12px; }
          .corner-ornament.bottom-right { bottom: 12px; right: 12px; }
        }

        /* Ambient Radiant Golden Halo */
        .logo-intro-stage {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .logo-intro-aura {
          position: absolute;
          width: 440px;
          height: 440px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(224, 168, 76, 0.22) 0%,
            rgba(197, 139, 56, 0.08) 45%,
            transparent 70%
          );
          filter: blur(24px);
          pointer-events: none;
          will-change: transform, opacity;
        }

        @media (max-width: 600px) {
          .logo-intro-aura {
            width: 320px;
            height: 320px;
          }
        }

        /* Central Box */
        .logo-intro-box {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          will-change: transform, opacity, filter;
          padding: 20px;
        }

        .logo-img-wrapper {
          position: relative;
          display: inline-block;
          overflow: hidden;
          border-radius: 6px;
        }

        .logo-intro-img {
          width: min(76vw, 360px);
          height: auto;
          aspect-ratio: 640 / 340;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 20px rgba(212, 160, 80, 0.18));
        }

        @media (max-width: 600px) {
          .logo-intro-img {
            width: min(84vw, 290px);
          }
        }

        /* Gold Zari Shimmer */
        .logo-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 15%,
            rgba(255, 240, 195, 0.12) 35%,
            rgba(255, 235, 175, 0.65) 50%,
            rgba(255, 240, 195, 0.12) 65%,
            transparent 85%
          );
          mix-blend-mode: screen;
          pointer-events: none;
          will-change: transform, opacity;
        }

        /* Divider */
        .logo-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          margin-top: 14px;
        }

        .divider-line {
          height: 1px;
          width: 68px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(224, 168, 76, 0.75),
            rgba(251, 223, 162, 0.95)
          );
          will-change: transform;
        }
        .divider-line.right {
          background: linear-gradient(
            to left,
            transparent,
            rgba(224, 168, 76, 0.75),
            rgba(251, 223, 162, 0.95)
          );
        }

        .divider-pip {
          color: #fbdfa2;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 0 6px rgba(251, 223, 162, 0.8));
          will-change: transform, opacity;
        }

        /* Tagline */
        .logo-intro-tagline {
          margin: 12px 0 0;
          font-family: var(--font-display, 'Marcellus', serif);
          font-size: 11.5px;
          font-weight: 500;
          color: #eed59b;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
          will-change: transform, opacity, letter-spacing;
        }

        @media (max-width: 600px) {
          .divider-line { width: 44px; }
          .logo-intro-tagline {
            font-size: 10px;
            letter-spacing: 0.16em !important;
          }
        }

        /* Golden Zari Floating Dust */
        .gold-dust-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }

        .dust-particle {
          position: absolute;
          border-radius: 50%;
          background: #fbdfa2;
          box-shadow: 0 0 6px rgba(251, 223, 162, 0.9);
          opacity: 0;
          animation: floatDust 4.5s ease-in-out infinite;
        }

        .dust-particle.p1 { width: 3px; height: 3px; left: 24%; top: 68%; animation-delay: 0.2s; }
        .dust-particle.p2 { width: 2px; height: 2px; left: 42%; top: 76%; animation-delay: 1.1s; }
        .dust-particle.p3 { width: 3.5px; height: 3.5px; left: 62%; top: 62%; animation-delay: 0.6s; }
        .dust-particle.p4 { width: 2px; height: 2px; left: 78%; top: 70%; animation-delay: 1.8s; }
        .dust-particle.p5 { width: 2.5px; height: 2.5px; left: 35%; top: 38%; animation-delay: 1.4s; }
        .dust-particle.p6 { width: 3px; height: 3px; left: 70%; top: 40%; animation-delay: 0.9s; }

        @keyframes floatDust {
          0% { transform: translateY(10px) scale(0.6); opacity: 0; }
          30% { opacity: 0.65; }
          70% { opacity: 0.45; }
          100% { transform: translateY(-38px) scale(1.1); opacity: 0; }
        }

        /* Skip Button */
        .logo-intro-skip {
          position: absolute;
          bottom: 24px;
          right: 28px;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(32, 8, 11, 0.5);
          border: 1px solid rgba(197, 139, 56, 0.3);
          border-radius: 999px;
          padding: 6px 14px;
          color: #fbdfa2;
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: all 0.25s ease;
        }

        .logo-intro-skip:hover {
          background: rgba(88, 30, 21, 0.8);
          border-color: rgba(251, 223, 162, 0.6);
          color: #ffffff;
          transform: translateY(-1px);
        }

        @media (max-width: 600px) {
          .logo-intro-skip {
            bottom: 16px;
            right: 16px;
            padding: 5px 12px;
            font-size: 10px;
          }
        }
      `}</style>
    </aside>
  );
}
