# Agriturismo La Natura — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a static Astro landing site for Agriturismo La Natura (IT/EN/FR) that showcases the restaurant and drives phone/WhatsApp reservations.

**Architecture:** One long landing page per locale (`/`, `/en/`, `/fr/`). Shared Astro components receive typed translation objects. CSS variables + global styles define the rural-elegant look. No CMS, no forms, no client framework — CSS for motion.

**Tech Stack:** Astro 5 (static), TypeScript, CSS (no UI framework), Google Fonts (Fraunces + Source Sans 3), Unsplash/Pexels stock images saved under `public/images/`.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-16-agriturismo-la-natura-design.md`
- Phone/WhatsApp: `329 186 7492` → `tel:+393291867492`, `https://wa.me/393291867492`
- Address: Strada Santa Scolastica 2, 12038 Savigliano (CN)
- Hours: lunch & dinner; closed Tuesday
- Price guide: €20–30 per person
- Hosts: Valentin & Silvana
- Palette tokens exactly: ink `#2C3A2E`, leaf `#5A6F4F`, cream `#F7F2E9`, terracotta `#A65D3F`, surface `#FFFCFA`
- Hero: full-bleed only; brand + one headline + one sentence + CTAs; no cards/badges on hero
- Locales: `it` | `en` | `fr` with full copy (no unfinished placeholders)
- Repo may need `git init` on first commit (folder starts without git)

---

## File structure

| Path | Responsibility |
|------|----------------|
| `package.json` / `astro.config.mjs` / `tsconfig.json` | Astro project config, static output |
| `src/styles/global.css` | Reset, tokens, typography, motion, utilities |
| `src/i18n/types.ts` | Shared `Dictionary` type |
| `src/i18n/it.ts` / `en.ts` / `fr.ts` | Locale copy |
| `src/i18n/index.ts` | `locales`, `getDictionary`, paths, WhatsApp URL helper, site constants |
| `src/layouts/BaseLayout.astro` | HTML shell, SEO, hreflang, JSON-LD, skip link |
| `src/components/Header.astro` | Brand, language switcher, compact CTAs |
| `src/components/Hero.astro` | Full-bleed hero |
| `src/components/Cucina.astro` | Cuisine section |
| `src/components/Luogo.astro` | Place / hospitality section |
| `src/components/Info.astro` | Hours, price, address, map |
| `src/components/Footer.astro` | Contacts, social, languages |
| `src/components/WhatsAppSticky.astro` | Mobile sticky WhatsApp button |
| `src/pages/index.astro` | IT landing |
| `src/pages/en/index.astro` | EN landing |
| `src/pages/fr/index.astro` | FR landing |
| `public/images/hero.jpg` | Hero stock |
| `public/images/cucina.jpg` | Cuisine stock |
| `public/images/luogo.jpg` | Place stock |
| `public/images/tavola.jpg` | Optional second food/table image |

---

### Task 1: Scaffold Astro project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `src/pages/index.astro` (temporary stub)
- Create: git repo if missing

**Interfaces:**
- Consumes: none
- Produces: runnable `npm run dev` / `npm run build` Astro 5 static project

- [ ] **Step 1: Init git (if needed) and scaffold**

```bash
cd "c:\Users\U1795\Desktop\bitora_clienti\la_natura"
git init
npm create astro@latest . -- --template minimal --install --typescript strict --git false --yes
```

If the CLI refuses a non-empty directory, create files manually:

`package.json`:
```json
{
  "name": "la-natura",
  "type": "module",
  "version": "0.0.1",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^5.0.0"
  }
}
```

`astro.config.mjs`:
```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://lanaturasavigliano.it',
  output: 'static',
});
```

`tsconfig.json`:
```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

`.gitignore`:
```
node_modules
dist
.astro
.env
.DS_Store
```

- [ ] **Step 2: Install and verify build**

```bash
npm install
npm run build
```

Expected: build succeeds; `dist/` created.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json .gitignore src
git commit -m "chore: scaffold Astro static project"
```

---

### Task 2: Design tokens, global CSS, fonts

**Files:**
- Create: `src/styles/global.css`
- Modify: `src/layouts/BaseLayout.astro` will import this in Task 4; for now only create CSS
- Keep a minimal `src/pages/index.astro` that imports the CSS for visual check

**Interfaces:**
- Consumes: palette from Global Constraints
- Produces: CSS variables `--color-ink`, `--color-leaf`, `--color-cream`, `--color-terracotta`, `--color-surface`; utility classes `.btn`, `.btn-primary`, `.btn-ghost`, `.section`, `.reveal`

