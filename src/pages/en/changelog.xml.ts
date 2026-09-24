import type { APIContext } from "astro";
import { changelogFeed } from "../../lib/rss";

export function GET(context: APIContext) {
  return changelogFeed(context, "en");
}
