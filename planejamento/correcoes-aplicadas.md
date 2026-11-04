# Correções aplicadas (03/11/2026)

Sem push, sem publicação. Build (`npm run build`) passa, 27 páginas. Verificação automática no HTML gerado: title 50-60, meta 150-160 em todas as páginas indexáveis, 1 H1, canonical com barra, JSON-LD válido em @graph, imagens com width/height/alt, sem pulo de heading, links internos sem quebra e com barra final.

## Críticos
1. `public/og-image.jpg` 1200x630 (foto real do Samir + nome + WhatsApp, cores do site). og:image, twitter:image e logo do schema apontam para ele.
2. Eventos GA4: `data-evento`/`data-local` em todo WhatsApp (header, hero, cta-meio, cta-final, servico, post-lateral, post-texto, contato, footer, flutuante), `clique_telefone` nos tel:, `data-evento-envio` no formulário. Links de WhatsApp dentro do markdown dos posts ganham os atributos por plugin rehype. Script de eventos no Layout; snippet do GA4 só renderiza com `ga4Id` preenchido (hoje vazio).
3. Mensagem: "Olá, gostaria de saber mais informações sobre plano de saúde." montada em `config.ts` (`whatsappUrl`), inclusive nos links dentro dos posts.

## Altos
4. Sitemap sem priority/changefreq; lastmod por página (updatedDate/publishDate do conteúdo); privacidade, termos e 404 fora. `<link rel="sitemap">` aponta para `/sitemap-index.xml`; `favicon.svg` criado.
5. `vercel.json`: X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, HSTS, CSP (GA, fontes Google, mapa, Formspree), cache de `/_astro`, redirects 301 (posts Unimed e apex para www).
6. Schema em um @graph com @id: InsuranceAgency+LocalBusiness (geo do GEOSETTER, areaServed Rio + cidades da Baixada), Person (Samir), WebSite, WebPage/ContactPage/AboutPage, BreadcrumbList (barra final), Service, BlogPosting, FAQPage. Sem Review, sem HowTo, sem priceRange.
7. Canibalização Unimed: a página `/servicos/unimed-rj/` fica como principal ("unimed plano de saúde"). Os 3 posts viraram UM: `/blog/valor-de-um-plano-de-saude-unimed/` (base do post "valor", mais seção de como pagar menos). `plano-de-saude-unimed-preco`, `preco-plano-de-saude-unimed` e `unimed-plano-de-saude-valor` redirecionam 301 (astro `redirects` + `vercel.json`). Links internos e sitemap atualizados.
8. Páginas novas: `/servicos/plano-empresarial-de-saude/` e `/servicos/valor-plano-de-saude-bradesco/` (resposta direta por seção, FAQ, sem preço/prazo/estatística; Bradesco explica o que muda o preço e manda cotar pelo WhatsApp). Escritas por mim seguindo as regras do redator-paginas (não acionei o agente).
9. Links internos: todo post tem `servicos` (1-2) com caixa "Páginas relacionadas" e links no texto (a operadora linka só na 1ª ocorrência, para a página certa); cada serviço lista posts relacionados; home destaca as páginas novas; rodapé tem "Mais procurados".
10. Posts: caixa de autor (config), capas e imagens do Supabase/Unsplash baixadas para `src/assets/blog` em WebP, srcset, width/height, alt de 10-125 caracteres; créditos Pexels mantidos.
11. Title/meta nas faixas em todas as páginas (posts com `seoTitle` curto para a tag title; H1 preservado).