- [ ] **Step 1: Write `src/styles/global.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Source+Sans+3:wght@400;600;700&display=swap');

:root {
  --color-ink: #2c3a2e;
  --color-leaf: #5a6f4f;
  --color-cream: #f7f2e9;
  --color-terracotta: #a65d3f;
  --color-surface: #fffcfa;
  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'Source Sans 3', system-ui, sans-serif;
  --space: clamp(1rem, 2vw, 1.5rem);
  --max: 68rem;
  --header-h: 4rem;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: var(--font-body);
  color: var(--color-ink);
  background: var(--color-surface);
  line-height: 1.6;
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: var(--color-leaf);
}

h1,
h2,
.brand {
  font-family: var(--font-display);
  font-weight: 700;
  line-height: 1.15;
}

.skip-link {
  position: absolute;
  left: -999px;
  top: 0;
  background: var(--color-ink);
  color: white;
  padding: 0.5rem 1rem;
  z-index: 1000;
}

.skip-link:focus {
  left: 0.5rem;
  top: 0.5rem;
}

.section {
  padding: clamp(3.5rem, 8vw, 6rem) var(--space);
}

.section__inner {
  max-width: var(--max);
  margin: 0 auto;
}

.section--cream {
  background: var(--color-cream);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.85rem 1.35rem;
  font: 600 1rem/1 var(--font-body);
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 2px;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.btn-primary {
  background: var(--color-terracotta);
  color: #fff;
}

.btn-primary:hover {
  background: #8f4e34;
}

.btn-ghost {
  background: transparent;
  color: #fff;
  border-color: rgba(255, 255, 255, 0.75);
}

.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.12);
}

.reveal {
  opacity: 0;
  transform: translateY(1rem);
  animation: reveal 0.8s ease forwards;
  animation-timeline: view();
  animation-range: entry 10% cover 30%;
}

@keyframes reveal {
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes kenburns {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.06);
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  .reveal {
    opacity: 1;
    transform: none;
    animation: none;
  }
  .hero__bg {
    animation: none !important;
  }
}
```

- [ ] **Step 2: Temporarily import CSS in `src/pages/index.astro` and run dev**

```astro
---
import '../styles/global.css';
---
<html lang="it">
  <body>
    <p class="brand">La Natura</p>
    <a class="btn btn-primary" href="tel:+393291867492">Chiama</a>
  </body>
</html>
```

Run: `npm run build`  
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css src/pages/index.astro
git commit -m "style: add design tokens and global CSS"
```

---

### Task 3: i18n dictionaries and helpers

**Files:**
- Create: `src/i18n/types.ts`, `src/i18n/it.ts`, `src/i18n/en.ts`, `src/i18n/fr.ts`, `src/i18n/index.ts`

**Interfaces:**
- Consumes: business data from Global Constraints
- Produces:
  - `export type Locale = 'it' | 'en' | 'fr'`
  - `export type Dictionary = { ... }` (full shape below)
  - `export const locales: Locale[]`
  - `export function getDictionary(locale: Locale): Dictionary`
  - `export function localePath(locale: Locale): string` → `'/'` | `'/en/'` | `'/fr/'`
  - `export function whatsappUrl(prefill: string): string`
  - `export const SITE = { name, phoneDisplay, phoneTel, address, mapsUrl, instagram, facebook, priceRange }`

- [ ] **Step 1: Create `src/i18n/types.ts`**

```ts
export type Locale = 'it' | 'en' | 'fr';

export type Dictionary = {
  meta: { title: string; description: string };
  nav: { call: string; whatsapp: string };
  hero: {
    brand: string;
    headline: string;
    support: string;
    ctaCall: string;
    ctaWhatsApp: string;
  };
  cucina: { title: string; body: string; imageAlt: string };
  luogo: { title: string; body: string; imageAlt: string };
  info: {
    title: string;
    hoursLabel: string;
    hours: string;
    priceLabel: string;
    price: string;
    addressLabel: string;
    mapCta: string;
  };
  footer: {
    rights: string;
    follow: string;
  };
  whatsapp: { prefill: string };
  a11y: { skip: string; stickyWhatsApp: string };
};
```

- [ ] **Step 2: Create `src/i18n/it.ts`**

```ts
import type { Dictionary } from './types';

