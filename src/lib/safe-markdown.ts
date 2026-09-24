import { markdownToHtml } from "satteri";

const ALLOWED_TAGS = new Set([
  "p",
  "ul",
  "ol",
  "li",
  "strong",
  "em",
  "a",
  "code",
  "pre",
  "h2",
  "h3",
  "h4",
  "br",
  "blockquote",
]);

function escapeAttr(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

/** Strip tags/attrs outside a small allowlist after markdown → HTML. */
export function sanitizeNotesHtml(html: string): string {
  const withoutDanger = html
    .replace(/<(script|style|iframe|object|embed|form|svg|math)[\s\S]*?<\/\1>/gi, "")
    .replace(/<\/?(script|style|iframe|object|embed|form|svg|math)\b[^>]*>/gi, "");

  return withoutDanger.replace(/<\/?([a-zA-Z0-9]+)(\s[^>]*)?>/g, (match, rawTag: string, rawAttrs = "") => {
    const tag = rawTag.toLowerCase();
    if (!ALLOWED_TAGS.has(tag)) return "";
    if (match.startsWith("</")) return `</${tag}>`;
    if (tag === "br") return "<br>";
    if (tag === "a") {
      const hrefMatch = /\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i.exec(rawAttrs);
      const href = hrefMatch?.[1] ?? hrefMatch?.[2] ?? hrefMatch?.[3] ?? "";
      if (!/^(https?:\/\/|mailto:|\/|#)/i.test(href)) return "";
      return `<a href="${escapeAttr(href)}" rel="noopener noreferrer">`;
    }
    return `<${tag}>`;
  });
}

export async function renderSafeMarkdown(markdown: string): Promise<string> {
  if (!markdown.trim()) return "";
  const { html } = markdownToHtml(markdown);
  return sanitizeNotesHtml(html);
}
