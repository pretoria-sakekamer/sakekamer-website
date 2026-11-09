import { useState } from 'react';
import { faqs } from '@content/membership';

/** "Vrae wat lede vra" — one-open-at-a-time accordion; the first question starts open. */
export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq">
      {faqs.map((f, i) => {
        const on = open === i;
        const id = 'vraag-' + i;
        return (
          <div key={f.q} className="faq__item">
            <h3 className="faq__q">
              <button type="button" className="faq__btn" aria-expanded={on} aria-controls={id} onClick={() => setOpen(on ? -1 : i)}>
                {f.q}<span className="faq__icon" aria-hidden="true">{on ? '–' : '+'}</span>
              </button>
            </h3>
            <p id={id} className="faq__a" hidden={!on}>{f.a}</p>
          </div>
        );
      })}
    </div>
  );
}
