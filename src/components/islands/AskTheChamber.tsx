import { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import { Button } from '../ds/core/Button';
import { Icon } from '../ds/core/Icon';
import { Input } from '../ds/forms/Input';
import { Dialog } from '../ds/feedback/Dialog';
import { Kicker } from '../site/Kicker';
import { Placeholder } from '../site/Placeholder';
import { showToast } from '../../lib/bus';
import { emailOrPhone, HONEYPOT, required, submitForm } from '../../lib/forms';
import { useReducedMotion } from '../../lib/useReducedMotion';

const EXAMPLES = ["'n betroubare boekhouer", 'my eerste uitvoerbestelling', "'n probleem met my munisipale rekening", "'n mentor vir my span", 'vervoer na Botswana'];
const CYCLE_MS = 2600;

/**
 * §1 Vra die Kamer: sentence-style form "Ek het hulp nodig met ___".
 * The placeholder cycles every 2.6 s (stops under prefers-reduced-motion); submit opens a dialog
 * for name + contact, and a success Toast follows.
 * TODO(integration): send to email/CRM with the 48-hour service promise (lib/forms.ts).
 */
export function AskTheChamber() {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [errors, setErrors] = useState<{ name?: string; contact?: string }>({});
  const reduced = useReducedMotion();
  const openedAt = useRef(0);
  const hp = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (reduced || q || open) return; // freeze the example while the dialog shows it
    const t = window.setInterval(() => setI(x => (x + 1) % EXAMPLES.length), CYCLE_MS);
    return () => window.clearInterval(t);
  }, [reduced, q, open]);

  const question = q || EXAMPLES[i];

  const onAsk = (e: SyntheticEvent) => { e.preventDefault(); openedAt.current = Date.now(); setErrors({}); setOpen(true); };

  const onSend = async (e: SyntheticEvent) => {
    e.preventDefault();
    const next = { name: required(name, 'Vul asseblief jou naam en van in.'), contact: emailOrPhone(contact) };
    setErrors(next);
    if (next.name || next.contact) return;
    const ok = await submitForm('vra-die-kamer', { question, name, contact }, { honeypot: hp.current?.value ?? '', openedAt: openedAt.current });
    setOpen(false);
    if (ok) {
      setQ(''); setName(''); setContact('');
      showToast({ title: 'Dankie! Ons het jou vraag ontvang.', body: "Binne 48 uur verbind ons jou met 'n lid wat kan help." });
    }
  };

  return (
    <section className="bg-ink py-96" id="vra-die-kamer" aria-labelledby="vra-label">
      <div className="wrap">
        <Kicker n="1" dark>Vra die Kamer · SakeKoppel</Kicker>
        <div className="ask__grid">
          <form onSubmit={onAsk}>
            <label htmlFor="vra" id="vra-label" className="ask__label">Ek het hulp nodig met</label>
            <div className="ask__row">
              <input id="vra" className="ask__input" value={q} onChange={e => setQ(e.target.value)} placeholder={EXAMPLES[i] + '…'} autoComplete="off" />
              <button type="submit" aria-label="Stuur" className="ask__send"><Icon name="arrow-right" size={24} /></button>
            </div>
          </form>
          <div className="ask__promise">
            <div className="ask__48">48<span>UUR</span></div>
            <p>Bring jou sakeprobleem. Binne 48 uur verbind ons jou met 'n lid wat kan help. 'n Mens, nie 'n stelsel nie.</p>
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)} eyebrow="Vra die Kamer" title="Ons soek die regte lid vir jou."
        footer={<Button size="sm" type="submit" form="vra-form">Stuur my vraag</Button>}>
        <form id="vra-form" className="form-stack" onSubmit={onSend} noValidate>
          <p className="ask__q">Jou vraag: <i>{question}</i></p>
          <Input label="Naam en van" placeholder="Bv. Marna Bouwer" autoComplete="name" aria-required value={name} onChange={e => setName(e.target.value)} error={errors.name} />
          <Input label="Selfoon of e-pos" placeholder="naam@besigheid.co.za" autoComplete="email" aria-required value={contact} onChange={e => setContact(e.target.value)} error={errors.contact} />
          <input ref={hp} className="hp" type="text" name={HONEYPOT} tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <p className="note">Nie 'n lid nie? Jou eerste vraag is op ons. <Placeholder>bevestig beleid</Placeholder></p>
        </form>
      </Dialog>
    </section>
  );
}