const it: Dictionary = {
  meta: {
    title: 'Agriturismo La Natura | Savigliano',
    description:
      'Cucina di campagna a Savigliano: orto, carne italiana e ospitalità di Valentin e Silvana. Prenota a pranzo o a cena.',
  },
  nav: { call: 'Chiama', whatsapp: 'WhatsApp' },
  hero: {
    brand: 'La Natura',
    headline: 'Cucina di campagna, a Savigliano',
    support:
      'Sapori piemontesi, prodotti dell’orto e carne italiana. Prenota il tuo tavolo.',
    ctaCall: 'Chiama ora',
    ctaWhatsApp: 'Prenota su WhatsApp',
  },
  cucina: {
    title: 'Dall’orto alla tavola',
    body: 'Cuciniamo con ciò che la terra ci offre e con sola carne italiana: piatti genuini, affumicature e dolci come la cheesecake alle erbe del nostro orto. Un sapore di campagna, senza frettolosità.',
    imageAlt: 'Tavola imbandita con piatti di cucina piemontese',
  },
  luogo: {
    title: 'Un giardino per stare insieme',
    body: 'Tra Savigliano e la campagna cuneese, Valentin e Silvana vi accolgono in un agriturismo con giardino e spazi per i bambini. Luce, verde e tavolate conviviali.',
    imageAlt: 'Giardino dell’agriturismo La Natura',
  },
  info: {
    title: 'Info e prenotazioni',
    hoursLabel: 'Orari',
    hours: 'Aperti a pranzo e a cena · Chiuso il martedì',
    priceLabel: 'Indicativo',
    price: '€20–30 a persona',
    addressLabel: 'Dove siamo',
    mapCta: 'Apri in Google Maps',
  },
  footer: {
    rights: 'Agriturismo La Natura · Savigliano',
    follow: 'Seguici',
  },
  whatsapp: {
    prefill: 'Ciao, vorrei prenotare un tavolo all’Agriturismo La Natura.',
  },
  a11y: {
    skip: 'Vai al contenuto',
    stickyWhatsApp: 'Prenota su WhatsApp',
  },
};

export default it;
```

- [ ] **Step 3: Create `src/i18n/en.ts` and `src/i18n/fr.ts`**

`en.ts` — full English equivalents (same keys). Suggested hero:
- headline: `Countryside cooking in Savigliano`
- support: `Piedmontese flavours, garden produce and Italian meat. Book your table.`
- hours: `Open for lunch and dinner · Closed on Tuesdays`

`fr.ts` — full French equivalents. Suggested hero:
- headline: `Cuisine de campagne à Savigliano`
- support: `Saveurs piémontaises, potager et viande italienne. Réservez votre table.`
- hours: `Ouvert à midi et le soir · Fermé le mardi`

(Complete every key; do not leave English words inside `fr.ts`.)

- [ ] **Step 4: Create `src/i18n/index.ts`**

```ts
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
  facebook: 'https://www.facebook.com/', // update if exact page URL known
  priceRange: '€20–30',
  ogImage: '/images/hero.jpg',
} as const;
```

- [ ] **Step 5: Typecheck**

```bash
npx astro check
```

Expected: no errors on i18n modules (or `npx tsc --noEmit` if check not configured). If `astro check` needs `@astrojs/check`, run `npm i -D @astrojs/check typescript` first.

- [ ] **Step 6: Commit**

```bash
git add src/i18n
git commit -m "feat: add IT/EN/FR dictionaries and site helpers"
```

---

### Task 4: BaseLayout with SEO, hreflang, JSON-LD

**Files:**
- Create: `src/layouts/BaseLayout.astro`

**Interfaces:**
- Consumes: `Locale`, `Dictionary`, `SITE`, `localePath`, `locales` from `src/i18n`
- Produces: layout props `{ locale: Locale; t: Dictionary }` wrapping `<slot />`

- [ ] **Step 1: Write `src/layouts/BaseLayout.astro`**

```astro
---
import '../styles/global.css';
import { locales, localePath, SITE, type Dictionary, type Locale } from '../i18n';

interface Props {
  locale: Locale;
  t: Dictionary;
}

