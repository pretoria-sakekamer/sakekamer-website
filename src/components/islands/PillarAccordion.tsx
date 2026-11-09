import { useState } from 'react';
import { pillars } from '@content/pillars';

/**
 * §2 pillar index: accordion of the six SAKEPULS pillars (number / name / line / +).
 * Height animates with the grid-template-rows 0fr→1fr trick (.4 s). Collapsed panels are inert.
 */
export function PillarAccordion() {
  const [open, setOpen] = useState<string | null>('01');
  return (
    <ol className="acc">
      {pillars.map(p => {
        const on = open === p.n;
        const id = 'pilaar-' + p.n;
        return (
          <li key={p.n} className="acc__item">
            <h3 style={{ margin: 0, font: 'inherit' }}>
              <button type="button" className="acc__btn" onClick={() => setOpen(on ? null : p.n)} aria-expanded={on} aria-controls={id}>
                <span className="acc__n">{p.n}</span>
                <span className="acc__name">{p.name}</span>
                <span className="acc__line">{p.line}</span>
                <span className="acc__plus" aria-hidden="true">+</span>
              </button>
            </h3>
            <div id={id} className={'acc__panel' + (on ? ' is-open' : '')} inert={!on}>
              <div className="acc__clip">
                <div className="acc__body">
                  <span className="acc__meta">Net vir lede:<br /><span>{p.only}</span><br /><br />Binnekort:<br /><span>{p.soon}</span></span>
                  <p className="acc__text">{p.body}</p>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
