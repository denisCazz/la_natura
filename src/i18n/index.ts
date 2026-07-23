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

export function localePath(locale: Locale, slug = ''): string {
  const clean = slug.replace(/^\/+|\/+$/g, '');
  if (locale === 'it') return clean ? `/${clean}/` : '/';
  return clean ? `/${locale}/${clean}/` : `/${locale}/`;
}

/** Map current pathname to the same page in another locale. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const parts = pathname.replace(/\/+$/, '').split('/').filter(Boolean);
  const slug =
    parts[0] === 'en' || parts[0] === 'fr' ? parts.slice(1).join('/') : parts.join('/');
  return localePath(target, slug);
}

export function whatsappUrl(prefill: string): string {
  return `https://wa.me/393291867492?text=${encodeURIComponent(prefill)}`;
}

export const SITE = {
  name: 'Agriturismo La Natura',
  shortName: 'La Natura',
  phoneDisplay: '329 186 7492',
  phoneTel: '+393291867492',
  address: 'Strada Santa Scolastica 2, 12038 Savigliano (CN)',
  streetAddress: 'Strada Santa Scolastica 2',
  addressLocality: 'Savigliano',
  postalCode: '12038',
  addressRegion: 'CN',
  addressCountry: 'IT',
  geo: { latitude: 44.6008322, longitude: 7.6209577 },
  mapsUrl:
    'https://www.google.com/maps/place/Agriturismo+La+Natura/@44.600308,7.6205574,240m/data=!3m1!1e3!4m9!1m2!2m1!1sStrada+Santa+Scolastica+2,+12038+Savigliano+CN!3m5!1s0x12cd5b32ec2198d7:0x2ba8180c3c7f2b19!8m2!3d44.6008322!4d7.6209577!16s%2Fg%2F11xkhp01s4',
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1125!2d7.6209577!3d44.6008322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12cd5b32ec2198d7%3A0x2ba8180c3c7f2b19!2sAgriturismo%20La%20Natura!5e0!3m2!1sit!2sit!4v1720000000000!5m2!1sit!2sit',
  instagram: 'https://www.instagram.com/agriturismo_la_natura/',
  facebook: '',
  priceRange: '\u20ac13\u201330',
  cuisine: ['Piedmontese', 'Italian', 'Farm-to-table'],
  logo: '/favicon/android-chrome-512x512.png',
  icon: '/favicon/android-chrome-192x192.png',
  ogImage: '/images/outside.png',
  themeColor: '#3f5e4c',
  creditUrl: 'https://www.bitora.it/',
  legal: {
    denominazione: 'Società Agricola La Natura Società Semplice',
    formaGiuridica: 'Società semplice',
    sede: {
      indirizzo: 'Strada Santa Scolastica 2',
      cap: '12038',
      comune: 'Savigliano',
      provincia: 'CN',
      paese: 'Italia',
    },
    pec: 'sa.lanatura.ss@confagricoltura.legalmail.it',
    rea: { provincia: 'CN', numero: '340357' },
    codiceFiscale: '04159780040',
    partitaIva: '04159780040',
    registroImprese: '04159780040',
    dataCostituzione: '2025-03-26',
    dataIscrizione: '2025-04-11',
    rappresentante: {
      nome: 'Silvana',
      cognome: 'Shtjefni',
      ruolo: "Rappresentante dell'impresa",
    },
  },
} as const;