const { locale, t } = Astro.props;
const canonical = new URL(localePath(locale), Astro.site);
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: SITE.name,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Strada Santa Scolastica 2',
    addressLocality: 'Savigliano',
    postalCode: '12038',
    addressRegion: 'CN',
    addressCountry: 'IT',
  },
  telephone: SITE.phoneTel,
  servesCuisine: 'Piedmontese',
  priceRange: SITE.priceRange,
  url: canonical.href,
};
---
<!doctype html>
<html lang={locale}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{t.meta.title}</title>
    <meta name="description" content={t.meta.description} />
    <link rel="canonical" href={canonical.href} />
    {locales.map((l) => (
      <link rel="alternate" hreflang={l} href={new URL(localePath(l), Astro.site).href} />
    ))}
    <link rel="alternate" hreflang="x-default" href={new URL('/', Astro.site).href} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={t.meta.title} />
    <meta property="og:description" content={t.meta.description} />
    <meta property="og:image" content={new URL(SITE.ogImage, Astro.site).href} />
    <meta property="og:locale" content={locale === 'it' ? 'it_IT' : locale === 'en' ? 'en_GB' : 'fr_FR'} />
    <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />
  </head>
  <body>
    <a class="skip-link" href="#main">{t.a11y.skip}</a>
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Point `src/pages/index.astro` at layout (temporary empty main)**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { getDictionary } from '../i18n';

const locale = 'it' as const;
const t = getDictionary(locale);
---
<BaseLayout locale={locale} t={t}>
  <main id="main"><p>{t.hero.headline}</p></main>
</BaseLayout>
```

Run: `npm run build`  
Expected: `dist/index.html` contains `<html lang="it">`, meta description, `application/ld+json`, hreflang links.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/BaseLayout.astro src/pages/index.astro
git commit -m "feat: add BaseLayout with SEO and Restaurant schema"
```

---

### Task 5: Header, Hero, WhatsAppSticky

**Files:**
- Create: `src/components/Header.astro`, `src/components/Hero.astro`, `src/components/WhatsAppSticky.astro`
- Create: `public/images/hero.jpg` (download stock; see Step 1)

**Interfaces:**
- Consumes: `t`, `locale`, `SITE`, `whatsappUrl`, `localePath`, `locales`
- Produces: components with props `{ locale: Locale; t: Dictionary }`

- [ ] **Step 1: Add hero image**

Download a free countryside/garden landscape (Unsplash) into `public/images/hero.jpg` (JPEG, ~1600px wide). Example search: “italian countryside garden sunset”. Keep filename stable for client replacement.

- [ ] **Step 2: Write `Header.astro`**

```astro
---
import { locales, localePath, SITE, whatsappUrl, type Dictionary, type Locale } from '../i18n';

interface Props {
  locale: Locale;
  t: Dictionary;
}
const { locale, t } = Astro.props;
const wa = whatsappUrl(t.whatsapp.prefill);
---
<header class="header">
  <div class="header__inner">
    <a class="brand header__brand" href={localePath(locale)}>La Natura</a>
    <nav class="header__langs" aria-label="Language">
      {locales.map((l) => (
        <a
          href={localePath(l)}
          hreflang={l}
          aria-current={l === locale ? 'page' : undefined}
        >
          {l.toUpperCase()}
        </a>
      ))}
    </nav>
    <div class="header__cta">
      <a class="btn btn-primary header__call" href={`tel:${SITE.phoneTel}`}>{t.nav.call}</a>
      <a class="btn header__wa" href={wa} target="_blank" rel="noopener noreferrer">{t.nav.whatsapp}</a>
    </div>
  </div>
</header>
```

Add scoped styles: sticky/fixed header over hero with translucent dark-green backdrop; white brand text on hero-overlapping state OR solid cream bar — prefer translucent ink bar `rgba(44,58,46,0.92)` with light text for contrast on full-bleed hero.

- [ ] **Step 3: Write `Hero.astro`**

```astro
---
import { SITE, whatsappUrl, type Dictionary, type Locale } from '../i18n';

interface Props {
  locale: Locale;
  t: Dictionary;
}
const { t } = Astro.props;
const wa = whatsappUrl(t.whatsapp.prefill);
---
<section class="hero" aria-label={t.hero.brand}>
  <div class="hero__media" aria-hidden="true">
    <img class="hero__bg" src="/images/hero.jpg" alt="" />
  </div>
  <div class="hero__veil"></div>
  <div class="hero__content">
    <p class="brand hero__brand">{t.hero.brand}</p>
    <h1 class="hero__title">{t.hero.headline}</h1>
    <p class="hero__support">{t.hero.support}</p>
    <div class="hero__actions">
      <a class="btn btn-primary" href={`tel:${SITE.phoneTel}`}>{t.hero.ctaCall}</a>
      <a class="btn btn-ghost" href={wa} target="_blank" rel="noopener noreferrer">{t.hero.ctaWhatsApp}</a>
    </div>
  </div>
</section>
```

