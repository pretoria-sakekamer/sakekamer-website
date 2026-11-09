import { useRef, useState, type SyntheticEvent } from 'react';
import { showToast } from '../../lib/bus';
import { email as validateEmail, HONEYPOT, submitForm } from '../../lib/forms';

/** Footer newsletter sign-up. TODO(integration): connect to the mail platform (see lib/forms.ts). */
export function Newsletter() {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string>();
  const openedAt = useRef(Date.now());
  const hp = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const err = validateEmail(value);
    setError(err);
    if (err) return;
    const ok = await submitForm('newsletter', { email: value }, { honeypot: hp.current?.value ?? '', openedAt: openedAt.current });
    if (ok) {
      setValue('');
      showToast({ title: 'Dankie! Jy is ingeteken.', body: 'Die nuusbrief kom elke maand na jou inkassie.' });
    }
  };

  return (
    <form className="news" onSubmit={onSubmit} noValidate>
      <label htmlFor="nuusbrief" className="news__lab">DIE NUUSBRIEF</label>
      <div className="news__row">
        <input id="nuusbrief" className="news__input" type="email" name="email" autoComplete="email" placeholder="jou@e-pos.co.za"
          value={value} onChange={e => setValue(e.target.value)} aria-invalid={!!error} aria-describedby={error ? 'nuusbrief-err' : undefined} />
        <button type="submit" className="news__btn">INTEKEN</button>
      </div>
      <input ref={hp} className="hp" type="text" name={HONEYPOT} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {error && <div id="nuusbrief-err" className="news__err" role="alert">{error}</div>}
    </form>
  );
}
