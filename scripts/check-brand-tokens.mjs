#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HEX_RE = /#[0-9a-fA-F]{3,8}\b/g;

export const ALLOWED_FILES = new Set([
  'src/layouts/Layout.astro',
]);

/** Existing hex on main — ratchet: do not add files. */
export const RATCHET_FILES = new Set([
  'src/components/Benefits.astro',
  'src/components/FAQ.astro',
  'src/components/FinalCTA.astro',
  'src/components/Footer.astro',
  'src/components/Hero.astro',
  'src/components/HowItWorks.astro',
  'src/components/MeetMany.astro',
  'src/components/MockMany.astro',
  'src/components/Testimonials.astro',
  'src/pages/oauth/_OauthPage.astro',
]);

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(astro|ts|css)$/.test(entry.name) && !entry.name.includes('.test.')) out.push(full);
  }
  return out;
}

export function countHex(text, { skipCssVars = false } = {}) {
  let count = 0;
  for (const line of text.split('\n')) {
    if (skipCssVars && /--[\w-]+\s*:/.test(line.trim())) continue;
    const matches = line.match(HEX_RE);
    if (matches) count += matches.length;
  }
  return count;
}

export function findHardcodedColors(repoRoot) {
  const files = walk(path.join(repoRoot, 'src'));
  const offenders = [];
  for (const file of files) {
    const rel = path.relative(repoRoot, file).split(path.sep).join('/');
    if (ALLOWED_FILES.has(rel) || RATCHET_FILES.has(rel)) continue;
    const skipCssVars = rel.endsWith('.css') || rel.endsWith('.astro');
    const n = countHex(fs.readFileSync(file, 'utf8'), { skipCssVars });
    if (n > 0) offenders.push({ file: rel, count: n });
  }
  return offenders;
}

function isMain() {
  return path.resolve(process.argv[1] || '') === fileURLToPath(import.meta.url);
}

if (isMain()) {
  const offenders = findHardcodedColors(path.join(__dirname, '..'));
  if (offenders.length > 0) {
    const total = offenders.reduce((sum, item) => sum + item.count, 0);
    console.error(`[brand-tokens] ${total} hardcoded hex outside Layout.astro`);
    for (const item of offenders) console.error(`  ${item.count}\t${item.file}`);
    process.exit(1);
  }
  console.log('check:brand-tokens: OK (Layout tokens + ratchet allowlist)');
}
