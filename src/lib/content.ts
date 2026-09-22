import { getCollection, type CollectionEntry } from "astro:content";
import { localizePath, type Locale } from "../i18n";

export type ContentKind = "blog" | "manual";
export type ContentEntry = CollectionEntry<ContentKind>;

export function contentBase(kind: ContentKind): "/blog" | "/manual" {
  return kind === "blog" ? "/blog" : "/manual";
}

export function contentPath(kind: ContentKind, slug: string, locale: Locale): string {
  return localizePath(`${contentBase(kind)}/${slug}`, locale);
}

export function localeFromEntry(entry: ContentEntry): Locale {
  const segment = entry.id.split("/")[0];
  return segment === "en" ? "en" : "es";
}

export const GENERIC_COVERS = [
  "/covers/orb.webp",
  "/covers/horizon.webp",
  "/covers/veil.webp",
  "/covers/glass.webp",
  "/covers/swirl.webp",
  "/covers/fog.webp",
] as const;

function hashString(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function genericCoverForSlug(slug: string): string {
  return GENERIC_COVERS[hashString(slug) % GENERIC_COVERS.length];
}

export function contentCover(entry: ContentEntry): string {
  return entry.data.cover || genericCoverForSlug(entry.data.slug);
}

export function contentCoverAlt(entry: ContentEntry): string {
  return entry.data.cover ? entry.data.title : "";
}

export async function publishedEntries(kind: ContentKind, locale: Locale): Promise<ContentEntry[]> {
  const entries = await getCollection(kind, (entry) => localeFromEntry(entry) === locale);
  if (kind === "manual") {
    return entries.sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf());
  }
  return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function findTranslation(
  kind: ContentKind,
  slug: string,
  locale: Locale,
): Promise<ContentEntry | undefined> {
  const entries = await getCollection(kind, (entry) => {
    return entry.data.slug === slug && localeFromEntry(entry) === locale;
  });
  return entries[0];
}

export function relatedEntries(entries: ContentEntry[], current: ContentEntry, limit = 3): ContentEntry[] {
  const tagged = entries.filter((entry) => {
    if (entry.id === current.id) return false;
    return entry.data.tags.some((tag) => current.data.tags.includes(tag));
  });
  const pool = tagged.length >= limit ? tagged : entries.filter((entry) => entry.id !== current.id);
  return pool.slice(0, limit);
}

export function readingMinutes(body: string | undefined): number {
  const words = (body ?? "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export async function staticPathsFor(kind: ContentKind, locale: Locale) {
  const entries = await publishedEntries(kind, locale);
  const altLocale: Locale = locale === "es" ? "en" : "es";
  return Promise.all(
    entries.map(async (entry) => {
      const translation = await findTranslation(kind, entry.data.slug, altLocale);
      return {
        params: { slug: entry.data.slug },
        props: {
          entry,
          locale,
          translationPath: translation ? contentPath(kind, translation.data.slug, altLocale) : null,
        },
      };
    }),
  );
}
