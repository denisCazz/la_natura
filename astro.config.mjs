import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const SITE_URL = 'https://lanaturasavigliano.it';

/** @param {string} url */
function pageKind(url) {
  const path = url.replace(SITE_URL, '');
  if (path === '/' || path === '/en/' || path === '/fr/') return 'home';
  if (path.endsWith('/menu/')) return 'menu';
  if (path.endsWith('/privacy/')) return 'privacy';
  return 'other';
}

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      i18n: {
        defaultLocale: 'it',
        locales: {
          it: 'it',
          en: 'en',
          fr: 'fr',
        },
      },
      serialize(item) {
        const kind = pageKind(item.url);
        if (kind === 'home') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (kind === 'menu') {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (kind === 'privacy') {
          item.priority = 0.3;
          item.changefreq = 'yearly';
        } else {
          item.priority = 0.5;
          item.changefreq = 'monthly';
        }

        // Match HTML <link hreflang="x-default"> → Italian canonical
        const links = item.links ?? [];
        const itAlternate = links.find((link) => link.lang === 'it');
        if (itAlternate && !links.some((link) => link.lang === 'x-default')) {
          item.links = [...links, { url: itAlternate.url, lang: 'x-default' }];
        }

        return item;
      },
    }),
  ],
});
