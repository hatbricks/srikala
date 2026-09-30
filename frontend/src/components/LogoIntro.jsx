import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import BRAND from '../config/brand';

export default function LogoIntro() {
  const overlayRef = useRef(null);
  const logoBoxRef = useRef(null);
  const logoImgRef = useRef(null);
  const shimmerRef = useRef(null);
  const skipBtnRef = useRef(null);
  const tlRef = useRef(null);

  const [done, setDone] = useState(() => {
    if (typeof window === 'undefined') return true;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('intro') || urlParams.has('replay')) return false;
    try {
      sessionStorage.removeItem('miladysIntroPlayed');
      sessionStorage.removeItem('srikalaIntroPlayed');
      return sessionStorage.getItem('ravichandraIntroPlayed') === '1';
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
      sessionStorage.setItem('ravichandraIntroPlayed', '1');
    } catch {
      /* private-browsing storage may throw */
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
    const skipBtn = skipBtnRef.current;

    if (!overlay || !logoBox) {
      setDone(true);
      document.body.style.overflow = prevOverflow;
      return undefined;
    }

    // Initial states: clean pure white canvas, logo centered
    gsap.set(overlay, { opacity: 1 });
    gsap.set(logoBox, { opacity: 0, scale: 0.92, filter: 'blur(4px)' });
    if (shimmer) gsap.set(shimmer, { xPercent: -130, opacity: 0 });
    if (skipBtn) gsap.set(skipBtn, { opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = prevOverflow;
        handleFinish();
      },
    });
    tlRef.current = tl;

    // Phase 1: Clean emergence in the center of white canvas
    tl.to(logoBox, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.85,
      ease: 'power2.out',
    }, 0.1);

    // Skip button appears
    tl.to(skipBtn, {
      opacity: 0.65,
      duration: 0.5,
      ease: 'power1.out',
    }, 0.35);

    // Phase 2: Delicate golden zari shimmer glides over logo
    tl.to(shimmer, {
      opacity: 1,
      duration: 0.15,
      ease: 'power1.in',
    }, 0.6);

    tl.to(shimmer, {
      xPercent: 140,
      duration: 0.8,
      ease: 'power2.inOut',
    }, 0.65);

    tl.to(shimmer, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.out',
    }, 1.25);

    // Phase 3: Savor the logo mark
    tl.to({}, { duration: 0.35 });

    // Phase 4: Seamless fade out of the white intro overlay
    tl.to(logoBox, {
      scale: 1.03,
      opacity: 0.85,
      duration: 0.55,
      ease: 'power2.inOut',
    }, 'reveal');

    tl.to(overlay, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
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
      aria-label={`Welcome to ${BRAND.name}`}
      aria-live="polite"
    >
      <div className="logo-intro-stage">
        <div className="logo-intro-box" ref={logoBoxRef}>
          <div className="logo-img-wrapper">
            <img
              ref={logoImgRef}
              src={BRAND.assets.logoVertical || BRAND.assets.logoIntro || '/images/logo-vertical.png'}
              alt={BRAND.name}
              className="logo-intro-img"
              width="420"
              height="220"
              loading="eager"
              decoding="sync"
            />
            <div className="logo-shimmer" ref={shimmerRef} aria-hidden="true" />
          </div>
        </div>
      </div>

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
          background: #0f0705;
          pointer-events: auto;
          overflow: hidden;
          user-select: none;
        }

        .logo-intro-stage {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .logo-intro-box {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          will-change: transform, opacity, filter;
          padding: 24px;
        }

        .logo-img-wrapper {
          position: relative;
          display: inline-block;
          overflow: hidden;
          border-radius: 8px;
        }

        .logo-intro-img {
          width: min(72vw, 360px);
          height: auto;
          object-fit: contain;
          display: block;
        }

        @media (max-width: 600px) {
          .logo-intro-img {
            width: min(80vw, 280px);
          }
        }

        .logo-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 20%,
            rgba(255, 255, 255, 0.4) 40%,
            rgba(255, 245, 215, 0.8) 50%,
            rgba(255, 255, 255, 0.4) 60%,
            transparent 80%
          );
          mix-blend-mode: color-dodge;
          pointer-events: none;
          will-change: transform, opacity;
        }

        .logo-intro-skip {
          position: absolute;
          top: 24px;
          right: 24px;
          z-index: 10;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          border-radius: 999px;
          background: rgba(26, 12, 9, 0.75);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(197, 139, 56, 0.4);
          color: #dfb15b;
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }
        .logo-intro-skip:hover {
          background: rgba(44, 20, 15, 0.9);
          border-color: #dfb15b;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
        }
      `}</style>
    </aside>
  );
}
