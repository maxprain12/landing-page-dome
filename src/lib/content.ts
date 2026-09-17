import { getCollection, type CollectionEntry } from "astro:content";
import { localizePath, type Locale } from "../i18n";

export type ContentKind = "blog" | "manual";
export type ContentEntry = CollectionEntry<ContentKind>;

export function contentBase(kind: ContentKind): "/blog" | "/manual" {
  return kind === "blog" ? "/blog" : "/manual";
}

export function contentPath(kind: ContentKind, permalink: string, locale: Locale): string {
  return localizePath(`${contentBase(kind)}/${permalink}`, locale);
}

export function isPublished<T extends ContentEntry>(entry: T): boolean {
  return !entry.data.draft;
}

export async function publishedEntries(kind: ContentKind, locale: Locale): Promise<ContentEntry[]> {
  const entries = await getCollection(kind, (entry) => entry.data.locale === locale && isPublished(entry));
  if (kind === "manual") {
    return entries.sort((a, b) => {
      const aOrder = "order" in a.data ? a.data.order : 0;
      const bOrder = "order" in b.data ? b.data.order : 0;
      return aOrder - bOrder;
    });
  }
  return entries.sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
}

export async function findTranslation(
  kind: ContentKind,
  translationKey: string,
  locale: Locale,
): Promise<ContentEntry | undefined> {
  const entries = await getCollection(kind, (entry) => {
    return entry.data.translationKey === translationKey && entry.data.locale === locale && isPublished(entry);
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
      const translation = await findTranslation(kind, entry.data.translationKey, altLocale);
      return {
        params: { slug: entry.data.permalink },
        props: {
          entry,
          locale,
          translationPath: translation ? contentPath(kind, translation.data.permalink, altLocale) : null,
        },
      };
    }),
  );
}
