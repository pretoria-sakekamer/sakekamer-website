import { useEffect, useState } from 'react';

/** True when the visitor prefers reduced motion (stops the rally-cry auto-flip and placeholder cycling). */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const f = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', f);
    return () => mq.removeEventListener('change', f);
  }, []);
  return reduced;
}
