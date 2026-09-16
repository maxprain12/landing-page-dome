#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const KNOWN_MISSING = new Set([
  '/assets/many-1.png',
  '/assets/many-3.png',
  '/assets/many-7.png',
  '/assets/many.png',
]);

export function extractAssetRefs(text) {
  const refs = new Set();
  const re = /["'`](\/assets\/[^"'`]+)["'`]/g;
  let match = re.exec(text);
  while (match) {
    refs.add(match[1]);
    match = re.exec(text);
  }
  return [...refs];
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(astro|ts|js)$/.test(entry.name)) out.push(full);
  }
  return out;
}

export function findMissingAssets(repoRoot, knownMissing = KNOWN_MISSING) {
  const files = walk(path.join(repoRoot, 'src'));
  const missing = [];
  const unexpected = [];
  for (const file of files) {
    const refs = extractAssetRefs(fs.readFileSync(file, 'utf8'));
    for (const ref of refs) {
      const disk = path.join(repoRoot, 'public', ref.replace(/^\//, ''));
      if (fs.existsSync(disk)) continue;
      const rel = path.relative(repoRoot, file).split(path.sep).join('/');
      if (knownMissing.has(ref)) missing.push({ file: rel, ref, known: true });
      else unexpected.push({ file: rel, ref, known: false });
    }
  }
  return { missing, unexpected };
}

function isMain() {
  return path.resolve(process.argv[1] || '') === fileURLToPath(import.meta.url);
}

if (isMain()) {
  const { unexpected } = findMissingAssets(path.join(__dirname, '..'));
  if (unexpected.length > 0) {
    console.error(`[assets] ${unexpected.length} referenced file(s) missing from public/`);
    for (const item of unexpected) console.error(`  ${item.file} → ${item.ref}`);
    process.exit(1);
  }
  console.log('check:assets: OK (new missing refs would fail; known gaps are allowlisted)');
}