CSS requirements:
- `.hero` min-height `100svh`, full-bleed, relative
- `.hero__bg` `object-fit: cover; width/height 100%; animation: kenburns 18s ease-in-out alternate infinite`
- `.hero__veil` dark gradient left/bottom for text readability (not a card)
- Brand visually larger than headline weight hierarchy: brand is the hero-level signal

- [ ] **Step 4: Write `WhatsAppSticky.astro`**

```astro
---
import { whatsappUrl, type Dictionary } from '../i18n';

interface Props {
  t: Dictionary;
}
const { t } = Astro.props;
const wa = whatsappUrl(t.whatsapp.prefill);
---
<a
  class="wa-sticky"
  href={wa}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={t.a11y.stickyWhatsApp}
>
  WhatsApp
</a>
```

Fixed bottom-right; terracotta circle/pill; visible on small screens (always ok if discreet on desktop).

- [ ] **Step 5: Wire into `index.astro` and verify**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import WhatsAppSticky from '../components/WhatsAppSticky.astro';
import { getDictionary } from '../i18n';

const locale = 'it' as const;
const t = getDictionary(locale);
---
<BaseLayout locale={locale} t={t}>
  <Header locale={locale} t={t} />
  <main id="main">
    <Hero locale={locale} t={t} />
  </main>
  <WhatsAppSticky t={t} />
</BaseLayout>
```

Run: `npm run build` && open `npm run preview`  
Expected: full-bleed hero, brand “La Natura”, two CTAs, language switcher, sticky WhatsApp.

- [ ] **Step 6: Commit**

```bash
git add src/components/Header.astro src/components/Hero.astro src/components/WhatsAppSticky.astro public/images/hero.jpg src/pages/index.astro
git commit -m "feat: add header, hero, and sticky WhatsApp CTA"
```

---

### Task 6: Cucina, Luogo, Info, Footer sections

**Files:**
- Create: `src/components/Cucina.astro`, `Luogo.astro`, `Info.astro`, `Footer.astro`
- Create: `public/images/cucina.jpg`, `public/images/luogo.jpg` (optional `tavola.jpg`)

**Interfaces:**
- Consumes: same `{ locale, t }` pattern; `SITE` for address/maps/social
- Produces: four section components ready for page composition

- [ ] **Step 1: Add section images** to `public/images/` (food/table + garden). Filenames fixed as above.

- [ ] **Step 2: `Cucina.astro`** — section with title, body, one full-width or split image (not a card grid). Use `.section.reveal` and `.section__inner`. Image `src="/images/cucina.jpg"` `alt={t.cucina.imageAlt}`.

- [ ] **Step 3: `Luogo.astro`** — same pattern with `t.luogo` and `/images/luogo.jpg`. Mention hosts Valentin & Silvana via translation body (already in dictionary).

- [ ] **Step 4: `Info.astro`** — cream background section listing hours, price, address, tel link, maps CTA:

```astro
<a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">{t.info.mapCta}</a>
<a href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a>
```

No card chrome if a simple definition list / stacked rows works.

- [ ] **Step 5: `Footer.astro`** — address, phone, WhatsApp, Instagram, Facebook, language links, `t.footer.rights` + year.

- [ ] **Step 6: Compose full Italian page**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import Cucina from '../components/Cucina.astro';
import Luogo from '../components/Luogo.astro';
import Info from '../components/Info.astro';
import Footer from '../components/Footer.astro';
import WhatsAppSticky from '../components/WhatsAppSticky.astro';
import { getDictionary } from '../i18n';

const locale = 'it' as const;
const t = getDictionary(locale);
---
<BaseLayout locale={locale} t={t}>
  <Header locale={locale} t={t} />
  <main id="main">
    <Hero locale={locale} t={t} />
    <Cucina locale={locale} t={t} />
    <Luogo locale={locale} t={t} />
    <Info locale={locale} t={t} />
  </main>
  <Footer locale={locale} t={t} />
  <WhatsAppSticky t={t} />
</BaseLayout>
```

Run: `npm run build`  
Expected: all sections present in `dist/index.html`; phone and wa.me links present.

- [ ] **Step 7: Commit**

```bash
git add src/components public/images src/pages/index.astro
git commit -m "feat: add cucina, luogo, info, and footer sections"
```

---

### Task 7: EN and FR routes

