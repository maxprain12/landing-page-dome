import type { APIContext } from "astro";
import { blogFeed } from "../lib/rss";

export function GET(context: APIContext) {
  return blogFeed(context, "es");
}
