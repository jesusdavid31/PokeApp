import { useEffect } from 'react';
import type { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop({ children }: { children: ReactElement | null }) {
  const { pathname } = useLocation();

  // Scroll hasta arriba al cambiar de ruta
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return children || null;
}
