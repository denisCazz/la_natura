import it from './it';
import en from './en';
import fr from './fr';
import type { Dictionary, Locale } from './types';

export type { Dictionary, Locale };

export const locales: Locale[] = ['it', 'en', 'fr'];

const dictionaries: Record<Locale, Dictionary> = { it, en, fr };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function localePath(locale: Locale): string {
  if (locale === 'it') return '/';
  return `/${locale}/`;
}

export function whatsappUrl(prefill: string): string {
  return `https://wa.me/393291867492?text=${encodeURIComponent(prefill)}`;
}

export const SITE = {
  name: 'Agriturismo La Natura',
  phoneDisplay: '329 186 7492',
  phoneTel: '+393291867492',
  address: 'Strada Santa Scolastica 2, 12038 Savigliano (CN)',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Strada+Santa+Scolastica+2+Savigliano',
  instagram: 'https://www.instagram.com/agriturismo_la_natura/',
  facebook: '',
  priceRange: '\u20ac20\u201330',
  ogImage: '/images/hero.jpg',
} as const;
