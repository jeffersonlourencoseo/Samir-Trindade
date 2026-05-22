import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const servicosCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    operadora: z.string().optional(),
    modalidade: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  servicos: servicosCollection,
};
