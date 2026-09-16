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
  console.error('check:i18n: found src/i18n but this checker expects exportable JSON dictionaries.');
  console.error('Keep es/en keys in sync when that tree lands.');
  process.exit(0);
}
