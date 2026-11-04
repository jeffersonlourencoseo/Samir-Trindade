# Validação online - Samir Trindade (planodesaudenorio.com.br)

Data da consulta: 03/11/2026. Site auditado: https://www.planodesaudenorio.com.br/ (26 URLs no sitemap).
Cliente real (corretor de planos de saúde). Nenhum código foi alterado, nada foi publicado.
Status da etapa: **NÃO CONCLUÍDA** (há itens críticos e altos reprovados).

Não executado: GTmetrix (exige login/limite, ficou sem print), Rich Results Test e validator.schema.org (o schema foi lido direto do HTML, validação manual), teste de eventos no GA4 (GA4 ainda não instalado), `/geo` e `/seo audit` completos.

## Notas de desempenho (PageSpeed Insights, rodado no navegador em 03/11/2026, home)
| | Desempenho | Acessibilidade | Boas práticas | SEO |
|---|---|---|---|---|
| Celular | 99 | 93 | 100 | 100 |
| Computador | 100 | 93 | 100 | 100 |

Celular: FCP 1,7 s, LCP 1,7 s, TBT 0 ms, CLS 0,01, SI 1,7 s. Sem dado de campo (CrUX "Nenhum dado", site novo), então INP real não medido.
Falhas de acessibilidade (nota 93, passa do mínimo 90): contraste insuficiente e títulos fora de ordem sequencial (h2 seguido de h4 no rodapé). O PSI também apontou "llms.txt não segue as recomendações".
O `pagespeed.json` antigo do repo foi ignorado.

## Problemas priorizados

### CRÍTICO
1. **og-image.jpg não existe (404).** Todas as páginas apontam `og:image` e `twitter:image` para `/og-image.jpg`, e o schema (logo da Organization e do publisher dos Articles) usa a mesma URL. Compartilhamento sem imagem e logo inválido no schema. Correção: criar `public/og-image.jpg` (ou .png) 1200x630 com a marca do Samir e conferir que responde 200.
2. **Nenhum evento de conversão.** Nenhum link de WhatsApp (7 só na home, até 20 nos posts) tem `data-evento="clique_whatsapp"` nem `data-local`; o `tel:` não tem `data-evento="clique_telefone"`; o formulário não tem `data-evento-envio`. GA4 também não está no HTML. Correção: adicionar os atributos nos componentes (botões, flutuante, header, footer, posts), instalar GA4 e testar em Tempo real.
3. **Mensagem do WhatsApp fora do padrão.** Todos os links abrem com "Olá, vi seu site no google e gostaria de mais informações!". O método pede "Olá, gostaria de saber mais informações sobre [nicho]." Correção sugerida (confirmar com o Jefferson): "Olá, gostaria de saber mais informações sobre plano de saúde." Mudar em `src/data/config.ts` (whatsappLink e social.whatsapp) e conferir links hardcoded nos .md dos posts.

