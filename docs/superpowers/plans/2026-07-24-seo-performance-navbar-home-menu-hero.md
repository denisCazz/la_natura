# SEO, Performance, Navbar, Home and Menu Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve SEO, asset performance, navigation, and home composition, then add a localized menu hero using the supplied photograph.

**Architecture:** Keep Astro static output and existing localized routes. Extend current components instead of replacing the design system, use Astro's image pipeline for page media, Fontsource for local fonts, and the official sitemap integration. Add one focused `MenuHero` component and one build-output regression test suite.

**Tech Stack:** Astro 7, TypeScript strict mode, scoped CSS, Node test runner, `@astrojs/sitemap`, Fontsource variable fonts.

## Global Constraints

- Preserve `/`, `/menu/`, `/en/`, `/en/menu/`, `/fr/`, and `/fr/menu/`.
- Preserve current rural-elegant palette and typography direction.
- Use `🇮🇹 IT`, `🇬🇧 EN`, and `🇫🇷 FR`; flags are decorative and links have accessible language names.
- Keep phone and WhatsApp as primary conversion actions.
- Add no client framework; navbar script remains framework-free.
- Use supplied `public/images/hero_menu.png` for the menu hero.
- Do not invent business data, ratings, reviews, or social URLs.
- Respect `prefers-reduced-motion`.
- Do not commit unless the user explicitly requests a commit.

---

## File Map

- Create `src/assets/images/`: source copies used by Astro's image pipeline.
- Create `src/components/MenuHero.astro`: compact visual heading for menu routes.
- Create `src/data/business.ts`: canonical opening-hour facts shared by copy and JSON-LD.
- Create `tests/site-output.test.mjs`: regression checks against built static output.
- Modify `astro.config.mjs`: official sitemap integration.
- Modify `package.json`: dependencies and check/test scripts.
- Modify `src/styles/global.css`: local Fontsource imports and shared layout tokens.
- Modify `src/layouts/BaseLayout.astro`: optimized social image and verified structured data.
- Modify `src/components/Header.astro`: flags, mobile phone CTA, and complete drawer behavior.
- Modify `src/components/Hero.astro`, `Cucina.astro`, `Luogo.astro`, `LogoMark.astro`: optimized responsive media.
- Modify `src/components/LunchOffer.astro`, `Info.astro`: home layout refinement.
- Modify `src/components/MenuPage.astro`: catalog-only layout below the new hero.
- Modify all three menu route files: compose `MenuHero` before `MenuPage`.
- Modify `src/i18n/types.ts` and locale dictionaries only if an accessible menu-image label or structured hour formatting requires localized text.

---

### Task 1: Dependencies, scripts, and build-output test harness

**Files:**
- Modify: `package.json`
- Create: `tests/site-output.test.mjs`

**Interfaces:**
- Produces: `npm run check`, `npm run test:site`
- Consumes: Astro static output in `dist/`

- [ ] **Step 1: Install required packages**

Run:

```powershell
npm install @astrojs/sitemap @fontsource-variable/fraunces @fontsource-variable/outfit
```

Expected: packages added to `package.json` and lockfile without peer-dependency errors.

- [ ] **Step 2: Add verification scripts**

Update `package.json` scripts to:

```json
{
  "scripts": {
    "dev": "astro dev",
    "check": "astro check",
    "build": "astro build",
    "preview": "astro preview",
    "test:site": "npm run build && node --test tests/site-output.test.mjs"
  }
}
```

- [ ] **Step 3: Write initial output tests**

Create `tests/site-output.test.mjs`:

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const read = (path) => readFile(new URL(`../dist/${path}`, import.meta.url), 'utf8');

const routes = [
  'index.html',
  'menu/index.html',
  'en/index.html',
  'en/menu/index.html',
  'fr/index.html',
  'fr/menu/index.html',
];

