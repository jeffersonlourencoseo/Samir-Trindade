# Samir Trindade — Corretor de Plano de Saúde

Site profissional de alta conversão para corretor de plano de saúde credenciado ANS no Rio de Janeiro.

## Status

✅ **Pronto para Produção**

## Tecnologias

- **Astro 4.x** — Framework estático de alta performance
- **Tailwind CSS** — Utility-first CSS framework
- **TypeScript** — Tipagem estática para segurança e produtividade
- **Content Collections** — CMS nativo para blog e serviços

## Design

- Paleta: Primary (#FACC15), Secondary (#1E3A8A), Accent (#000000)
- Tipografia: Inter (Google Fonts)
- Respiro generoso: `py-24` mobile / `py-32` desktop
- Cards com padding interno `p-10` a `p-12`
- Menu mobile com drawer e trava de scroll
- Botão WhatsApp flutuante com pulsação

## SEO Local

- Schema.org `LocalBusiness` injetado automaticamente
- Meta tags e Open Graph configurados
- Sitemap gerado automaticamente
- Dados NAP centralizados em `src/data/config.ts`

## Páginas

| Rota | Descrição |
|------|-----------|
| `/` | Home — Hero, diferenciais, serviços, depoimentos, blog, CTA |
| `/sobre` | Institucional — história, missão, valores, pós-venda |
| `/servicos` | Listagem de planos/operadoras |
| `/servicos/[slug]` | Detalhe do plano com CTA |
| `/blog` | Listagem de artigos |
| `/blog/[slug]` | Artigo individual com sidebar |
| `/contato` | NAP + formulário Formspree + WhatsApp |
| `/privacidade` | Política de Privacidade |
| `/termos` | Termos de Uso |

## Dados do Cliente

- **Nome:** Samir Trindade
- **Endereço:** Av. Rio Branco, 108, 21º andar — Centro, Rio de Janeiro/RJ
- **Telefone/WhatsApp:** (21) 96462-5163
- **Email:** samirtrindade1983@gmail.com
- **ANS:** 73719199730
- **Atendimento:** Seg–Sex 8h–19h | Sáb 8h–15h | Extra mediante agendamento

## Deploy

Configurado para deploy na **Vercel** com `@astrojs/vercel`.

## Scripts

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build estático
npm run preview  # Preview local do build
```

---

Projeto desenvolvido com foco em autoridade, confiança e conversão.
