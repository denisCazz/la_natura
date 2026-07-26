import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';

const dist = join(import.meta.dirname, '..', 'dist');

async function read(relativePath) {
  return readFile(join(dist, relativePath), 'utf8');
}

const contentRoutes = [
  '/',
  '/menu/',
  '/privacy/',
  '/en/',
  '/en/menu/',
  '/en/privacy/',
  '/fr/',
  '/fr/menu/',
  '/fr/privacy/',
];

test('sitemap includes every public content route', async () => {
  const sitemapIndex = await read('sitemap-index.xml');
  assert.match(sitemapIndex, /sitemap-0\.xml/);

  const sitemap = await read('sitemap-0.xml');
  for (const path of contentRoutes) {
    assert.ok(sitemap.includes(`https://lanaturasavigliano.it${path}`), path);
  }
});

test('sitemap includes hreflang alternates for localized pages', async () => {
  const sitemap = await read('sitemap-0.xml');
  assert.match(sitemap, /xhtml:link/);
  assert.match(sitemap, /hreflang="it"/);
  assert.match(sitemap, /hreflang="en"/);
  assert.match(sitemap, /hreflang="fr"/);
  assert.match(sitemap, /hreflang="x-default"/);
});

test('robots.txt points at the sitemap', async () => {
  const robots = await readFile(
    join(import.meta.dirname, '..', 'public', 'robots.txt'),
    'utf8',
  );
  assert.match(robots, /Sitemap:\s*https:\/\/lanaturasavigliano\.it\/sitemap-index\.xml/);
});
