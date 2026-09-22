import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { contentPath, publishedEntries } from "../lib/content";
import { t, type Locale } from "../i18n";

export async function blogFeed(context: APIContext, locale: Locale) {
  const copy = t(locale);
  const posts = await publishedEntries("blog", locale);
  return rss({
    title: copy.pages.blog.title,
    description: copy.pages.blog.description,
    site: context.site ?? "https://dome.dowi.es",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: contentPath("blog", post.data.slug, locale),
    })),
  });
}
