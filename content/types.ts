/**
 * Content types for the Pretoria Sakekamer website.
 * Every editable piece of copy/data lives in /content so it can later move to a headless CMS.
 *
 * Placeholder convention: a field typed `Placeholder` is content the client still has to supply.
 * It renders as a visible gold "PLEKHOUER · …" label (see src/components/site/Placeholder.tsx)
 * and is listed in CONTENT_TODO.md.
 */

/** Content still to be supplied by the client. `label` is shown after "Plekhouer ·". */
export interface Placeholder { placeholder: string }
export const ph = (label: string): Placeholder => ({ placeholder: label });
export const isPlaceholder = (v: unknown): v is Placeholder =>
  typeof v === 'object' && v !== null && 'placeholder' in v;

export type RouteKey = 'tuis' | 'waarde' | 'lidmaatskap' | 'funksies' | 'ledegids' | 'oor';

export interface NavItem { key: RouteKey; label: string; slug: string }

export interface Pillar {
  /** Ordinal, e.g. "01". */
  n: string;
  /** SAKEPULS pillar name, e.g. "SakeKoppel". */
  name: string;
  /** One-line promise shown in the accordion row. */
  line: string;
  body: string;
  /** "Net vir lede" — what only members get. */
  only: string;
  /** "Binnekort" — what is coming soon. */
  soon: string;
}

export type TierId = 'gemeenskap' | 'koppel' | 'groei' | 'vennoot' | 'hoofvennoot';

export interface Tier {
  id: TierId;
  name: string;
  /** Monthly price in rand. Final prices are still a placeholder (board proposal). */
  m: number;
  for: string;
  get: string[];
  /** Recommended tier (navy column). */
  star?: boolean;
}

/** Row in the tier comparison table. `min` = 1-based index of the first tier that includes it. */
export interface TierFeature { label: string; min: 1 | 2 | 3 | 4 | 5 }

export interface WantedAd { kind: 'SOEK' | 'BIED'; text: string; who: Placeholder | string }

export interface TeamMember { name: string; role: string; portrait?: string }

export interface Contact { phone: string; email: string; area: string }

export interface Faq { q: string; a: string }

export interface Stat { value: Placeholder | string; label: string }

export interface JoinStep { n: string; title: string; text: string }

export interface EventFormat { title: string; when: string; text: string }

export interface DirectoryEntry {
  name: string;
  sector: string;
  area: string;
  /** Profile URL in the member portal (to come). */
  href?: string;
}

export interface AboutLayer { k: string; v: string }
