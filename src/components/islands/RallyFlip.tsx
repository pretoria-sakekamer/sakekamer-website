import { useEffect, useState } from 'react';
import { Icon } from '../ds/core/Icon';
import { useReducedMotion } from '../../lib/useReducedMotion';

const FLIP_MS = 3800;
const LINES = [
  'Wanneer ons besighede goed doen, gaan dit goed met die stad.',
  'En wanneer dit goed gaan met die stad, kan besighede groei.',
];

/**
 * The flipping rally cry: the two halves swap emphasis every 3.8 s or on click/Enter.
 * The ⇄ disc rotates 180° over .8 s and the line underneath changes with it.
 * Auto-flip stops under prefers-reduced-motion.
 */
export function RallyFlip() {
  const [flip, setFlip] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const t = window.setInterval(() => setFlip(f => !f), FLIP_MS);
    return () => window.clearInterval(t);
  }, [reduced]);

  return (
    <>
      <button type="button" className="rally" onClick={() => setFlip(f => !f)} aria-label="Besighede vir Pretoria. Pretoria vir besighede. Klik om te wissel.">
        <span className={'rally__side rally__side--l' + (!flip ? ' is-on' : '')} aria-hidden="true">
          <span className="rally__a">Besighede</span><span className="rally__b">vir Pretoria.</span>
        </span>
        <span className={'rally__disc' + (flip ? ' is-flipped' : '')} aria-hidden="true"><Icon name="arrow-left-right" size={26} /></span>
        <span className={'rally__side' + (flip ? ' is-on' : '')} aria-hidden="true">
          <span className="rally__a">Pretoria</span><span className="rally__b">vir besighede.</span>
        </span>
      </button>
      <p className="rally__line" aria-live="polite">{flip ? LINES[1] : LINES[0]}</p>
    </>
  );
}
