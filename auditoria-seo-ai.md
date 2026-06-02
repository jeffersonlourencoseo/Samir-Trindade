# 📊 Auditoria SEO + AI SEO — Samir Trindade

> Data: 01/06/2026
> Site: https://samirtrindade.com.br
> Plataforma: Astro 4.16 + Tailwind (estático)

---

## 🟢 PONTOS FORTES (já implementados)

### Técnico
| Item | Status | Detalhe |
|------|--------|---------|
| Site estático (Astro) | ✅ | HTML puro, zero JS desnecessário |
| Robots.txt | ✅ | `Allow: /`, sitemap referenciado |
| Sitemap gerado | ✅ | `@astrojs/sitemap` gera `sitemap-index.xml` |
| Canonical tags | ✅ | Todas as páginas |
| Open Graph + Twitter Card | ✅ | Título, descrição, imagem, URL |
| HTTPS | ✅ | Vercel + certificado SSL |
| H1 único por página | ✅ | Apenas 1 `<h1>` por página |
| URLs amigáveis | ✅ | `/blog/[slug]/`, `/servicos/[slug]/` |
| Schema.org rico | ✅ | LocalBusiness, Article, Service, Breadcrumb, FAQ |
| NAP consistente | ✅ | Telefone, endereço, ANS iguais em todas as páginas |
| Inline CSS (Astro) | ✅ | `inlineStylesheets: 'always'` → menos requests |
| Imagens com lazy loading | ✅ | Componente `<Image>` do Astro |

### Conteúdo
| Item | Status | Detalhe |
|------|--------|---------|
| Artigos longos | ✅ | 2000–4000 palavras |
| Estrutura H2/H3 | ✅ | Guias bem segmentados |
| FAQ em artigos | ✅ | 3 artigos com FAQ + `FAQPage` schema |
| Links internos | ✅ | Operadoras linkadas, `/sobre` citado |
| Autor identificado | ✅ | Samir Trindade + ANS 73719199730 |
| Estatísticas presentes | ✅ | "25% menor turnover", "economia de 25% em 5 anos" |
| Passos numerados | ✅ | "12 passos", "7 critérios", etc. |
| CTA claros | ✅ | WhatsApp em cada seção |

---

## 🔴 PROBLEMAS CRÍTICOS (corrigir com urgência)

### 1. Sitemap duplicado e desatualizado
**Problema:** O arquivo `public/sitemap.xml` está **hardcoded** com URLs antigas (ex: `/servicos/planos-empresariais/` que não existe mais). O Astro gera um `sitemap-index.xml` em `/sitemap-index.xml`, mas o `robots.txt` aponta para o antigo.

**Impacto:** Google pode estar indexando URLs quebradas ou ignorando novas páginas.

**Fix:**
```bash
rm public/sitemap.xml
```
O Astro já gera automaticamente em `https://samirtrindade.com.br/sitemap-index.xml`. Atualizar `robots.txt`:
```
Sitemap: https://samirtrindade.com.br/sitemap-index.xml
```

**Prioridade:** 🔴 CRÍTICO

---

### 2. Páginas sem H1 visível para SEO
**Problema:** Nas páginas de detalhe (`blog/[slug].astro`, `servicos/[slug].astro`), o H1 está escondido via CSS (`h1 { display: none; }`) no `.prose-article`. O schema Article recebe o título, mas não há H1 visível no DOM.

**Impacto:** Google considera a página sem H1 principal — prejudica ranking.

**Fix:** Remover `display: none` do `.prose-article h1` e garantir que o título do artigo seja um `<h1>` visível.

**Prioridade:** 🔴 CRÍTICO

---

### 3. Meta descriptions genéricas e sem CTA
**Problema:** Algumas descriptions são longas demais (ex: "Corretor de plano de saúde...") ou sem call-to-action. A description do index está boa, mas internas poderiam ser mais persuasivas.

**Impacto:** CTR baixo nos resultados de busca.