test('all localized landing and menu routes build', async () => {
  for (const route of routes) {
    const html = await read(route);
    assert.match(html, /<html lang="(?:it|en|fr)"/);
    assert.match(html, /rel="canonical"/);
  }
});

test('sitemap includes every public content route', async () => {
  const sitemapIndex = await read('sitemap-index.xml').catch(() => '');
  const sitemap = sitemapIndex
    ? await read('sitemap-0.xml')
    : await read('sitemap.xml');

  for (const path of ['/', '/menu/', '/en/', '/en/menu/', '/fr/', '/fr/menu/']) {
    assert.ok(sitemap.includes(`https://lanaturasavigliano.it${path}`), path);
  }
});

test('menu routes contain a visual hero and optimized picture', async () => {
  for (const route of ['menu/index.html', 'en/menu/index.html', 'fr/menu/index.html']) {
    const html = await read(route);
    assert.match(html, /class="menu-hero"/);
    assert.match(html, /<picture>/);
    assert.match(html, /type="image\/avif"/);
    assert.match(html, /type="image\/webp"/);
  }
});

test('language controls expose flags and accessible names', async () => {
  const html = await read('index.html');
  for (const code of ['IT', 'EN', 'FR']) assert.ok(html.includes(`>${code}<`));
  for (const flag of ['🇮🇹', '🇬🇧', '🇫🇷']) assert.ok(html.includes(flag));
  for (const name of ['Italiano', 'English', 'Français']) assert.ok(html.includes(name));
});

test('pages use bundled fonts instead of Google Fonts CSS', async () => {
  const cssFiles = [...(await read('index.html')).matchAll(/href="([^"]+\.css)"/g)].map(
    ([, href]) => href.replace(/^\//, ''),
  );
  assert.ok(cssFiles.length > 0);
  for (const file of cssFiles) {
    const css = await read(file);
    assert.doesNotMatch(css, /fonts\.googleapis\.com/);
  }
});
```

- [ ] **Step 4: Verify the characterization tests fail for intended gaps**

Run:

```powershell
npm run test:site
```

Expected: existing route test passes; sitemap, menu hero, flags, or Google Fonts checks fail until later tasks.

---

### Task 2: Sitemap and self-hosted fonts

**Files:**
- Modify: `astro.config.mjs`
- Modify: `src/styles/global.css`
- Verify: `public/robots.txt`

**Interfaces:**
- Produces: generated sitemap and bundled Fraunces/Outfit CSS
- Consumes: canonical site URL from Astro config

- [ ] **Step 1: Configure official sitemap integration**

Update `astro.config.mjs`:

```js
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://lanaturasavigliano.it',
  output: 'static',
  integrations: [sitemap()],
});
```

- [ ] **Step 2: Replace remote font import**

At the top of `src/styles/global.css`, replace the Google URL import with:

```css
@import '@fontsource-variable/fraunces/wght.css';
@import '@fontsource-variable/fraunces/wght-italic.css';
@import '@fontsource-variable/outfit/wght.css';
```

Keep:

```css
--font-display: 'Fraunces Variable', Georgia, serif;
--font-body: 'Outfit Variable', system-ui, sans-serif;
```

- [ ] **Step 3: Verify robots points at generated sitemap**

Keep `public/robots.txt` exactly:

```text
User-agent: *
Allow: /

