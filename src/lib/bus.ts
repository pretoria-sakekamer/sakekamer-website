/**
 * Tiny cross-island event bus. Astro islands are separate React roots, so the global
 * Toast and Booking dialog listen for window events instead of sharing React state.
 */
export interface ToastMessage { title: string; body?: string; tone?: 'success' | 'error' | 'info' }

export const TOAST_EVENT = 'ps:toast';
export const BOOK_EVENT = 'ps:book';

export function showToast(msg: ToastMessage) {
  window.dispatchEvent(new CustomEvent<ToastMessage>(TOAST_EVENT, { detail: msg }));
}

export function openBooking() {
  window.dispatchEvent(new CustomEvent(BOOK_EVENT));
}

export const JOIN_EVENT = 'ps:join';

/** A visitor chose a membership tier ("Sluit aan" / "Gesels"). */
export function requestJoin(tier: string) {
  window.dispatchEvent(new CustomEvent<string>(JOIN_EVENT, { detail: tier }));
}
