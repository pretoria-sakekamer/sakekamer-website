import type { Faq, JoinStep, Tier, TierFeature } from './types';

/**
 * Membership tiers (strategy document). Monthly prices are the board's proposal —
 * final prices are still a PLEKHOUER (see CONTENT_TODO.md).
 */
export const tiers: Tier[] = [
  { id: 'gemeenskap', name: 'Gemeenskap', m: 100, for: "NPO's en individue", get: ['Nuusbrief', 'Geleenthede teen lidprys'] },
  { id: 'koppel', name: 'Koppel', m: 375, for: 'Klein besighede wat wil netwerk en leer', get: ['“Vra die Kamer”', 'Ledegids en ledeaanbiedinge', 'Ontbyt teen lidprys'], star: true },
  { id: 'groei', name: 'Groei', m: 800, for: 'Besighede wat wil groei', get: ['Alles in Koppel', 'Mentorskap', 'Gratis werkswinkels', "'n Jaarlikse kollig"] },
  { id: 'vennoot', name: 'Vennoot', m: 1800, for: 'Gevestigde besighede', get: ['Alles in Groei', 'Ambassade-geleenthede', 'Erkenning as vennoot', 'Eskalering van probleme'] },
  { id: 'hoofvennoot', name: 'Hoofvennoot', m: 6000, for: 'Korporatiewe vennote', get: ['Alles in Vennoot', "'n Direkteur as persoonlike skakel", 'Borgskap by geleenthede', 'Logo op die webwerf'] },
];

/** Annual billing discount (annual = monthly × 12 × (1 − discount)). */
export const ANNUAL_DISCOUNT = 0.1;
/** Tiers at or above this monthly price show "Gesels" instead of "Sluit aan". */
export const TALK_THRESHOLD = 1800;

/** Comparison table rows. */
export const tierFeatures: TierFeature[] = [
  { label: 'Nuusbrief en geleenthede teen lidprys', min: 1 },
  { label: '“Vra die Kamer” en verwysings', min: 2 },
  { label: 'Ledegids en Wie soek wat', min: 2 },
  { label: 'Ontbyt teen lidprys', min: 2 },
  { label: 'Mentorskap (SakeGroei)', min: 3 },
  { label: 'Gratis werkswinkels (SakeSkool)', min: 3 },
  { label: "'n Jaarlikse ledekollig", min: 3 },
  { label: 'Ambassade-geleenthede (SakeWêreld)', min: 4 },
  { label: 'Eskalering van probleme (SakeStem)', min: 4 },
  { label: 'Erkenning as vennoot', min: 4 },
  { label: "'n Direkteur as persoonlike skakel", min: 5 },
  { label: 'Borgskap by geleenthede, logo op webwerf', min: 5 },
];

export const faqs: Faq[] = [
  { q: 'Mag ek eers as gas kom?', a: 'Ja. Nie-lede is welkom by die Koffie-en-Kenmekaar, twee keer as gas, teen die volle prys.' },
  { q: 'Hoe betaal ek?', a: 'Per debietorder, EFT of jaarliks vooruit met 10% afslag.' },
  { q: 'Is die Sakekamer polities?', a: 'Nee. Ons is onafhanklik en nie-polities. Ons neem die sakegemeenskap se ervaring, met feite en voorstelle, na die stad.' },
  { q: 'Is die Sakekamer net vir Afrikaanse besighede?', a: "Ons is tweetalig met 'n Afrikaanse hart, en oop vir elke besigheid in Pretoria." },
];

export const joinSteps: JoinStep[] = [
  { n: 'i.', title: 'Kom kuier as gas', text: "Bywoon 'n Koffie-en-Kenmekaar en ontmoet die lede." },
  { n: 'ii.', title: 'Kies jou vlak', text: 'Van R100 tot R6 000 per maand. Betaal maandeliks of jaarliks.' },
  { n: 'iii.', title: 'Ons stel jou voor', text: "Binne jou eerste maand stel 'n direkteur jou aan drie lede voor. " },
];

/**
 * Calculator constants. Formula (README):
 *   value = referrals × referralValue + breakfasts × BREAKFAST_SAVING + (spotlight ? SPOTLIGHT_VALUE : 0)
 * Both values are PLEKHOUER — confirm with the client.
 */
export const calculator = {
  BREAKFAST_SAVING: 150,
  SPOTLIGHT_VALUE: 3500,
  defaults: { tier: 'koppel' as const, referrals: 1, referralValue: 8000, breakfasts: 8, spotlight: true },
  ranges: {
    referrals: { min: 0, max: 6, step: 1 },
    referralValue: { min: 1000, max: 50000, step: 1000 },
    breakfasts: { min: 0, max: 12, step: 1 },
  },
};
