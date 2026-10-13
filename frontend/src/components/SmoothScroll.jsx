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
  const isRouteChangingRef = useRef(false);
  const restoringTargetYRef = useRef(0);
  const activeLocationRef = useRef(location);

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
      duration: 1.7,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      syncTouch: false,
      touchMultiplier: 1,
    });
    lenisRef.current = lenis;

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

  // Track the user's scroll position while browsing the current route.
  // IMPORTANT: Do NOT record scroll inside a route-cleanup effect because
  // React runs the next route's useLayoutEffect (which resets scrollY to 0)
  // BEFORE running the previous route's useEffect cleanup!
  useEffect(() => {
    activeLocationRef.current = location;
    const unlockTimer = setTimeout(() => {
      isRouteChangingRef.current = false;
    }, 120);

    const recordCurrentPosition = () => {
      if (isRestoringRef.current || isRouteChangingRef.current) return;
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      saveScrollPosition(activeLocationRef.current, y);
    };

    // Capture exact scroll position on pointerdown/touchstart BEFORE any link click navigates
    const handlePreClick = () => {
      recordCurrentPosition();
    };

    window.addEventListener('scroll', recordCurrentPosition, { passive: true });
    window.addEventListener('pointerdown', handlePreClick, { capture: true, passive: true });
    window.addEventListener('touchstart', handlePreClick, { capture: true, passive: true });

    return () => {
      clearTimeout(unlockTimer);
      window.removeEventListener('scroll', recordCurrentPosition);
      window.removeEventListener('pointerdown', handlePreClick, { capture: true });
      window.removeEventListener('touchstart', handlePreClick, { capture: true });
    };
  }, [location.pathname, location.search, location.key]);

  // Handle route change synchronously before paint (useLayoutEffect):
  // - On POP or explicit goBack (__rtRestoreScroll): restore saved scroll position
  // - On PUSH (forward navigation): reset scroll to top (0)
  useLayoutEffect(() => {
    isRouteChangingRef.current = true;

    if (location.hash) {
      const targetEl = document.querySelector(location.hash);
      if (targetEl) {
        restoringTargetYRef.current = 0;
        if (lenisRef.current) {
          lenisRef.current.scrollTo(targetEl, { immediate: true });
        } else {
          targetEl.scrollIntoView();
        }
        return;
      }
    }

    const isBackNav =
      navType === 'POP' ||
      (typeof window !== 'undefined' && Boolean(window.__rtRestoreScroll));

    if (typeof window !== 'undefined' && window.__rtRestoreScroll) {
      window.__rtRestoreScroll = false;
    }

    if (isBackNav) {
      const savedY = getSavedScrollPosition(location);
      restoringTargetYRef.current = savedY;
      if (savedY > 0) {
        isRestoringRef.current = true;
        document.documentElement.scrollTop = savedY;
        document.body.scrollTop = savedY;
        window.scrollTo(0, savedY);
        if (lenisRef.current) {
          lenisRef.current.scrollTo(savedY, { immediate: true });
        }
      } else {
        isRestoringRef.current = false;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.scrollTo(0, 0);
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        }
      }
    } else if (navType === 'PUSH') {
      restoringTargetYRef.current = 0;
      isRestoringRef.current = false;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    }
  }, [location.pathname, location.search, location.hash, navType]);

  // Secondary verification loop on back navigation:
  // Re-applies savedY as async sections / images settle, yielding immediately on user input.
  useEffect(() => {
    const savedY = restoringTargetYRef.current;
    if (!savedY || savedY <= 0 || location.hash) {
      isRestoringRef.current = false;
      return undefined;
    }

    let userInteracted = false;
    const cancelRestoration = () => {
      userInteracted = true;
      isRestoringRef.current = false;
      restoringTargetYRef.current = 0;
    };

    window.addEventListener('wheel', cancelRestoration, { passive: true, once: true });
    window.addEventListener('touchmove', cancelRestoration, { passive: true, once: true });
    window.addEventListener('keydown', cancelRestoration, { passive: true, once: true });

    const applyVerifiedScroll = () => {
      if (userInteracted) return;
      const currentY = window.scrollY || document.documentElement.scrollTop || 0;
      if (Math.abs(currentY - savedY) > 6) {
        document.documentElement.scrollTop = savedY;
        document.body.scrollTop = savedY;
        window.scrollTo(0, savedY);
        if (lenisRef.current) {
          lenisRef.current.scrollTo(savedY, { immediate: true });
        }
      }
    };

    const timers = [16, 50, 120, 260, 500, 900].map((ms) =>
      setTimeout(applyVerifiedScroll, ms),
    );

    const endTimer = setTimeout(() => {
      isRestoringRef.current = false;
      restoringTargetYRef.current = 0;
    }, 950);

    return () => {
      userInteracted = true;
      isRestoringRef.current = false;
      timers.forEach(clearTimeout);
      clearTimeout(endTimer);
      window.removeEventListener('wheel', cancelRestoration);
      window.removeEventListener('touchmove', cancelRestoration);
      window.removeEventListener('keydown', cancelRestoration);
    };
  }, [location.pathname, location.search, location.hash, navType]);

  return null;
}
