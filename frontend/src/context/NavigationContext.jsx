import { createContext, useContext, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';

const NavigationContext = createContext(null);
const STACK_STORAGE_KEY = 'rt_navigation_stack_v1';

function getInitialStack() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = sessionStorage.getItem(STACK_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [];
}

export function NavigationProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const navType = useNavigationType(); // 'PUSH', 'POP', 'REPLACE'
  const stackRef = useRef(getInitialStack());

  useEffect(() => {
    const current = location.pathname + location.search;
    const stack = stackRef.current;

    if (navType === 'POP') {
      // Browser back/forward button or navigate(-1)
      if (stack.length > 1 && stack[stack.length - 2] === current) {
        stack.pop();
      } else {
        const existingIdx = stack.lastIndexOf(current);
        if (existingIdx !== -1) {
          stackRef.current = stack.slice(0, existingIdx + 1);
        } else {
          stack.push(current);
        }
      }
    } else if (navType === 'REPLACE') {
      if (stack.length > 0) {
        stack[stack.length - 1] = current;
      } else {
        stack.push(current);
      }
    } else {
      // 'PUSH'
      if (stack[stack.length - 1] !== current) {
        stack.push(current);
      }
    }

    try {
      sessionStorage.setItem(STACK_STORAGE_KEY, JSON.stringify(stackRef.current.slice(-25)));
    } catch {}
  }, [location.pathname, location.search, navType]);

  const goBack = (fallback) => {
    const stack = stackRef.current;
    if (stack.length > 1) {
      navigate(-1);
    } else if (fallback) {
      navigate(fallback);
    } else if (location.pathname.startsWith('/products/')) {
      navigate('/products');
    } else {
      navigate('/');
    }
  };

  return (
    <NavigationContext.Provider value={{ goBack, stack: stackRef.current }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationStack() {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    return {
      goBack: (fallback = '/') => {
        if (typeof window !== 'undefined' && window.history.length > 1) {
          window.history.back();
        } else if (typeof window !== 'undefined') {
          window.location.href = fallback;
        }
      },
    };
  }
  return ctx;
}