**Files:**
- Create: `src/pages/en/index.astro`, `src/pages/fr/index.astro`
- Optional refactor: `src/components/LandingPage.astro` accepting `locale` to DRY the three pages

**Interfaces:**
- Consumes: `getDictionary('en' | 'fr')`
- Produces: `/en/` and `/fr/` static pages

- [ ] **Step 1: Create `src/components/LandingPage.astro`**

```astro
---
import Header from './Header.astro';
import Hero from './Hero.astro';
import Cucina from './Cucina.astro';
import Luogo from './Luogo.astro';
import Info from './Info.astro';
import Footer from './Footer.astro';
import WhatsAppSticky from './WhatsAppSticky.astro';
import { getDictionary, type Locale } from '../i18n';

interface Props {
  locale: Locale;
}
const { locale } = Astro.props;
const t = getDictionary(locale);
---
<Header locale={locale} t={t} />
<main id="main">
  <Hero locale={locale} t={t} />
  <Cucina locale={locale} t={t} />
  <Luogo locale={locale} t={t} />
  <Info locale={locale} t={t} />
</main>
<Footer locale={locale} t={t} />
<WhatsAppSticky t={t} />
```

- [ ] **Step 2: Thin pages**

`src/pages/index.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import LandingPage from '../components/LandingPage.astro';
import { getDictionary } from '../i18n';
const locale = 'it' as const;
---
<BaseLayout locale={locale} t={getDictionary(locale)}>
  <LandingPage locale={locale} />
</BaseLayout>
```

`src/pages/en/index.astro` — same with `locale = 'en'`.  
`src/pages/fr/index.astro` — same with `locale = 'fr'`.

- [ ] **Step 3: Verify locales**

```bash
npm run build
```

Check:
- `dist/index.html` contains Italian headline
- `dist/en/index.html` contains English headline
- `dist/fr/index.html` contains French headline
- Language switcher links: `/`, `/en/`, `/fr/`
- WhatsApp `text=` query differs per locale prefill

- [ ] **Step 4: Commit**

```bash
git add src/pages src/components/LandingPage.astro
git commit -m "feat: add English and French landing routes"
```

---

### Task 8: Polish, a11y, final verification

**Files:**
- Modify: component scoped CSS / `global.css` as needed for mobile
- Modify: `SITE.facebook` if real URL available from client

**Interfaces:**
- Consumes: full site
- Produces: production-ready `dist/`

- [ ] **Step 1: Responsive pass**

- Hero text readable on 360px width
- Header: hide secondary WhatsApp text if needed; keep tel
- Sticky WhatsApp does not cover primary CTAs awkwardly
- No horizontal scroll

- [ ] **Step 2: A11y pass**

- Skip link works
- Contrast on hero text sufficient (veil dark enough)
- All images have alt (decorative hero may use `alt=""`)
- `aria-current` on active language

- [ ] **Step 3: Content/spec checklist**

| Spec item | Verified |
|-----------|----------|
| IT/EN/FR landings | |
| Tel + WhatsApp CTAs | |
| Hours closed Tuesday | |
| Address + maps | |
| Instagram link | |
| JSON-LD Restaurant | |
| hreflang | |
| Full-bleed hero | |
| Tokens match palette | |
| `prefers-reduced-motion` | |

- [ ] **Step 4: Final build**

```bash
npm run build
npm run preview
```

Manual: click Chiama, WhatsApp, IT→EN→FR, Maps.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "polish: responsive and a11y pass for launch landing"
```

---

## Spec coverage (self-review)

| Spec requirement | Task |
|------------------|------|
| Landing IT/EN/FR | 3, 7 |
| Hero / Cucina / Luogo / Info / Footer | 5, 6 |
| Sticky WhatsApp + tel | 5 |
| Stock images under `public/images/` | 5, 6 |
| SEO + OG + hreflang + JSON-LD | 4 |
| Palette + Fraunces/Source Sans 3 | 2 |
| Motion + reduced-motion | 2, 5 |
| No CMS/forms/menu | respected (out of scope) |

## Placeholder scan

No TBD steps. Facebook URL may stay generic until client provides exact page — Instagram URL is concrete.

## Type consistency

- `Locale`, `Dictionary`, `getDictionary`, `localePath`, `whatsappUrl`, `SITE` defined in Task 3; all later tasks use these names unchanged.
- Component props consistently `{ locale: Locale; t: Dictionary }` except `WhatsAppSticky` (`{ t }`) and `LandingPage` (`{ locale }`).
