import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    // Only scroll to top on forward PUSH navigation; never override on POP (back)
    if (navType === 'PUSH') {
      window.scrollTo(0, 0);
    }
  }, [pathname, navType]);

  return null;
}

