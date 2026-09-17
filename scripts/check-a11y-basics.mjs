#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function scanA11y(text) {
  const hits = [];
  if (/aria-label="(Previous|Next|Main)"/.test(text)) {
    hits.push('hardcoded English aria-label');
  }
  return hits;
}

/** Existing English aria-labels on main — ratchet: do not add files. */
export const RATCHET_EN_ARIA = new Set([]);

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (full.endsWith('.astro')) out.push(full);
  }
  return out;
}

function isMain() {
  return path.resolve(process.argv[1] || '') === fileURLToPath(import.meta.url);
}

if (isMain()) {
  const root = path.join(__dirname, '..');
  const pages = walk(path.join(root, 'src/pages'));
  const errors = [];
  const index = fs.readFileSync(path.join(root, 'src/pages/index.astro'), 'utf8');
  if (!/<main[\s>]/.test(index)) errors.push('src/pages/index.astro missing <main>');
  const layout = fs.readFileSync(path.join(root, 'src/layouts/Layout.astro'), 'utf8');
  const landing = fs.readFileSync(path.join(root, 'src/components/LandingView.astro'), 'utf8');
  const nav = fs.readFileSync(path.join(root, 'src/components/Nav.astro'), 'utf8');
  if (!/skip-link/.test(layout) || !/id="main-content"/.test(landing)) {
    errors.push('missing skip link or main-content target');
  }
  if (!/aria-expanded/.test(nav) || !/Escape/.test(nav) || !/aria-controls/.test(nav)) {
    errors.push('nav missing megamenu keyboard/ARIA pattern');
  }
  for (const file of pages) {
    const rel = path.relative(root, file).split(path.sep).join('/');
    const text = fs.readFileSync(file, 'utf8');
    if (RATCHET_EN_ARIA.has(rel)) continue;
    if (/aria-label="(Previous|Next|Main)"/.test(text)) {
      errors.push(`${rel}: hardcoded English aria-label`);
    }
  }
  if (errors.length > 0) {
    console.error('[a11y]');
    for (const line of errors) console.error(`  ${line}`);
    process.exit(1);
  }
  console.log('check:a11y: OK');
}
