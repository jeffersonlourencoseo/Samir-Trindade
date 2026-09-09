import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.planodesaudenorio.com.br',
  output: 'static',
  adapter: vercel(),
  integrations: [tailwind(), sitemap({
    filter: (page) => !page.includes('/404'),
    lastmod: new Date(),
    changefreq: 'weekly',
    priority: 0.7,
  })],
  build: {
    inlineStylesheets: 'always',
  },
});
