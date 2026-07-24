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
