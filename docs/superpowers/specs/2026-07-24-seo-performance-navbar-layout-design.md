# SEO, Performance, Navbar and Layout — Design Spec

**Date:** 2026-07-24  
**Project:** Agriturismo La Natura  
**Stack:** Astro 7 static site

## Goal

Improve search visibility, Core Web Vitals, navigation, and page composition while preserving the current rural-elegant identity. Keep the existing localized landing and menu routes, with phone and WhatsApp reservations as the primary conversion goals.

## Scope

### In

- Responsive section navigation in the fixed header
- Language controls with Italian, British, and French flags, language codes, and accessible names
- Strong refinement of spacing, grids, typography, CTA hierarchy, and practical-information layout
- Audit and correction of existing local SEO metadata and structured data
- Sitemap generation aligned with the existing robots directive
- Responsive optimized images and self-hosted fonts
- A compact visual hero for every localized menu route using the supplied `hero_menu.png`
- Accessibility, build, responsive, and Lighthouse verification

### Out

- New content routes beyond the existing landing and menu pages, blog, CMS, booking engine, or backend
- New editorial sections such as FAQs
- Full visual rebrand
- Invented reviews, ratings, opening hours, coordinates, or other business facts

## Information Architecture

The route structure remains:

```text
/          Italian landing
/menu/     Italian menu
/en/       English landing
/en/menu/  English menu
/fr/       French landing
/fr/menu/  French menu
```

Each landing route keeps:

1. Header
2. Hero
3. Cucina
4. Il luogo
5. Info
6. Footer

The existing content sections keep stable fragment IDs shared by all locales:

- `#cucina`
- `#luogo`
- `#info`

Anchor targets use scroll offset so the fixed header does not cover headings.

## Header and Navigation

### Desktop

The header preserves:

1. Brand/logo
2. Home and Menu links
3. Section links: Cucina, Il luogo, Info
4. Language switcher
5. Phone CTA

Its locale control is upgraded to show a country flag, language code, and accessible language name:

- `🇮🇹 IT` — Italiano
- `🇬🇧 EN` — English
- `🇫🇷 FR` — Français

Flags are decorative. Screen readers receive localized language names. Text codes remain visible because emoji rendering varies by operating system and flags alone are ambiguous.

### Mobile

The compact header contains the logo, a phone CTA, and a menu button. The existing expanded panel keeps Home, Menu, section links, all language choices, and WhatsApp. The existing floating WhatsApp action remains available without adding another permanently visible duplicate CTA.

Menu behavior:

- Accurate `aria-expanded` and `aria-controls`
- Keyboard-operable controls
- Escape closes the menu
- Selecting a link closes the menu
- Clicking outside closes the menu
- Focus remains visible

The existing framework-free script is retained and completed with outside-click closure. No client UI framework is introduced.

## Layout Refinement

The current palette, typography direction, full-bleed hero, and alternating image/text story remain.

Refinements:

- Use one consistent content width and readable text measure
- Normalize section spacing with fluid tokens
- Preserve alternating desktop grids while keeping mobile reading order logical
- Strengthen heading scale and spacing hierarchy
- Keep CTA colors and labels consistent across header and hero
- Improve practical-information grouping and scanning
- Prevent header, sticky WhatsApp, and content overlap on small screens
- Keep decorative effects restrained and preserve reduced-motion behavior

## Menu Hero

Each localized menu route gains a compact, full-width hero above the catalog. It uses the supplied food photograph, a dark directional overlay, the localized `t.menu.title`, and `t.menu.intro`. The image remains decorative because the same meaning is carried by visible text.

- Height: approximately `55svh`, smaller than the home hero
- Minimum height preserves readable title placement on short screens
- Crop keeps the foreground pasta and background dishes visible
- Header remains solid over menu routes
- Existing menu catalog starts immediately after the hero without repeating its title or introduction
- Hero media uses the same responsive image pipeline, explicit dimensions, and priority loading as the home hero

## SEO

Existing localized titles, descriptions, canonical links, `hreflang`, social metadata, favicon links, and JSON-LD graph remain. Work focuses on correctness and remaining gaps.

### Metadata

- Preserve Open Graph URL, site name, alternate locales, and Twitter summary-large-image metadata
- Add Open Graph image width, height, and MIME type for the optimized social asset
- Verify each landing and menu route has a locale-specific title, description, canonical URL, and alternates
- Preserve theme color, favicon, manifest, and absolute social image URLs

