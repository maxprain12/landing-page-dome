import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const desktop = path.resolve(process.argv.slice(2).find((arg) => !arg.startsWith('--')) || path.join(root, '../dome'));
const { validateCatalog } = await import(pathToFileURL(path.join(desktop, 'scripts/export-complements-catalog.mjs')).href);
const source = validateCatalog(JSON.parse(fs.readFileSync(path.join(desktop, 'public/complements-catalog.json'), 'utf8')), desktop);
const target = path.join(root, 'src/data/complements-catalog.json');
const json = `${JSON.stringify(source, null, 2)}\n`;
if (process.argv.includes('--check')) {
  if (fs.readFileSync(target, 'utf8') !== json) throw new Error('Catalog snapshot differs from Desktop; run pnpm run catalog:import');
} else {
  fs.writeFileSync(target, json);
}
console.log(`Catalog ${process.argv.includes('--check') ? 'checked' : 'imported'}: ${source.items.length} entries`);
