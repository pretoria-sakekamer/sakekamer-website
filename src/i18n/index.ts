import { defaultLocale, locales, ui, type Locale, type UIKey } from './ui';

export * from './ui';

/** Reads the locale from a URL path: "/en/funksies" → "en", anything else → default. */
export function getLocale(url: URL): Locale {
  const seg = url.pathname.split('/')[1];
  return (locales as readonly string[]).includes(seg) ? (seg as Locale) : defaultLocale;
}

/** Returns a translator for a locale; missing keys fall back to Afrikaans. */
export function useTranslations(lang: Locale) {
  return (key: UIKey): string => ui[lang][key] ?? ui.af[key];
}

/** Prefixes a site path with the locale ("/funksies" → "/en/funksies"). */
export function localizePath(path: string, lang: Locale): string {
  if (lang === defaultLocale) return path;
  return path === '/' ? `/${lang}` : `/${lang}${path}`;
}

/** Removes the locale prefix ("/en/funksies" → "/funksies"). */
export function stripLocale(pathname: string): string {
  const parts = pathname.split('/');
  if ((locales as readonly string[]).includes(parts[1])) parts.splice(1, 1);
  const p = parts.join('/') || '/';
  return p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p;
}

/** The same page in another locale (used by the AF/EN switch). */
export function switchLocalePath(url: URL, to: Locale): string {
  return localizePath(stripLocale(url.pathname), to);
}