**Fix:** Reescrever descriptions com:
- Limite de 150–160 caracteres
- Incluir número/benefício específico
- Terminar com CTA ("Solicite cotação", "Saiba mais")

**Exemplo antes:**
> "Corretor de plano de saúde credenciado ANS no Rio de Janeiro. Planos empresariais, MEI e familiares com mais de 10 operadoras."

**Exemplo depois:**
> "Corretor ANS credenciado no Rio. Planos empresariais, MEI e familiares com +10 operadoras. Reduza até 30% a cada 2 anos. Cotação gratuita →"

**Prioridade:** 🟠 ALTO

---

## 🟠 PROBLEMAS ALTO IMPACTO

### 4. Falta de `<lastmod>` no sitemap
**Problema:** O sitemap gerado pelo Astro não inclui `<lastmod>`. Google não sabe quais páginas foram atualizadas recentemente.

**Fix:** Configurar `@astrojs/sitemap` com `lastmod: true` e `changefreq` por tipo de página.

### 5. Imagens sem dimensões fixas e formato moderno
**Problema:** Artigos usam imagens externas do Unsplash sem `width`/`height` explícitos. Isso causa CLS (layout shift).

**Fix:** Adicionar `width` e `height` em todas as imagens. Converter para WebP onde possível.

### 6. Falta Breadcrumb visível na página
**Problema:** O schema Breadcrumb está presente, mas não há navegação visual de breadcrumbs na interface. Isso ajuda usuários e Google a entender hierarquia.

**Fix:** Adicionar componente visual de breadcrumbs acima do conteúdo principal em todas as páginas internas.

### 7. Páginas de serviço muito parecidas (thin content risk)
**Problema:** As 9 páginas de operadoras (`/servicos/amil/`, `/servicos/bradesco/`, etc.) podem ter conteúdo similar com pouca variação. Google pode marcar como conteúdo duplicado.

**Fix:** Garantir que cada página tenha:
- Dados específicos da operadora (rede credenciada, hospitais no RJ)
- Tabela comparativa única
- Depoimento específico (se houver)
- FAQ diferente por operadora

### 8. Ausência de `Organization` schema independente
**Problema:** Só existe `LocalBusiness` schema. `Organization` ajuda Google a entender a marca separadamente do local físico.

**Fix:** Adicionar `Organization` schema com logo, sameAs (WhatsApp, etc.).

---

## 🟡 OPORTUNIDADES DE AI SEO

### 9. Criar `/llms.txt`
**Por que:** ChatGPT, Claude e Perplexity leem `llms.txt` para entender o site rapidamente.

**Conteúdo sugerido:**
```
# Samir Trindade — Corretor de Planos de Saúde

> Samir Trindade é corretor credenciado ANS no Rio de Janeiro, especializado em planos empresariais, MEI e familiares. Diferencial: pós-venda proativo com revisão a cada 2 anos.

## Principais páginas
- /: Landing com cotação gratuita
- /sobre: História, credenciais ANS, valores
- /servicos: 10+ operadoras (Amil, Bradesco, SulAmérica, Unimed, etc.)
- /blog: Guias e dicas sobre planos de saúde
- /contato: WhatsApp, telefone, formulário

## Contato
- WhatsApp: https://wa.me/5521964625163
- Telefone: (21) 96462-5163
- Endereço: Av. Rio Branco, 108, 21º andar — Centro, Rio de Janeiro/RJ
- Registro ANS: 73719199730
```

### 10. Adicionar blocos de resposta auto-contidos
**Por que:** AI Overviews e Perplexity extraem trechos de 40–60 palavras. O conteúdo atual é bom, mas poderia ter blocos mais "quotáveis".

**Exemplo de bloco otimizado (adicionar no início de cada seção):**
> **Resumo:** Um plano de saúde empresarial bem escolhido pode reduzir o turnover em até 25% e aumentar a produtividade da equipe. A chave é comparar rede credenciada, coparticipação e histórico de reajustes antes de contratar.