Sitemap: https://lanaturasavigliano.it/sitemap-index.xml
```

- [ ] **Step 4: Run focused checks**

Run:

```powershell
npm run check
npm run build; node --test --test-name-pattern="sitemap|fonts" tests/site-output.test.mjs
```

Expected: Astro check passes; sitemap and font tests pass.

---

### Task 3: Responsive image pipeline

**Files:**
- Create: `src/assets/images/outside.png`
- Create: `src/assets/images/cucina.jpg`
- Create: `src/assets/images/hero-menu.png`
- Create: `src/assets/images/logo.png`
- Modify: `src/components/Hero.astro`
- Modify: `src/components/Cucina.astro`
- Modify: `src/components/Luogo.astro`
- Modify: `src/components/LogoMark.astro`

**Interfaces:**
- Produces: imported `ImageMetadata` handled by Astro `Picture`/`Image`
- Consumes: user-provided source images without altering their visual content

- [ ] **Step 1: Copy source assets into Astro's source tree**

Create `src/assets/images/` and copy the four corresponding files from `public/images/`. Preserve the public originals until `BaseLayout` no longer references their URL.

- [ ] **Step 2: Optimize the home hero**

In `Hero.astro`, import `Picture` and `outside.png`, then replace the raw image with:

```astro
<Picture
  src={outsideImage}
  formats={['avif', 'webp']}
  widths={[640, 960, 1280, 1600]}
  sizes="100vw"
  alt=""
  loading="eager"
  fetchpriority="high"
  decoding="async"
/>
```

Target the generated image with `.hero__media :global(img)` so existing cover/crop/animation behavior remains.

- [ ] **Step 3: Optimize section images**

Use `Picture` in `Cucina.astro` and `Luogo.astro` with:

```astro
formats={['avif', 'webp']}
widths={[480, 720, 960, 1200]}
sizes="(min-width: 800px) 50vw, 100vw"
loading="lazy"
decoding="async"
```

Keep localized alt text. Use the dedicated `cucina.jpg` and the supplied updated `outside.png`.

- [ ] **Step 4: Optimize logo delivery**

Use Astro `Image` in `LogoMark.astro` with widths matching rendered sizes, preserve the circular crop, and keep an empty alt when the adjacent brand text names the link.

- [ ] **Step 5: Run static checks**

Run:

```powershell
npm run check
npm run build
```

Expected: build emits AVIF/WebP variants under `dist/_astro/`; no image import errors.

---

### Task 4: Navbar organization and language flags

**Files:**
- Modify: `src/components/Header.astro`

**Interfaces:**
- Produces: accessible language link model and complete drawer state behavior
- Consumes: current locale, pathname, `localePath()`, and `switchLocalePath()`

- [ ] **Step 1: Add explicit locale presentation data**

Add:

```ts
const localeOptions = {
  it: { flag: '🇮🇹', code: 'IT', name: 'Italiano' },
  en: { flag: '🇬🇧', code: 'EN', name: 'English' },
  fr: { flag: '🇫🇷', code: 'FR', name: 'Français' },
} as const;
```

Render each desktop and panel link as:

```astro
<a
  href={switchLocalePath(pathname, l)}
  hreflang={l}
  lang={l}
  aria-label={localeOptions[l].name}
  aria-current={l === locale ? 'page' : undefined}
>
  <span aria-hidden="true">{localeOptions[l].flag}</span>
  <span>{localeOptions[l].code}</span>
  <span class="sr-only">{localeOptions[l].name}</span>
