import { ph, type AboutLayer, type DirectoryEntry, type Stat, type TeamMember, type WantedAd } from './types';

/** "Wie soek wat" examples. Members will post their own via the member portal. */
export const wanted: WantedAd[] = [
  { kind: 'SOEK', text: "Betroubare boekhouer vir 'n klein vervoerbesigheid in Pretoria-Oos.", who: ph('Lid se naam') },
  { kind: 'BIED', text: 'Gratis uur se advies oor arbeidswetgewing vir nuwe lede.', who: ph('Lid se naam') },
  { kind: 'SOEK', text: 'Verskaffer van verpakking, kleiner bestellings, Centurion.', who: ph('Lid se naam') },
  { kind: 'BIED', text: 'Vergaderlokaal vir 20 mense, een Vrydag per maand, gratis vir lede.', who: ph('Lid se naam') },
];

/** Board and management. Portraits still to come (PLEKHOUER). */
export const team: TeamMember[] = [
  { name: 'Janhendrik Oosthuizen', role: 'Voorsitter · Direksielid' },
  { name: 'Marna Bouwer', role: 'Ondervoorsitter · Direksielid' },
  { name: 'Carlo du Plessis', role: 'Direksielid' },
  { name: 'Adv. Johan Ebersohn', role: 'Direksielid' },
  { name: 'Tiaan van Dyk', role: 'Bestuurslid' },
  { name: 'Christo Bester', role: 'Bestuurslid' },
  { name: 'Brigit Becker', role: 'Administratiewe assistent' },
];

export const founders = 'Met dank aan ons stigters, Fergus en Marina Ferguson, wat die Pretoria Sakekamer in 2023 van nuuts af gebou het.';

/** Quarterly report-back figures. Three are PLEKHOUER until the first quarter's numbers are in. */
export const stats: Stat[] = [
  { value: ph('#'), label: 'sakeprobleme opgelos deur Vra die Kamer' },
  { value: ph('#'), label: 'verwysings tussen lede' },
  { value: ph('#'), label: 'ledekolligte gepubliseer' },
  { value: '12', label: 'Koffie-en-Kenmekaars per jaar' },
];

export const aboutLayers: AboutLayer[] = [
  { k: 'Hoekom', v: 'Ons glo in Pretoria — in haar mense, haar moontlikhede en die toekoms wat ons saam bou.' },
  { k: 'Kreet', v: 'Besighede vir Pretoria. Pretoria vir besighede.' },
  { k: 'Visie', v: "'n Stad en 'n sakegemeenskap wat mekaar sterk maak." },
  { k: 'Grense', v: 'Nie-polities. Tweetalig. Inklusief.' },
];

export const chairQuote = {
  quote: "'n Sterk stad gebeur nie vanself nie. Dit word gebou deur mense wat bereid is om hande te vat, moue op te rol, probleme op te los en geleenthede vir mekaar te skep.",
  name: 'Janhendrik Oosthuizen',
  initials: 'JO',
  role: 'Voorsitter, Pretoria Sakekamer',
};

/** Directory sectors (filter tags). "Alles" = no filter. */
export const sectors = ['Alles', 'Finansies', 'Regte', 'Bou en eiendom', 'Vervoer', 'Gasvryheid', 'IT', 'Vervaardiging'] as const;

/**
 * Directory sample rows — PLEKHOUER until the member list is imported.
 * Mirrors the prototype's generated rows ("Besigheid 1…8").
 */
const areas = ['Centurion', 'Pretoria-Oos', 'Hatfield', 'Menlo Park'];
export const directory: DirectoryEntry[] = Array.from({ length: 8 }, (_, i) => ({
  name: 'Besigheid ' + (i + 1),
  sector: sectors[1 + (i % 7)],
  area: areas[i % 4],
}));
