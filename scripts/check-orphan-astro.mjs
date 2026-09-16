#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function findOrphans(repoRoot) {
  const dir = path.join(repoRoot, 'src/components');
  const files = fs.readdirSync(dir).filter((name) => name.endsWith('.astro'));
  const corpus = [];
  function walk(folder) {
    for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
      const full = path.join(folder, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(astro|ts|js|mjs)$/.test(entry.name)) corpus.push(fs.readFileSync(full, 'utf8'));
    }
  }
  walk(path.join(repoRoot, 'src'));
  const joined = corpus.join('\n');
  return files.filter((name) => {
    const stem = name.replace(/\.astro$/, '');
    const mentions = joined.split(stem).length - 1;
    return mentions < 2;
  });
}

function isMain() {
  return path.resolve(process.argv[1] || '') === fileURLToPath(import.meta.url);
}

if (isMain()) {
  const orphans = findOrphans(path.join(__dirname, '..'));
  if (orphans.length > 0) {
    console.error(`[orphans] unused components: ${orphans.join(', ')}`);
    process.exit(1);
  }
  console.log('check:orphan-components: OK');
}
