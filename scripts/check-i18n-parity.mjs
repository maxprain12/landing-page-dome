#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function collectKeys(value, prefix = '', out = []) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    for (const [key, nested] of Object.entries(value)) {
      collectKeys(nested, prefix ? `${prefix}.${key}` : key, out);
    }
  } else if (prefix) {
    out.push(prefix);
  }
  return out;
}

export function diffI18nCatalogs(en, es) {
  const enKeys = new Set(collectKeys(en));
  const esKeys = new Set(collectKeys(es));
  return {
    missingInEs: [...enKeys].filter((key) => !esKeys.has(key)),
    extraInEs: [...esKeys].filter((key) => !enKeys.has(key)),
  };
}

function isMain() {
  return path.resolve(process.argv[1] || '') === fileURLToPath(import.meta.url);
}

if (isMain()) {
  const root = path.join(__dirname, '..');
  const enFile = path.join(root, 'src/i18n/en.ts');
  const esFile = path.join(root, 'src/i18n/es.ts');
  if (!fs.existsSync(enFile) || !fs.existsSync(esFile)) {
    console.log('check:i18n: skip (single-locale catalog in src/data/landing.ts)');
    process.exit(0);
  }

  function objectSkeleton(source) {
    const start = source.indexOf('= {');
    const end = source.lastIndexOf('}');
    let body = source.slice(start, end + 1);
    body = body.replace(/`(?:\\.|[^\\`])*`/g, '""');
    body = body.replace(/"(?:\\.|[^"\\])*"/g, '""');
    body = body.replace(/'(?:\\.|[^'\\])*'/g, '""');
    body = body.replace(/:\s*true\b/g, ':0');
    body = body.replace(/:\s*false\b/g, ':0');
    body = body.replace(/:\s*\d+/g, ':0');
    body = body.replace(/:\s*""/g, ':0');
    return body.replace(/\s+/g, '');
  }

  const enSkel = objectSkeleton(fs.readFileSync(enFile, 'utf8'));
  const esSkel = objectSkeleton(fs.readFileSync(esFile, 'utf8'));
  if (enSkel !== esSkel) {
    console.error('check:i18n: es.ts and en.ts object shapes differ. Keep keys in the same order.');
    process.exit(1);
  }
  console.log('check:i18n: OK');
}
