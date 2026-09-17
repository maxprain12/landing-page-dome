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

function walkMdx(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkMdx(full, out);
    else if (/\.mdx$/.test(entry.name)) out.push(full);
  }
  return out;
}

export function checkContentParity(repoRoot) {
  const errors = [];
  for (const kind of ["blog", "manual"]) {
    const files = walkMdx(path.join(repoRoot, "src/content", kind));
    const byKey = new Map();
    const slugs = { es: new Set(), en: new Set() };
    for (const file of files) {
      const rel = path.relative(repoRoot, file).split(path.sep).join("/");
      const text = fs.readFileSync(file, "utf8");
      const fm = extractFrontmatter(text);
      if (!fm) {
        errors.push(`${rel}: missing frontmatter`);
        continue;
      }
      for (const field of ["title", "description", "locale", "permalink", "translationKey", "ogImage"]) {
        if (!fm[field]) errors.push(`${rel}: missing ${field}`);
      }
      if (fm.heroImage && !fm.heroAlt) {
        errors.push(`${rel}: heroAlt required when heroImage is set`);
      }
      const body = text.replace(/^---[\s\S]*?---/, "");
      for (const image of body.matchAll(/<Image\b[\s\S]*?\/>/g)) {
        if (!/\balt=/.test(image[0])) errors.push(`${rel}: Image without alt`);
      }
      if (!/\]\((?:\/|https?:)/.test(body) && !/\bhref=/.test(body)) {
        errors.push(`${rel}: missing internal or related link`);
      }
      if (fm.locale !== "es" && fm.locale !== "en") {
        errors.push(`${rel}: locale must be es or en`);
        continue;
      }
      if (fm.permalink && slugs[fm.locale].has(fm.permalink)) {
        errors.push(`${rel}: duplicate permalink ${fm.permalink} for ${fm.locale}`);
      }
      if (fm.permalink) slugs[fm.locale].add(fm.permalink);
      if (fm.translationKey) {
        const entry = byKey.get(fm.translationKey) ?? {};
        entry[fm.locale] = { rel, permalink: fm.permalink };
        byKey.set(fm.translationKey, entry);
      }
    }
    for (const [key, pair] of byKey) {
      if (!pair.es || !pair.en) {
        errors.push(`${kind}:${key} missing ${pair.es ? "en" : "es"} translation`);
        continue;
      }
      if (pair.es.permalink && pair.en.permalink && pair.es.permalink !== pair.en.permalink) {
        errors.push(`${kind}:${key} permalink mismatch ${pair.es.permalink} vs ${pair.en.permalink}`);
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