</a>
```

Add a global or scoped visually-hidden `.sr-only` utility.

- [ ] **Step 2: Keep mobile phone action immediately reachable**

Show `.nav__cta` on mobile with compact spacing; hide its text only if the 320 px layout cannot fit, retaining an accessible name. Desktop keeps the current full label.

- [ ] **Step 3: Complete drawer behavior**

Add outside-click and desktop-resize handling:

```js
document.addEventListener('pointerdown', (event) => {
  if (
    burger.getAttribute('aria-expanded') === 'true' &&
    event.target instanceof Node &&
    !header?.contains(event.target)
  ) {
    setOpen(false);
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 900) setOpen(false);
});
```

Return focus to the burger only when Escape closes an open drawer.

- [ ] **Step 4: Verify output and keyboard behavior**

Run:

```powershell
npm run check
npm run build; node --test --test-name-pattern="language" tests/site-output.test.mjs
```

Expected: checks pass. Manually verify Tab, Enter, Escape, outside click, and 320 px layout.

---

### Task 5: Home layout refinement

**Files:**
- Modify: `src/components/Hero.astro`
- Modify: `src/components/Cucina.astro`
- Modify: `src/components/Luogo.astro`
- Modify: `src/components/LunchOffer.astro`
- Modify: `src/components/Info.astro`
- Modify: `src/styles/global.css`

**Interfaces:**
- Produces: consistent home rhythm using existing CSS tokens and content
- Consumes: existing component order in `LandingPage.astro`

- [ ] **Step 1: Refine shared section rhythm**

Add shared tokens:

```css
--content-measure: 40rem;
--section-gap: clamp(2.5rem, 6vw, 5rem);
```

Use them for text measures and grid gaps. Preserve `scroll-padding-top`, reduced motion, palette, and section order.

- [ ] **Step 2: Improve hero composition**

Limit the text block to `min(42rem, 100%)`, strengthen contrast behind text without darkening the whole photograph, and tune the mobile crop so the subject remains visible. Keep one brand, one headline, one support line, and two CTAs.

- [ ] **Step 3: Make story sections feel intentionally paired**

Keep Cucina text/media and Luogo media/text alternation. Align both to the same media ratio, heading baseline, and content measure. On mobile, keep text before media for Cucina and media before text for Luogo only when it does not delay the section heading for screen-reader users; otherwise use CSS visual ordering while preserving DOM heading-first order.

- [ ] **Step 4: Turn lunch offer into a balanced horizontal feature**

At `min-width: 800px`, use:

```css
.lunch__card {
  max-width: none;
  display: grid;
  grid-template-columns: minmax(12rem, 0.7fr) minmax(0, 1.3fr);
  gap: var(--section-gap);
  align-items: start;
}

