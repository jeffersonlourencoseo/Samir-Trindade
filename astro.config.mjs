import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/static';
import fs from 'node:fs';
import path from 'node:path';
import { SITE_CONFIG, SITE_UPDATED } from './src/data/config.ts';

// --- lastmod real por página -------------------------------------------------
// Posts e serviços: updatedDate (ou publishDate) do frontmatter.
// Páginas fixas: data de atualização do config (SITE_UPDATED).
function lerDatas(pasta, prefixo) {
  const dir = path.resolve('./src/content', pasta);
  const mapa = {};
  for (const arquivo of fs.readdirSync(dir).filter((f) => f.endsWith('.md'))) {
    const txt = fs.readFileSync(path.join(dir, arquivo), 'utf8').replace(/\r/g, '');
    const fm = txt.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
    const upd = fm.match(/^updatedDate:\s*(\S+)/m)?.[1];
    const pub = fm.match(/^publishDate:\s*(\S+)/m)?.[1];
    const data = upd ?? pub;
    if (data) mapa[`${SITE_CONFIG.domain}/${prefixo}/${arquivo.replace(/\.md$/, '')}/`] = new Date(data).toISOString();
  }
  return mapa;
}
const lastmodMap = { ...lerDatas('blog', 'blog'), ...lerDatas('servicos', 'servicos') };
const maisRecente = (prefixo) =>
  Object.entries(lastmodMap)
    .filter(([u]) => u.includes(`/${prefixo}/`))
    .map(([, d]) => d)
    .sort()
    .pop();
lastmodMap[`${SITE_CONFIG.domain}/blog/`] = maisRecente('blog');
lastmodMap[`${SITE_CONFIG.domain}/servicos/`] = maisRecente('servicos');

// Posts de Unimed consolidados: 301 para o post que ficou
const redirecionamentos = {
  '/blog/plano-de-saude-unimed-preco': '/blog/valor-de-um-plano-de-saude-unimed/',
  '/blog/preco-plano-de-saude-unimed': '/blog/valor-de-um-plano-de-saude-unimed/',
  '/blog/unimed-plano-de-saude-valor': '/blog/valor-de-um-plano-de-saude-unimed/',
};

// Links de WhatsApp e telefone escritos em markdown (posts) ganham target, rel e os
// atributos de evento do GA4, para ficarem iguais aos botões dos componentes.
function rehypeCtaLinks() {
  const visitar = (no) => {
    if (no.type === 'element' && no.tagName === 'a' && typeof no.properties?.href === 'string') {
      const href = no.properties.href;
      if (href.includes('wa.me')) {
        no.properties.target = '_blank';
        no.properties.rel = 'noopener';
        no.properties['data-evento'] = 'clique_whatsapp';
        no.properties['data-local'] = 'post-texto';
      } else if (href.startsWith('tel:')) {
        no.properties['data-evento'] = 'clique_telefone';
        no.properties['data-local'] = 'post-texto';
      }
    }
    (no.children ?? []).forEach(visitar);
  };
  return (arvore) => visitar(arvore);
}

// https://astro.build/config
export default defineConfig({
  site: SITE_CONFIG.domain,
  output: 'static',
  trailingSlash: 'always',
  adapter: vercel(),
  redirects: Object.fromEntries(
    Object.entries(redirecionamentos).flatMap(([de, para]) => [
      [de + '/', { status: 301, destination: para }],
    ])
  ),
  integrations: [
    tailwind(),
    sitemap({
      // privacidade e termos são noindex; 404 nunca entra
      filter: (page) => !/\/(404|privacidade|termos)\/?$/.test(page),
      serialize(item) {
        item.lastmod = lastmodMap[item.url] ?? new Date(SITE_UPDATED).toISOString();
        return item;
      },
    }),
  ],
  markdown: {
    rehypePlugins: [rehypeCtaLinks],
  },
  build: {
    inlineStylesheets: 'always',
  },
});
