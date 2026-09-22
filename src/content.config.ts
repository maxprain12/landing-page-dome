import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const entrySchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  description: z.string(),
  cover: z.string().optional(),
  tags: z.array(z.string()).default([]),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
});

function localePathId({ entry }: { entry: string }) {
  return entry.replace(/\.md$/, "");
}

const blog = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.md",
    base: "./src/content/blog",
    generateId: localePathId,
  }),
  schema: entrySchema,
});

const manual = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.md",
    base: "./src/content/manual",
    generateId: localePathId,
  }),
  schema: entrySchema,
});

export const collections = { blog, manual };
