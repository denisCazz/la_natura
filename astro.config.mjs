import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://lanaturasavigliano.it',
  output: 'static',
  integrations: [sitemap()],
});
