#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function extractFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const data = {};
  for (const line of match[1].split("\n")) {
    const hit = line.match(/^([A-Za-z][\w]*):\s*(.*)$/);
    if (!hit) continue;
    data[hit[1]] = hit[2].replace(/^["']|["']$/g, "");
  }
  return data;
}

function walkMd(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkMd(full, out);
    else if (/\.md$/.test(entry.name)) out.push(full);
  }
  return out;
}

export function checkContentParity(repoRoot) {
  const errors = [];
  for (const kind of ["blog", "manual"]) {
    const files = walkMd(path.join(repoRoot, "src/content", kind));
    const bySlug = new Map();
    const slugs = { es: new Set(), en: new Set() };
    for (const file of files) {
      const rel = path.relative(repoRoot, file).split(path.sep).join("/");
      const parts = rel.split("/");
      const locale = parts[3];
      const basename = path.basename(file, ".md");
      const text = fs.readFileSync(file, "utf8");
      const fm = extractFrontmatter(text);
      if (!fm) {
        errors.push(`${rel}: missing frontmatter`);
        continue;
      }
      for (const field of ["title", "description", "date", "slug"]) {
        if (!fm[field]) errors.push(`${rel}: missing ${field}`);
      }
      if (locale !== "es" && locale !== "en") {
        errors.push(`${rel}: locale folder must be es or en`);
        continue;
      }
      if (fm.slug && basename !== fm.slug) {
        errors.push(`${rel}: filename must match slug ${fm.slug}`);
      }
      const body = text.replace(/^---[\s\S]*?---/, "");
      for (const image of body.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
        if (!image[1].trim()) errors.push(`${rel}: Image without alt`);
      }
      if (!/\]\((?:\/|https?:)/.test(body) && !/\bhref=/.test(body)) {
        errors.push(`${rel}: missing internal or related link`);
      }
      if (fm.slug && slugs[locale].has(fm.slug)) {
        errors.push(`${rel}: duplicate slug ${fm.slug} for ${locale}`);
      }
      if (fm.slug) slugs[locale].add(fm.slug);
      if (fm.slug) {
        const entry = bySlug.get(fm.slug) ?? {};
        entry[locale] = { rel, slug: fm.slug };
        bySlug.set(fm.slug, entry);
      }
    }
    for (const [key, pair] of bySlug) {
      if (!pair.es || !pair.en) {
        errors.push(`${kind}:${key} missing ${pair.es ? "en" : "es"} translation`);
      }
    }
  }
  return errors;
}

function isMain() {
  return path.resolve(process.argv[1] || "") === fileURLToPath(import.meta.url);
}

if (isMain()) {
  const errors = checkContentParity(path.join(__dirname, ".."));
  if (errors.length) {
    console.error("[content-parity]");
    for (const line of errors) console.error(`  ${line}`);
    process.exit(1);
  }
  console.log("check:content-parity: OK");
}
