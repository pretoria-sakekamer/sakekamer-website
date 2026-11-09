import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from 'react';
import { nextEvent } from '@content/events';
import { Button } from '../ds/core/Button';
import { Input } from '../ds/forms/Input';
import { Dialog } from '../ds/feedback/Dialog';
import { Toast } from '../ds/feedback/Toast';
import { Placeholder } from '../site/Placeholder';
import { BOOK_EVENT, JOIN_EVENT, TOAST_EVENT, type ToastMessage } from '../../lib/bus';
import { email as validateEmail, HONEYPOT, required, submitForm } from '../../lib/forms';

interface ToastState extends ToastMessage { placeholder?: string; id: number }

const TOAST_MS = 4000;

/**
 * Page-wide UI, mounted once in the layout:
 *  - the success Toast (bottom right, 4 s), fed by `showToast()` from any island;
 *  - the event booking Dialog, opened by `openBooking()` or any element with data-action="book";
 *  - membership "Sluit aan / Gesels" buttons (`requestJoin()` or data-action="join" data-tier="…").
 */
export function GlobalUI() {
  const [toast, setToast] = useState<ToastState | null>(null);
  const [booking, setBooking] = useState(false);
  const timer = useRef<number>(undefined);

  const flash = useCallback((t: Omit<ToastState, 'id'>) => {
    window.clearTimeout(timer.current);
    setToast({ ...t, id: Date.now() });
    timer.current = window.setTimeout(() => setToast(null), TOAST_MS);
  }, []);

  useEffect(() => {
    const onToast = (e: Event) => flash((e as CustomEvent<ToastMessage>).detail);
    const onBook = () => setBooking(true);
    // TODO(integration): send to the membership platform / joining URL (CONTENT_TODO.md).
    const join = (tier: string) =>
      flash({ title: 'Dankie! Ons kontak jou oor ' + tier + '.', body: 'Aansluiting gaan na die ledeplatform.', placeholder: 'skakel' });
    const onJoin = (e: Event) => join((e as CustomEvent<string>).detail);
    // Static (non-hydrated) buttons opt in with data-action="book" or data-action="join" data-tier="…".
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>('[data-action]');
      if (!el) return;
      if (el.dataset.action === 'book') { e.preventDefault(); setBooking(true); }
      if (el.dataset.action === 'join') { e.preventDefault(); join(el.dataset.tier ?? ''); }
    };
    window.addEventListener(TOAST_EVENT, onToast);
    window.addEventListener(BOOK_EVENT, onBook);
    window.addEventListener(JOIN_EVENT, onJoin);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener(TOAST_EVENT, onToast);
      window.removeEventListener(BOOK_EVENT, onBook);
      window.removeEventListener(JOIN_EVENT, onJoin);
      document.removeEventListener('click', onClick);
    };
  }, [flash]);

  return (
    <>
      <BookingDialog open={booking} onClose={() => setBooking(false)}
        onDone={() => { setBooking(false); flash({ title: 'Jou plek is bespreek.', body: 'Ons sien jou by die ' + nextEvent.venue + '.' }); }} />
      <div className="toast-host" aria-live="polite">
        {toast && (
          <Toast key={toast.id} tone={toast.tone ?? 'success'} title={toast.title} onClose={() => setToast(null)}>
            {toast.body}{toast.placeholder && <> <Placeholder dark>{toast.placeholder}</Placeholder></>}
          </Toast>
        )}
      </div>
    </>
  );
}

function BookingDialog({ open, onClose, onDone }: { open: boolean; onClose: () => void; onDone: () => void }) {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; mail?: string }>({});
  const openedAt = useRef(0);
  const hp = useRef<HTMLInputElement>(null);

  useEffect(() => { if (open) { openedAt.current = Date.now(); setErrors({}); } }, [open]);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const next = { name: required(name, 'Vul asseblief jou naam en van in.'), mail: validateEmail(mail) };
    setErrors(next);
    if (next.name || next.mail) return;
    // TODO(integration): connect to the events / membership platform (TBC).
    const ok = await submitForm('booking', { name, email: mail, event: `${nextEvent.title} ${nextEvent.day} ${nextEvent.month}` },
      { honeypot: hp.current?.value ?? '', openedAt: openedAt.current });
    if (ok) { setName(''); setMail(''); onDone(); }
  };

  return (
    <Dialog open={open} onClose={onClose}
      eyebrow={`${nextEvent.title} · ${nextEvent.day} ${nextEvent.month} · ${nextEvent.time}`} title="Bespreek jou plek"
      footer={<>
        <Button variant="secondary" size="sm" onClick={onClose}>Kanselleer</Button>
        <Button size="sm" type="submit" form="bespreek-form">Bevestig</Button>
      </>}>
      <form id="bespreek-form" className="form-stack" onSubmit={onSubmit} noValidate>
        <Input label="Naam en van" placeholder="Bv. Tiaan van Dyk" autoComplete="name" aria-required value={name} onChange={e => setName(e.target.value)} error={errors.name} />
        <Input label="E-pos" type="email" placeholder="naam@besigheid.co.za" autoComplete="email" aria-required value={mail} onChange={e => setMail(e.target.value)} error={errors.mail} />
        <input ref={hp} className="hp" type="text" name={HONEYPOT} tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <p className="note">Lede betaal die lidprys; gaste die volle prys. <Placeholder>pryse</Placeholder></p>
      </form>
    </Dialog>
  );
}
