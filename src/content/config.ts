import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    lang: z.enum(["zh", "en"]),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    source: z.string().optional()
  })
});

const resume = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    lang: z.enum(["zh", "en"]),
    updated: z.coerce.date(),
    source: z.string().optional(),
    draft: z.boolean().default(false)
  })
});

export const collections = { blog, resume };
