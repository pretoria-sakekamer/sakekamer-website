import type { EventFormat } from './types';

/** The next Koffie-en-Kenmekaar (utility-bar ticker, home ticket, booking dialog). */
export const nextEvent = {
  title: 'Koffie-en-Kenmekaar',
  day: '18',
  month: 'November',
  monthShort: 'Nov',
  /** 0-based month index, used to highlight the month strip on /funksies. */
  monthIndex: 10,
  time: '08:00',
  venue: 'Centurion Gholfklub',
  description: "'n Maandelikse ontbyt met 'n gasspreker by die Centurion Gholfklub. Elke maand fokus op een pilaar, sodat jy oor die jaar die volle waarde sien.",
  image: '/images/event-2.jpg',
};

export const months = ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'];

export const eventFormats: EventFormat[] = [
  { title: 'Koffie-en-Kenmekaar', when: 'Elke maand · 08:00', text: 'Ontbyt, gasspreker en Wie soek wat.' },
  { title: 'SakeSkool', when: 'Werkswinkels', text: 'Praktiese sessies deur lede en vennote.' },
  { title: 'SakeWêreld', when: 'Ambassade-aande', text: 'Saam met ambassades en bilaterale kamers.' },
];
