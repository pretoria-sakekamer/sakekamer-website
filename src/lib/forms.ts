/**
 * Form handling: client-side validation + spam protection + a single submit function.
 *
 * Spam protection (no third-party service needed on the free tier):
 *  - honeypot field named "website" that humans never see; bots that fill it are dropped silently;
 *  - minimum fill time: submissions faster than MIN_FILL_MS after the form opened are dropped.
 *
 * TODO(integration): `submitForm` does not send anything yet. Point it at one server endpoint
 * (e.g. a Vercel Function at /api/forms) that forwards to:
 *   - vra-die-kamer → email/CRM, with the 48-hour service promise
 *   - booking       → events / membership platform (TBC)
 *   - newsletter    → mail platform
 *   - join          → membership platform
 * See CONTENT_TODO.md → "Integrations".
 */
export type FormKind = 'vra-die-kamer' | 'booking' | 'newsletter' | 'join';

export const HONEYPOT = 'website';
export const MIN_FILL_MS = 2500;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^(\+27|0)[\s-]?\d{2}[\s-]?\d{3}[\s-]?\d{4}$/;

export const isEmail = (v: string) => EMAIL.test(v.trim());
export const isPhone = (v: string) => PHONE.test(v.trim());

export const required = (v: string, msg = 'Vul asseblief hierdie veld in.') => (v.trim() ? undefined : msg);
export const email = (v: string) =>
  !v.trim() ? 'Vul asseblief jou e-posadres in.' : isEmail(v) ? undefined : "Voer asseblief 'n geldige e-posadres in.";
export const emailOrPhone = (v: string) =>
  !v.trim() ? 'Vul asseblief jou selfoon of e-pos in.' : isEmail(v) || isPhone(v) ? undefined : "Voer asseblief 'n geldige selfoonnommer of e-posadres in.";

export interface SubmitMeta { honeypot: string; openedAt: number }

/** Returns true when the submission looks human and was accepted. */
export async function submitForm(kind: FormKind, data: Record<string, string>, meta: SubmitMeta): Promise<boolean> {
  if (meta.honeypot) return false;
  if (Date.now() - meta.openedAt < MIN_FILL_MS) return false;
  // TODO(integration): replace with
  //   await fetch('/api/forms', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind, ...data }) });
  if (import.meta.env.DEV) console.info('[forms] would submit', kind, data);
  return true;
}