### ALTO
4. **Sitemap fora do padrão.** `sitemap-0.xml` traz `priority` 0.7 e `changefreq` weekly em todas as URLs, e `lastmod` igual para todas (data do build, 22/10/2026), não real. Correção: tirar `changefreq`/`priority` do `astro.config.mjs` e usar lastmod por página (dateModified dos posts).
5. **`<link rel="sitemap" href="/sitemap.xml">` e `favicon.svg` quebrados (404).** O head aponta para dois arquivos que não existem. Correção: apontar para `/sitemap-index.xml` e remover/criar o favicon.svg.
6. **Sem cabeçalhos de segurança.** Não há `vercel.json` no repo; a resposta só tem HSTS. Faltam X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy (e CSP se der). Correção: criar `vercel.json` com os headers.
7. **Schema fora de `@graph` e com referência quebrada.** São 3 a 5 blocos JSON-LD soltos por página. Os Service usam `provider: {"@id":"#local-business"}` mas o LocalBusiness não tem `@id`. A home usa `LocalBusiness` genérico (melhor `InsuranceAgency`/`FinancialService`). O geo (-22.9040656, -43.1782219) difere do GEOSETTER (-22.90398157, -43.17894073). `priceRange: "$$"` sem base. `sameAs` da Organization contém link wa.me (não é perfil). O Article usa imagem do Supabase e logo 404. Breadcrumb aponta URLs sem barra final (`/contato`) diferentes das canônicas com barra. Correção: unificar em um `@graph` com `@id`, dados do config, coordenadas alinhadas, URLs com barra.
8. **Canibalização (3 posts para Unimed preço + página Unimed).** `plano-de-saude-unimed-preco`, `preco-plano-de-saude-unimed` e `unimed-plano-de-saude-valor` disputam "valor/preço plano de saúde Unimed", além de `/servicos/unimed-rj/`. Alvos do GMN: "unimed plano de saude" e "valor de um plano de saude unimed". Correção: UMA página por palavra (propor: serviço = "unimed plano de saude", 1 post = "valor de um plano de saúde Unimed"), consolidar os outros com 301 e `redirects` no Astro. Precisa do ok do Jefferson/cliente (mexe em títulos de posts e URLs indexadas).
9. **Cobertura das palavras-alvo do GMN incompleta.** Existem páginas para Unimed, Amil, Bradesco, tabela de preços e carência (post). Não existe página própria para "plano empresarial de saúde" (só o post "como escolher plano saúde empresa", title de 111 caracteres) nem para "valor do plano de saúde Bradesco" (a página do Bradesco não trata de valor). Correção: criar/ajustar páginas e posts conforme o mapa (palavra no title, H1, slug, meta, 100 primeiras palavras e alt).
10. **Blog sem ligação com os serviços.** 9 dos 10 posts não têm link para `/servicos/*` (só o de tabela de preços linka). Posts de Unimed deveriam apontar para `/servicos/unimed-rj/`. Páginas de serviço recebem só 4 links internos (menu/listas); três posts de Unimed recebem apenas 2 links internos (mínimo é 3).
11. **Posts sem bio do autor.** O byline é "Por Samir Trindade" com datas visíveis (ok), mas não há bloco de bio/credencial. Correção: caixa de autor com nome, bio curta e ANS.
12. **Imagens do blog hospedadas fora e em JPG.** Capas e imagens internas vêm do Supabase (`btgaizddojvvnbwxdags.supabase.co`) e Unsplash, em JPG, sem width/height nas imagens internas (posts de carência e tabela de preços). Dependência de terceiros, tamanho desconhecido, risco de quebrar. Correção: baixar para `src/assets`, usar `<Image>` do Astro (WebP/AVIF) com width/height; conferir alts acima de 125 caracteres no post de carência.
13. **Title/meta fora da faixa.** Title 50-60: home 61; blog/sobre/contato/termos/privacidade/serviços 21-40 (curtos); posts 91-114 (longos demais, serão cortados); serviços 36-53. Meta 150-160: home 179; posts 134-216; vários serviços 140-167. Em posts indexados, mudar título só com ok do Jefferson. Corrigir primeiro institucionais e serviços.

