const manualReplacements = {
  "first-workflow": "getting-started",
  "email-and-social": "integrations",
  contacts: "integrations",
};
const retiredPosts = new Set([
  "pdf-to-follow-up",
  "local-first",
  "many-with-ollama",
]);

export function contentRoute(pathname) {
  const edition = /^(\/en)?\/(pro|study|dev)\/?$/.exec(pathname);
  if (edition)
    return {
      status: 301,
      location: `${edition[1] ?? ""}/funciones/${{ pro: "library", study: "learning", dev: "integrations" }[edition[2]]}`,
    };

  const match = /^(\/en)?\/(manual|blog)\/([^/]+)\/?$/.exec(pathname);
  if (!match) return null;
  const [, locale = "", kind, slug] = match;
  if (kind === "blog" && retiredPosts.has(slug)) return { status: 410 };
  if (kind === "manual" && manualReplacements[slug])
    return {
      status: 301,
      location: `${locale}/manual/${manualReplacements[slug]}`,
    };
  return null;
}
