import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const locale = z.enum(["es", "en"]);

const seoFields = {
  title: z.string(),
  description: z.string(),
  locale,
    permalink: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  translationKey: z.string(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  author: z.string().default("Alder Velasquez"),
  tags: z.array(z.string()).default([]),
  ogImage: z.string(),
  heroImage: z.string().optional(),
  heroAlt: z.string().optional(),
  draft: z.boolean().default(false),
};

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: z
    .object({
      ...seoFields,
      category: z.string(),
    })
    .superRefine((value, ctx) => {
      if (value.heroImage && !value.heroAlt) {
        ctx.addIssue({
          code: "custom",
          message: "heroAlt is required when heroImage is set",
          path: ["heroAlt"],
        });
      }
    }),
});

const manual = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/manual" }),
  schema: z
    .object({
      ...seoFields,
      category: z.string(),
      order: z.number().int().positive(),
      howTo: z
        .array(
          z.object({
            name: z.string(),
            text: z.string(),
          }),
        )
        .optional(),
    })
    .superRefine((value, ctx) => {
      if (value.heroImage && !value.heroAlt) {
        ctx.addIssue({
          code: "custom",
          message: "heroAlt is required when heroImage is set",
          path: ["heroAlt"],
        });
      }
    }),
});

export const collections = { blog, manual };