## Médios/baixos
12. Contraste: novo token `gold` para texto em fundo escuro, `primary` escurecido (#047857), cinzas claros trocados; rodapé sem h4 (usa p); lista de breadcrumb válida.
13. llms.txt gerado por endpoint (`src/pages/llms.txt.ts`): URLs absolutas, data, sem "depoimentos reais" nem "2.998 vidas".
14. robots.txt com Allow explícito para os robôs de IA e a linha Sitemap.
15. 404 estilizada.
16. As 9 páginas de serviço foram reescritas com texto, perguntas e checklist próprios de cada operadora.

## Regras do Jefferson aplicadas depois
- Sem preços/valores: removida a tabela de R$ do post MEI; meta do post de tabela de preços sem número. (O teto de 5,11% da ANS continua no corpo do post de tabela: é regra, não preço; tirar se ele quiser.)
- Cidades da Baixada permitidas (Duque de Caxias, Nova Iguaçu, São João de Meriti, Belford Roxo, Nilópolis, Mesquita) no schema; removidos Niterói, São Gonçalo e "Região Metropolitana".

## Pendências (Jefferson / cliente)
- GA4: criar propriedade e preencher `ga4Id` em `src/data/config.ts`; testar eventos em Tempo real.
- Depoimentos fictícios (Carla, Roberto, Fernanda, com 28% e 35%) foram REMOVIDOS da home por não serem reais.
- Afirmações sem comprovação que continuam no site e precisam do ok do cliente: "atende de 2 a 3000 vidas", "+10 operadoras" (briefing diz mais de 10), "reduzir a mensalidade a cada 2 anos", "pós-venda"; nos posts: "até 40%/30%/25%" de economia, "20% a 40% mais baratos", "melhor pós-venda do mercado". Sugiro revisar ou remover.
- Post Santa Casa: Santa Casa não está no portfólio de operadoras e o texto cita Região Serrana. Sugiro despublicar ou reescrever.
- Operadoras do portfólio sem página: MedSênior e Leve Saúde. Planos por operadora citam modalidades "individual/familiar" que o cliente precisa confirmar.
- Fotos são de banco (Unsplash/Pexels); trocar por fotos reais. Horário (seg-sex 8-19, sáb 8-15) veio do site anterior, confirmar.
- http/apex 308 vs 301: depende do domínio na Vercel (o redirect apex->www em 301 está no vercel.json); conferir após o deploy.
- Validar depois do deploy: Rich Results Test, Tempo real do GA4, CSP no console (se bloquear algo do mapa/Formspree, ajustar).
- Não consegui checar visualmente no navegador (ferramenta travou); a conferência foi feita no HTML gerado. Olhar menu mobile e páginas novas no `npm run dev`.
- Pendência de commit: `scripts/add-links*.cjs` só mudaram fim de linha, não commitei.

## Rodada 04/11/2026 (sem push)
Build passa, 31 páginas. Verificação no HTML gerado: title 50-60, meta 150-160, 1 H1 e links internos sem quebra em todas as páginas indexáveis; cada "Resposta direta" das páginas novas tem 40-60 palavras.

1. **5 páginas de serviço novas** (sem preço/valor/tabela, só operadoras do portfólio, FAQ com schema a partir do `serp/paa.csv`, WhatsApp com `data-evento`/`data-local`, mensagem padrão do config):
   - `/servicos/plano-de-saude-para-idosos/` (prioridade 1; cita Prevent Senior e MedSênior; carência, rede, reajuste por faixa etária, coparticipação, contratar para os pais)
   - `/servicos/plano-de-saude-mei/` (o post `plano-saude-mei-rj` virou apoio: linka a página, ganhou aviso no topo e novo seoTitle "Guia do MEI..." para não canibalizar)
   - `/servicos/medsenior/`
   - `/servicos/leve-saude/` (Leve Top 200 e lista de dependentes: cônjuge, filhos, pais, avós, sogros, cunhados, sobrinhos, primos, conforme informado pelo Jefferson)
   - `/servicos/plano-de-saude-individual-e-familiar/`
   Linkadas entre si, com posts e com as operadoras. Entram no sitemap automaticamente (lastmod = data do conteúdo), em `/servicos/`, no llms.txt, na home (9 cards) e no rodapé "Mais procurados". Prevent Senior e plano empresarial agora linkam as novas.
2. **Post Santa Casa removido**: arquivo e capa apagados, 301 para `/blog/` (vercel.json e astro `redirects`), tirado dos `posts` de Amil e Assim; some do sitemap e do llms.txt.
3. **Avaliações reais do Google na home** (`src/data/avaliacoes.ts`, 6 avaliações de `avaliacoes-gmn.md`, textos fiéis, fonte "Avaliação no Google", 5 estrelas, nota 5,0 com 33 avaliações). Sem schema Review. Para trocar/adicionar, editar só esse arquivo; array vazio esconde a seção.
4. Ajustes técnicos: links de WhatsApp escritos em markdown de páginas de serviço agora levam `data-local="servico"` (posts seguem `post-texto`); o catálogo de serviços do schema da home não escreve mais "Plano de Saúde Várias operadoras".

Pendências desta rodada: confirmar com o Samir as regras do Leve Top 200 e de entrada de idade na MedSênior/Prevent; confirmar que ele vende plano individual/familiar; as afirmações antigas ("até 40%", "2 a 3000 vidas" etc.) foram mantidas como pedido.
