import { z, defineCollection } from 'astro:content';

const faq = z.array(z.object({ question: z.string(), answer: z.string() }));

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // título curto para a tag <title> (o H1 usa "title")
      seoTitle: z.string().optional(),
      description: z.string(),
      publishDate: z.date(),
      updatedDate: z.date().optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      imageCredit: z.string().optional(),
      tags: z.array(z.string()).default([]),
      // páginas de serviço relacionadas (1-2) que o post destaca e linka
      servicos: z.array(z.string()).default([]),
      faq: faq.optional(),
    }),
});

const servicosCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    publishDate: z.date().default(new Date('2025-05-01T08:00:00Z')),
    updatedDate: z.date().optional(),
    operadora: z.string().optional(),
    modalidade: z.string().optional(),
    // slugs de posts relacionados mostrados no fim da página
    posts: z.array(z.string()).default([]),
    // rótulo curto exibido acima do H1 (ex.: "Cooperativa médica")
    etiqueta: z.string().optional(),
    faq: faq.optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  servicos: servicosCollection,
};
