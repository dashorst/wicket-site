import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional().default([]),
    excerpt: z.string().optional(),
  }),
});

const showcase = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    url: z.string().url().optional(),
    description: z.string(),
    screenshot: z.string().optional(),
  }),
});

export const collections = { blog, showcase };