### MÉDIO
14. **Heading pula nível em todas as páginas.** Rodapé usa h4 logo após h2 ("Navegação", "Legal", "Contato"); é a falha de acessibilidade do PSI. Correção: h3 ou `<p>` estilizado.
15. **Contraste insuficiente** (PSI). Provável `text-accent` (#b45309) sobre fundo escuro e `text-gray-400/stone-500` sobre verde. Corrigir para subir de 93.
16. **llms.txt.** Abre e tem NAP correto, mas os links são relativos (`/sobre`), o texto é fixo (fora do config), a data "junho de 2026" está desatualizada, tem seção "Depoimentos Reais" e números ("2.998 vidas atendidas", "28% de redução") que precisam de confirmação com o cliente (afirmação comercial, não alterei), e cita "+10 operadoras" listando 9. Correção: URLs absolutas, remover o que não for comprovável, atualizar data.
17. **robots.txt sem robôs de IA explícitos.** Só `User-agent: *` + `Allow: /` + Sitemap do domínio final (correto e já libera tudo). O método pede liberar explicitamente GPTBot, ClaudeBot, PerplexityBot, Google-Extended etc.
18. **Sem schema de Person** para o corretor e nada além de LocalBusiness+Organization+Breadcrumb na home/institucionais. Serviços e posts têm FAQPage/Service/Article (ok).
19. **Formulário não testado.** Usa Formspree (`mnjrpowy`), 5 labels para 5 campos (ok). Não submeti (regra de não enviar formulário). Conferir página de obrigado e `data-evento-envio`.
20. **Serviços parecem template.** As 9 páginas (518-562 palavras) têm a mesma estrutura (h1-h2-h2-h2-h3-h4). Aplicar o teste da troca (trocar o nome da operadora e ver se o texto ainda faz sentido) e medir texto único antes de crescer. Respostas diretas de 40-60 palavras no início de cada seção não foram verificadas uma a uma.
21. **Conteúdo magro frente ao top 5.** Home ~970 palavras vs ~6.700-7.000 de concorrentes grandes.

### BAIXO
22. 404 devolve texto puro (`text/plain`), sem página 404 personalizada com links de volta.
23. HTTP e apex redirecionam com **308** (não 301), em dois saltos (http -> https apex -> https www). Funciona e é permanente; só garantir que o Search Console use a versão www.
24. Emojis (🛡️🏥🏢📍) nos cards da home são lidos por leitores de tela; trocar por SVG com `aria-hidden`.
25. Arquivos de contexto do repo (`auditoria-seo-ai.md`, `diagnostico-seo.txt`, `pagespeed.json`) citam o domínio antigo `samirtrindade.com.br` e estão desatualizados; não confiar neles.

## O que já está bom (verificado)
- SSL ativo, HSTS presente, HTTP -> HTTPS, uma só versão (www), 404 real para rota inexistente.
- Páginas obrigatórias existem: Home, Sobre (história, números, missão/visão/valores), Contato (NAP completo, e-mail, formulário com labels, horário), Serviços (índice + 9 operadoras), Blog (10 posts + índice), Privacidade e Termos. Contato sem mapa embutido (opcional).
- 1 H1 por página nas 26 URLs; canonical absoluto com barra final em todas; Open Graph (7 tags) e Twitter Card (4) em todas (só a imagem falta).
- Nenhum `href="#"`; as 26 URLs dão 200, estão no sitemap e a 1 clique da home (menu + footer).
- NAP idêntico em contato, footer, home e schema: Av. Rio Branco 108, 21º andar, Centro, RJ, 20040-001; (21) 96462-5163; ANS 73719199730; e-mail do config.
- Posts com datas de publicação e atualização em `<time>`, autor nomeado, 1.750 a 3.200 palavras; FAQ com schema nos serviços.
- Menu mobile: abre como painel lateral, trava scroll, fecha com Esc/clique/resize, `aria-expanded` ok (lido no `menu.js`; não testei em dispositivo).
- Desempenho 99/100 no PSI; LCP 1,7 s, CLS 0,01, TBT 0 ms.
- Imagem do Sobre em WebP com width/height, `loading="eager"` e `fetchpriority="high"`.
- Sem Review/aggregateRating nem HowTo no schema.
- Todos os campos do formulário com `label`; link `tel:` presente.

## Comparação com o top 5 (03/11/2026, SERP sem personalização, patrocinados ignorados)
**"plano de saúde Rio de Janeiro"**: assim.com.br, planosauderiodejaneiro.com.br, escolha.qualicorp.com.br, rjplanodesaude.com.br, planodesaudesulamericarj.com.br (mais pacote local com Unimed Rio, Mega Plano e Corretores de Plano de Saúde). O site do Samir não aparece.
**"corretor de plano de saúde Rio de Janeiro"**: planosauderj.com, Instagram @corretores_rj, virtuacorretora.com.br, levesaude.com.br, metacoresaude.com (depois: elianesilveirasaudeseguros, oHub, Gol Corretora, Qualicorp). Samir também fora.

Amostra de concorrentes (HTML da home / sitemap, via curl):
| Site | Palavras na home | URLs no sitemap | Schema |
|---|---|---|---|
| planosauderiodejaneiro.com.br | ~6.990 | 129 | sim |
| rjplanodesaude.com.br | ~750 | 40 | sim (3) |
| planosauderj.com | ~6.650 | 5 | sim (1) |
| virtuacorretora.com.br | ~6.980 | 11 sitemaps | sim (3) |
| **planodesaudenorio.com.br** | ~970 | 26 | sim (3 blocos, sem @graph) |

Leitura: o site ganha em velocidade, SSL, NAP limpo e blog com datas/autor. Perde em volume e profundidade de conteúdo na home e nos serviços, e em número de páginas. Backlinks dos concorrentes não medidos nesta rodada; medir antes da etapa 8. O pacote local do Google é dominado por perfis com avaliações (4,9 com 52; 5,0 com 26); o GMN do Samir precisa de avaliações e dados idênticos ao NAP do site.

## Próximos passos sugeridos (ordem)
1. Criar og-image 1200x630; corrigir `<link rel="sitemap">` e favicon.svg.
2. Mensagem do WhatsApp + atributos `data-evento`/`data-local` + GA4 (com ok do cliente e login do Jefferson).
3. `vercel.json` com cabeçalhos; sitemap sem priority/changefreq e lastmod real; robots com robôs de IA; llms.txt com URLs absolutas.
4. Schema único em `@graph` com `@id` e dados do config.
5. Resolver canibalização Unimed (com 301) e criar páginas "plano empresarial" e "valor Bradesco".
6. Links post -> serviço, caixa de autor, imagens locais em WebP.
7. Rodar GTmetrix, Rich Results Test e GA4 Tempo real após as correções e reauditar.

Lembrete: só quando a validação ficar toda verde, avisar "Site pronto: subir no Google Search Console e no Google Analytics, com os eventos do WhatsApp. Posso fazer?". Ainda NÃO é a hora. A taxa real de lead só aparece 1-2 meses depois de posicionado.
