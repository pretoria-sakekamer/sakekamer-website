/**
 * i18n scaffolding. Afrikaans ('af') is the default locale and is served without a prefix;
 * English lives under /en/.
 *
 * Only Afrikaans copy exists today. The `en` dictionary is intentionally partial: any key
 * missing from `en` falls back to `af` (see `t()` in ./index.ts). Fill it in when the client
 * supplies the English copy (CONTENT_TODO.md → "English").
 */
export const locales = ['af', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'af';

export const localeNames: Record<Locale, string> = { af: 'AF', en: 'EN' };
export const htmlLang: Record<Locale, string> = { af: 'af', en: 'en' };

const af = {
  'skip': 'Gaan na inhoud',
  'ticker.label': 'Volgende Koffie-en-Kenmekaar:',
  'portal': 'Lede-portaal · Teken in',
  'lang.switch': 'Taal',
  'cta.join': "Word 'n lid",
  'menu.open': 'Kieslys',
  'menu.close': 'Maak kieslys toe',
  'nav.label': 'Hoofnavigasie',
  'en.banner': '',
} as const;

export type UIKey = keyof typeof af;

/** English UI strings. Partial on purpose: missing keys fall back to Afrikaans. */
const en: Partial<Record<UIKey, string>> = {
  'en.banner': 'English version coming soon.',
};

export const ui: { af: Record<UIKey, string>; en: Partial<Record<UIKey, string>> } = { af, en };
