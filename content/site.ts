import type { Contact, NavItem } from './types';

export const nav: NavItem[] = [
  { key: 'tuis', label: 'Tuis', slug: '/' },
  { key: 'waarde', label: 'Wat jy kry', slug: '/wat-jy-kry' },
  { key: 'lidmaatskap', label: 'Lidmaatskap', slug: '/lidmaatskap' },
  { key: 'funksies', label: 'Funksies', slug: '/funksies' },
  { key: 'ledegids', label: 'Ledegids', slug: '/ledegids' },
  { key: 'oor', label: 'Oor ons', slug: '/oor-ons' },
];

export const contact: Contact = { phone: '063 952 1341', email: 'admin@pretoriasake.co.za', area: 'Centurion, Pretoria' };

export const site = {
  name: 'Pretoria Sakekamer',
  domain: 'pretoriasake.co.za',
  /** Default <title> suffix and meta description. */
  title: 'Pretoria Sakekamer — Besighede vir Pretoria',
  description:
    'Die Pretoria Sakekamer verbind die stad se besighede met mekaar, sodat hulle saam kan groei. Besighede vir Pretoria. Pretoria vir besighede.',
  edition: ['Gestig 2023 · Pretoria', 'Onafhanklik · Nie-polities · Tweetalig'],
  rally: ['Besighede vir Pretoria.', 'Pretoria vir besighede.'],
  copyright: '© Pretoria Sakekamer 2026 · Onafhanklik · Nie-polities · Tweetalig',
  legal: 'Privaatheid · POPIA · PAIA',
  /** Member portal / joining URLs — still to be supplied (see CONTENT_TODO.md). */
  portalUrl: '#portaal',
} as const;