.lunch__items {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
```

Keep price, days, included items, and cover note intact.

- [ ] **Step 5: Balance practical info and map**

At `min-width: 900px`, make `.info` a two-column grid with intro/table on the left and the map on the right. Keep the table semantic and stack everything on mobile.

- [ ] **Step 6: Verify home responsiveness**

Run:

```powershell
npm run check
npm run build
```

Manually inspect 320, 375, 768, 1024, and 1440 px widths. Expected: no overlap, horizontal scroll, hidden headings, or CTA collision.

---

### Task 6: Localized menu hero with supplied image

**Files:**
- Create: `src/components/MenuHero.astro`
- Modify: `src/components/MenuPage.astro`
- Modify: `src/pages/menu/index.astro`
- Modify: `src/pages/en/menu/index.astro`
- Modify: `src/pages/fr/menu/index.astro`

**Interfaces:**
- `MenuHero.astro` consumes `{ t: Dictionary }`
- `MenuPage.astro` continues to consume `{ t: Dictionary; locale: Locale }`
- Menu route composition produces one `h1` followed by catalog `h2` headings

- [ ] **Step 1: Write the menu hero component**

Create `MenuHero.astro` with:

```astro
---
import { Picture } from 'astro:assets';
import heroMenuImage from '../assets/images/hero-menu.png';
import type { Dictionary } from '../i18n';

interface Props {
  t: Dictionary;
}

const { t } = Astro.props;
---

<section class="menu-hero" aria-labelledby="menu-title">
  <div class="menu-hero__media" aria-hidden="true">
    <Picture
      src={heroMenuImage}
      formats={['avif', 'webp']}
      widths={[640, 960, 1280, 1600]}
      sizes="100vw"
      alt=""
      loading="eager"
      fetchpriority="high"
      decoding="async"
    />
  </div>
  <div class="menu-hero__veil"></div>
  <div class="menu-hero__content">
    <span class="section__eyebrow">{t.nav.menu}</span>
    <h1 id="menu-title">{t.menu.title}</h1>
    <p>{t.menu.intro}</p>
  </div>
</section>
```

Style it at roughly `55svh`, with a safe minimum height, bottom-aligned copy, dark left/bottom overlay, and `object-position` tuned to the supplied pasta photograph. Use `:global(img)` for the generated picture image.

- [ ] **Step 2: Remove duplicated heading from catalog**

Delete `.menu__header`, `h1`, and intro from `MenuPage.astro`. Change the outer section to:

```astro
<section class="section menu-page" aria-label={t.menu.title}>
```

Remove the old header-offset padding; retain catalog, categories, prices, notes, and responsive columns.

- [ ] **Step 3: Compose the hero in each menu route**

Import `MenuHero` and render:

```astro
<main id="main">
  <MenuHero t={t} />
  <MenuPage t={t} locale={locale} />
</main>
```

Apply identically to IT, EN, and FR routes.

- [ ] **Step 4: Verify semantics and generated media**

Run:

```powershell
npm run check
npm run build; node --test --test-name-pattern="menu routes" tests/site-output.test.mjs
```

Expected: all menu pages contain one `h1`, hero AVIF/WebP sources, localized title/intro, and unchanged catalog content.

---

### Task 7: Structured-data consistency and social image

**Files:**
- Create: `src/data/business.ts`
- Modify: `src/i18n/it.ts`
- Modify: `src/i18n/en.ts`
- Modify: `src/i18n/fr.ts`
- Modify: `src/layouts/BaseLayout.astro`

**Interfaces:**
- Produces: `BUSINESS_HOURS` shared by localized visible copy and JSON-LD
- Produces: optimized 1200×630 Open Graph image
- Consumes: canonical site URL and imported source image

- [ ] **Step 1: Centralize opening-hour facts**

Create:

```ts
export const BUSINESS_HOURS = {
  lunch: { opens: '12:00', closes: '15:00' },
  dinner: { opens: '19:30', closesDisplay: '24:00', closesSchema: '00:00' },
  dinnerClosedDay: 'Tuesday',
} as const;
```

Use these values when composing each locale's existing `info.hours` string. Keep translated labels unchanged.

- [ ] **Step 2: Generate schema from shared facts**

Import `BUSINESS_HOURS` in `BaseLayout.astro` and build `openingHoursSpecification` from it. Keep Tuesday lunch open and omit Tuesday dinner. Preserve existing Restaurant, WebSite, WebPage, and Breadcrumb nodes.

- [ ] **Step 3: Generate an optimized social image**

Use `getImage()` with the imported outside source:

```ts
const ogImage = await getImage({
  src: outsideImage,
  width: 1200,
  height: 630,
  fit: 'cover',
  format: 'jpeg',
  quality: 82,
});
const ogImageUrl = new URL(ogImage.src, siteOrigin).href;
```

Add:

```astro
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/jpeg" />
```

Keep Twitter image pointed at the same optimized absolute URL.

- [ ] **Step 4: Add structured-data regression assertions**

Extend `tests/site-output.test.mjs`:

```js
test('structured data and social image remain complete', async () => {
  const html = await read('index.html');
  assert.match(html, /"@type":"Restaurant"/);
  assert.match(html, /"opens":"12:00"/);
  assert.match(html, /"closes":"00:00"/);
  assert.match(html, /property="og:image:width" content="1200"/);
  assert.match(html, /property="og:image:height" content="630"/);
  assert.doesNotMatch(html, /"sameAs":\[[^\]]*""/);
});
```

- [ ] **Step 5: Run final automated verification**

Run:

```powershell
npm run check
npm run test:site
```

Expected: all checks pass and six routes plus sitemap are generated.

- [ ] **Step 6: Run final visual and performance verification**

Preview the production build and inspect:

```powershell
npm run preview
```

Check home and menu in all locales at mobile and desktop widths. Run Lighthouse against `/` and `/menu/`; target Performance, SEO, and Accessibility scores of at least 95 under a stable local audit. Record any third-party map or analytics variance instead of hiding it.
