import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import Lenis from 'lenis';

// In-memory scroll position cache keyed by pathname + search and by router key
const scrollPositions = new Map();

function getScrollKey(location) {
  return location.pathname + location.search;
}

function saveScrollPosition(location, y) {
  const pathKey = getScrollKey(location);
  scrollPositions.set(pathKey, y);
  if (location.key) {
    scrollPositions.set(location.key, y);
  }
  try {
    sessionStorage.setItem('rt_scroll_' + pathKey, String(Math.round(y)));
  } catch {}
}

function getSavedScrollPosition(location) {
  if (location.key && scrollPositions.has(location.key)) {
    return scrollPositions.get(location.key);
  }
  const pathKey = getScrollKey(location);
  if (scrollPositions.has(pathKey)) {
    return scrollPositions.get(pathKey);
  }
  try {
    const raw = sessionStorage.getItem('rt_scroll_' + pathKey);
    if (raw !== null) {
      const parsed = Number(raw);
      if (!Number.isNaN(parsed)) return parsed;
    }
  } catch {}
  return 0;
}

// Adds a gentle, eased "glide" to scrolling on desktop (mouse wheel / trackpad).
// Touch scrolling on phones/tablets is left native (Lenis syncTouch: false).
// Intelligently manages scroll restoration:
// - PUSH navigation (clicking to a product or new page): resets to top (0).
// - POP navigation (back button / mobile back / gesture): restores the exact section
//   where the user was on the previous page without jumping back to the hero.
export default function SmoothScroll() {
  const lenisRef = useRef(null);
  const location = useLocation();
  const navType = useNavigationType();
  const isRestoringRef = useRef(false);

  // The browser has its own automatic scroll-restoration behavior for history
  // navigations which can fight with client routing. Setting this to 'manual'
  // hands full, predictable scroll control to this component.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Initialize Lenis for desktop glide (mouse wheel / trackpad).
  // Touch scrolling on mobile is left native (syncTouch: false).
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.7, // slower, longer glide than Lenis's ~1.1s default
      easing: (t) => 1 - Math.pow(1 - t, 4), // ease-out quart: gentler deceleration
      smoothWheel: true,
      wheelMultiplier: 0.85,
      syncTouch: false, // native touch scroll on mobile — no interference there
      touchMultiplier: 1,
    });
    lenisRef.current = lenis;

    // Sync Lenis's internal scroll target with current window scroll immediately
    lenis.scrollTo(window.scrollY, { immediate: true });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Track the user's scroll position as they browse
  useEffect(() => {
    let ticking = false;

    const recordCurrentPosition = () => {
      // Don't overwrite saved position during active restoration passes
      if (isRestoringRef.current) return;
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      saveScrollPosition(location, y);
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          recordCurrentPosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      // Capture the exact position right before leaving this route
      recordCurrentPosition();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname, location.search, location.key]);

  // Handle route change synchronously before paint (useLayoutEffect):
  // - On POP (back navigation): restore the saved scroll position so the user
  //   returns to the exact section (e.g. Recommended / New Arrivals on Home)
  // - On PUSH (forward navigation): reset scroll to top (0)
  // - On hash link: scroll smoothly to target element
  useLayoutEffect(() => {
    if (location.hash) {
      const targetEl = document.querySelector(location.hash);
      if (targetEl) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(targetEl, { immediate: true });
        } else {
          targetEl.scrollIntoView();
        }
        return;
      }
    }

    if (navType === 'POP') {
      const savedY = getSavedScrollPosition(location);
      if (savedY > 0) {
        isRestoringRef.current = true;
        document.documentElement.scrollTop = savedY;
        document.body.scrollTop = savedY;
        window.scrollTo(0, savedY);
        if (lenisRef.current) {
          lenisRef.current.scrollTo(savedY, { immediate: true });
        }
      } else {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.scrollTo(0, 0);
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        }
      }
    } else if (navType === 'PUSH') {
      // Forward navigation to a new page: start cleanly at top
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
      saveScrollPosition(location, 0);
    }
  }, [location.pathname, location.search, location.hash, navType]);

  // Secondary verification loop on POP navigation:
  // In single-page apps, dynamic content (catalogs, async sections, images)
  // may finish rendering a few milliseconds after the initial paint.
  // If the document height was temporarily shorter than savedY, the browser
  // clamps scrollY. This verification loop re-applies savedY as the DOM
  // settles, but immediately yields if the user touches the screen or scrolls.
  useEffect(() => {
    if (navType !== 'POP' || location.hash) {
      isRestoringRef.current = false;
      return undefined;
    }

    const savedY = getSavedScrollPosition(location);
    if (!savedY || savedY <= 0) {
      isRestoringRef.current = false;
      return undefined;
    }

    let userInteracted = false;
    const cancelRestoration = () => {
      userInteracted = true;
      isRestoringRef.current = false;
    };

    window.addEventListener('wheel', cancelRestoration, { passive: true, once: true });
    window.addEventListener('touchstart', cancelRestoration, { passive: true, once: true });
    window.addEventListener('pointerdown', cancelRestoration, { passive: true, once: true });
    window.addEventListener('keydown', cancelRestoration, { passive: true, once: true });

    const applyVerifiedScroll = () => {
      if (userInteracted) return;
      const currentY = window.scrollY || document.documentElement.scrollTop || 0;
      if (Math.abs(currentY - savedY) > 8) {
        document.documentElement.scrollTop = savedY;
        document.body.scrollTop = savedY;
        window.scrollTo(0, savedY);
        if (lenisRef.current) {
          lenisRef.current.scrollTo(savedY, { immediate: true });
        }
      }
    };

    const timers = [20, 60, 150, 300, 600, 1000].map((ms) =>
      setTimeout(applyVerifiedScroll, ms),
    );

    const endTimer = setTimeout(() => {
      isRestoringRef.current = false;
    }, 1100);

    return () => {
      userInteracted = true;
      isRestoringRef.current = false;
      timers.forEach(clearTimeout);
      clearTimeout(endTimer);
      window.removeEventListener('wheel', cancelRestoration);
      window.removeEventListener('touchstart', cancelRestoration);
      window.removeEventListener('pointerdown', cancelRestoration);
      window.removeEventListener('keydown', cancelRestoration);
    };
  }, [location.pathname, location.search, location.hash, navType]);

  return null;
}