### 11. Adicionar tabelas comparativas
**Por que:** AI adora citar tabelas. São estruturadas e fáceis de extrair.

**Sugestão:** Criar tabela "Amil vs Bradesco vs SulAmérica" em artigo dedicado ou em cada página de operadora.

### 12. Citar fontes externas
**Por que:** Conteúdo com citações de fontes autoritativas é citado 40% mais vezes por AI.

**Sugestões:**
- Citar dados da ANS sobre reajustes máximos
- Referenciar estudos da FGV ou IBGE sobre saúde corporativa
- Linkar para legislação relevante

### 13. Adicionar data de atualização visível
**Por que:** AI pesquisa dá peso à frescura do conteúdo.

**Fix:** Adicionar "Atualizado em: [data]" visível no topo de cada artigo.

### 14. Author bio com foto e credenciais
**Por que:** E-E-A-T. Google e AI precisam ver que o autor é uma pessoa real com expertise.

**Fix:** Adicionar bio do Samir no final de cada artigo:
> Samir Trindade é corretor de planos de saúde credenciado ANS 73719199730, com escritório no Centro do Rio de Janeiro. Atende empresas de 2 a 3.000 vidas, MEI e famílias em todo o estado do RJ.

### 15. Criar `Review` schema para depoimentos
**Por que:** Depoimentos com schema Review aparecem como rich snippets.

**Fix:** Adicionar `AggregateRating` + `Review` schema na landing e na página /sobre.

---

## 📋 PLANO DE AÇÃO PRIORIZADO

| Prioridade | Ação | Esforço | Impacto SEO | Impacto AI |
|------------|------|---------|-------------|------------|
| 🔴 P0 | Corrigir sitemap duplicado | 10 min | Alto | Médio |
| 🔴 P0 | Restaurar H1 visível nos artigos | 15 min | Alto | Médio |
| 🟠 P1 | Reescrever meta descriptions com CTA | 30 min | Alto | Baixo |
| 🟠 P1 | Adicionar breadcrumbs visuais | 1h | Médio | Baixo |
| 🟠 P1 | Adicionar `<lastmod>` no sitemap | 15 min | Médio | Baixo |
| 🟡 P2 | Criar `/llms.txt` | 20 min | Baixo | **Alto** |
| 🟡 P2 | Adicionar data de atualização nos posts | 30 min | Médio | **Alto** |
| 🟡 P2 | Author bio em cada artigo | 45 min | Médio | **Alto** |
| 🟡 P2 | Blocos de resumo auto-contidos | 2h | Médio | **Alto** |
| 🟢 P3 | Tabelas comparativas por operadora | 3h | Médio | **Alto** |
| 🟢 P3 | Review schema nos depoimentos | 1h | Médio | Médio |
| 🟢 P3 | Organization schema | 20 min | Baixo | Médio |
| 🟢 P3 | Otimizar imagens (WebP + dimensões) | 2h | Médio | Baixo |

---

## 🎯 KPIs para monitorar

| Métrica | Ferramenta | Meta |
|---------|-----------|------|
| Indexed pages | Google Search Console | 24 páginas |
| Core Web Vitals (LCP) | PageSpeed Insights | < 2.5s |
| CLS | PageSpeed Insights | < 0.1 |
| Rich results | Google Rich Results Test | FAQ + Breadcrumb validados |
| AI Overview presence | Manual / Semrush | Aparecer em "plano de saúde empresarial rio de janeiro" |
| Citações em ChatGPT/Perplexity | Manual mensal | Mencionado em top 10 queries |

---

## 🛠️ Ferramentas recomendadas

**Grátis:**
- Google Search Console (obrigatório)
- Google Rich Results Test
- PageSpeed Insights
- Screaming Frog (500 URLs free)

**Paga (opcional):**
- Semrush / Ahrefs — monitorar AI Overviews
- Otterly AI / Peec AI — rastrear citações em AI

---

*Relatório gerado pela auditoria combinada `/seo-audit` + `/ai-seo`.*