### Structured Data

Audit the existing `Restaurant`, `WebSite`, `WebPage`, and menu breadcrumb graph. Keep verified data:

- Name, canonical URL, telephone, address
- Cuisine and price range
- Images
- Existing `SITE.geo` coordinates and Google Maps URL
- Existing Instagram URL in `sameAs`
- Existing localized menu routes
- Existing lunch/dinner times and Tuesday-evening closure

Centralize opening-hour facts so visible copy and JSON-LD cannot drift. The Facebook URL is currently empty, so it remains omitted. No review score, rating count, or unverified business data is added.

### Discovery

- Generate `sitemap.xml` for all six landing/menu routes with the official Astro sitemap integration
- Preserve the existing static `robots.txt` and verify its absolute sitemap URL
- Preserve correct `lang`, canonical, alternate locale, semantic landmark, and heading relationships

## Performance

### Images

Move content images into Astro's image pipeline where practical and render responsive AVIF/WebP output with fallback, dimensions, and `srcset`.

- Hero image: eager, high fetch priority, explicit dimensions/aspect ratio
- Below-fold images: lazy loaded and asynchronously decoded
- Correct responsive sizes avoid downloading desktop assets on phones
- Dimensions prevent cumulative layout shift
- Existing source assets are imported at build time to prevent silent production 404s

The same source may still appear in hero and place sections, but generated variants match each use.

### Fonts and External Content

- Remove the render-blocking Google Fonts CSS `@import`
- Self-host only required Fraunces and Outfit weights through Fontsource packages
- Use `font-display: swap`
- Retain fallback font stacks
- Keep the Google Maps iframe lazy loaded

### Runtime

- Continue static Astro output
- Add no hydration framework
- Restrict JavaScript to header interaction
- Keep motion on compositor-friendly properties and respect `prefers-reduced-motion`

## Component Boundaries

- `BaseLayout.astro`: global metadata, canonical/hreflang, social metadata, structured data, icons
- `Header.astro`: desktop/mobile navigation, language controls, header interaction
- `LandingPage.astro`: section composition only
- `Hero.astro`: prioritized hero image and conversion actions
- `MenuHero.astro`: compact localized hero using the supplied menu photograph
- `MenuPage.astro`: menu catalog and notes, without duplicated page heading
- `Cucina.astro`, `Luogo.astro`, `Info.astro`: stable section IDs and responsive media
- `global.css`: shared design tokens, typography loading, global focus/anchor behavior
- `astro.config.mjs`: official sitemap integration
- `public/robots.txt`: crawl directives and absolute sitemap URL

Localized navigation labels remain in the typed i18n dictionaries.

## Error Handling

This is a static site with no application API or runtime data state.

- Imported assets fail the build when missing
- Menu state resets after navigation and closes safely on Escape/outside click
- External links retain safe `rel` attributes
- Unsupported image formats receive a browser-compatible fallback
- Missing optional verified business data is omitted from JSON-LD rather than guessed

## Verification

Automated checks:

- `astro check`
- Production static build
- Confirm generated Italian, English, and French pages
- Validate sitemap and robots output
- Parse and inspect JSON-LD

Manual checks:

- Navbar at 320 px, common mobile widths, tablet, and desktop
- Keyboard navigation, focus visibility, Escape, outside click
- Section anchors and fixed-header offset
- Locale flags, codes, accessible names, and route changes
- Phone, WhatsApp, social, and Maps links
- Hero loading, below-fold lazy loading, image dimensions, and layout shift
- Reduced-motion behavior

Run Lighthouse against the built Italian page. Target at least 95 for Performance, SEO, and Accessibility under a stable local audit. External map/network behavior may vary and is recorded rather than hidden.

## Success Criteria

- Desktop and mobile navigation expose all sections without crowding
- Language choices are immediately recognizable and accessible
- Visitor reaches phone or WhatsApp quickly
- No missing image requests
- Responsive media substantially reduces transferred image bytes
- No render-blocking external font stylesheet
- All locale routes have correct canonical, alternate, social, and structured metadata
- Sitemap and robots files are available in production output
- Static build and Astro checks pass
- Visual identity remains recognizably the current La Natura design
