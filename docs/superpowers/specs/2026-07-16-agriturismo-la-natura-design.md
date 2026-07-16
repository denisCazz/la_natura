# Agriturismo La Natura — Design Spec

**Date:** 2026-07-16  
**Client:** Agriturismo La Natura, Savigliano (CN)  
**Stack:** Astro (static site)

## Goal

Single-purpose marketing site: showcase the agriturismo restaurant and drive phone / WhatsApp reservations. Multilingual: Italian, English, French.

## Scope

### In

- One long landing page per locale (`/`, `/en/`, `/fr/`)
- Hero, Cucina, Luogo, Info pratiche, Footer
- Sticky WhatsApp + tel CTAs
- Stock/placeholder imagery (replaceable later with client photos)
- Basic SEO (title, description, Open Graph, Restaurant schema)

### Out

- Online booking engine / payments
- CMS, blog, events calendar
- Contact form backend
- Menu PDF or full dish list (can be added later)
- Dark mode

## Business data

| Field | Value |
|--------|--------|
| Name | Agriturismo La Natura |
| Address | Strada Santa Scolastica 2, 12038 Savigliano (CN) |
| Phone / WhatsApp | 329 186 7492 → `tel:+393291867492`, `https://wa.me/393291867492` |
| Hours | Lunch & dinner; closed Tuesday |
| Price guide | €20–30 per person |
| Hosts | Valentin & Silvana |
| Instagram | agriturismo_la_natura |
| Facebook | La Natura |
| Atmosphere | Rural elegant + Piedmontese kitchen |

WhatsApp deep link includes a short prefilled message (localized), e.g. IT: “Ciao, vorrei prenotare un tavolo…”

## Information architecture

```
/           → IT landing
/en/        → EN landing
/fr/        → FR landing
```

Section order (same on every locale):

1. **Header** — brand, language switcher, compact Chiama / WhatsApp
2. **Hero** — full-bleed image; brand “La Natura”; one headline; one supporting line; primary CTAs
3. **Cucina** — Italian meat, garden produce, Piedmontese taste; 1–2 images
4. **Il luogo** — garden, hospitality, Savigliano setting
5. **Info** — hours, price guide, address, map link (Google Maps)
6. **Footer** — contacts, social, languages, legal minimal (©)

Mobile: floating WhatsApp button above the fold bottom-right.

## Visual design

### Direction

Rural elegant with a culinary accent. One composition in the first viewport. Brand-first hero. No dashboard clutter, no hero overlays/badges/cards.

### Palette (CSS variables)

| Token | Hex | Use |
|--------|-----|-----|
| `--color-ink` | `#2C3A2E` | Text, nav |
| `--color-leaf` | `#5A6F4F` | Accents, links |
| `--color-cream` | `#F7F2E9` | Soft section backgrounds (not dominant) |
| `--color-terracotta` | `#A65D3F` | CTA only, sparingly |
| `--color-surface` | `#FFFCFA` | Page surface |

Avoid purple gradients, generic cream+serif terracotta clichés as the whole theme, and multi-layer shadows.

### Typography

- Display: Fraunces (or equivalent expressive serif) — brand + section titles
- Body: Source Sans 3 — UI and paragraphs

Loaded via `font-face` or Google Fonts with `font-display: swap`.

### Hero rules

- Full-bleed edge-to-edge image (not inset card)
- Content budget: brand, one headline, one sentence, CTA group
- No stats, schedules, or promo chips on the image

### Motion

1. Hero subtle ken-burns or slow scale
2. Section fade/slide-in on scroll (respect `prefers-reduced-motion`)
3. CTA hover state (color/underline, light)

## Content model

Translations live in typed modules, e.g. `src/i18n/{it,en,fr}.ts`, exporting the same keys:

- `meta.title`, `meta.description`
- `hero.headline`, `hero.support`, `hero.ctaCall`, `hero.ctaWhatsApp`
- `cucina.title`, `cucina.body`
- `luogo.title`, `luogo.body`
- `info.title`, `info.hours`, `info.price`, `info.addressLabel`
- `whatsapp.prefill`
- `nav` / `footer` strings

Italian is the source of truth for tone; EN/FR are full translations, not machine placeholders left unfinished.

## Technical architecture

```
src/
  layouts/BaseLayout.astro
  pages/
    index.astro          # IT
    en/index.astro
    fr/index.astro
  components/
    Header.astro
    Hero.astro
    Cucina.astro
    Luogo.astro
    Info.astro
    Footer.astro
    WhatsAppSticky.astro
  i18n/
    it.ts
    en.ts
    fr.ts
    index.ts             # locale helpers
  styles/
    global.css           # tokens, reset, motion
public/
  images/                # hero + section assets (stock + client swaps)
```

- Astro static output (`output: 'static'`)
- Shared section components receive `t` (locale strings) + `locale`
- Language switcher preserves “same page” (all locales are the landing)
- Images: Astro `<Image>` where useful; optimized formats
- No client framework unless a tiny island is needed for motion (prefer CSS)

## SEO & a11y

- Unique `<title>` and meta description per locale
- `html lang` = `it` | `en` | `fr`
- `hreflang` alternate links across the three URLs
- Open Graph title/description/image
- JSON-LD `Restaurant` (name, address, telephone, servesCuisine, priceRange)
- Semantic landmarks (`header`, `main`, `footer`), focusable CTAs, alt text on images
- Skip link to main content

## Assets

- Ship 3–4 quality stock images (garden/orchard, table/kitchen, Piedmontese food cue, outdoor seating)
- Paths stable under `public/images/` so client can overwrite files later
- Logo: text wordmark “La Natura” until client logo arrives; optional SVG slot in Header

## Success criteria

- Visitor understands place + cuisine in under 10 seconds
- Call or WhatsApp reachable from hero and sticky control on mobile
- All three languages complete and consistent
- Lighthouse-friendly static build; works on mobile and desktop
- Client can drop in real photos without code restructuring

## Implementation notes (non-goals for v1)

- Form / email API → later if requested
- Menu page → later
- Booking widget → later
