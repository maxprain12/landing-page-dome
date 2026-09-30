import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const catalog = read('src/data/complements-catalog.json');
const features = read('src/data/features.json');
if (catalog.schemaVersion !== 1 || !Array.isArray(catalog.items)) throw new Error('Unsupported catalog');
const ids = new Set();
const slugs = new Set();
for (const item of catalog.items) {
  const key = `${item.category}/${item.id}`;
  if (ids.has(key) || slugs.has(item.slug)) throw new Error(`Duplicate catalog entry: ${key}`);
  ids.add(key); slugs.add(item.slug);
  if (!['plugins', 'agents', 'workflows', 'skills', 'mcp'].includes(item.category)) throw new Error(`Invalid category: ${key}`);
  if (!item.version || !item.author || !item.name || !Array.isArray(item.permissions)) throw new Error(`Incomplete entry: ${key}`);
  for (const locale of ['es', 'en']) {
    const copy = item.locales[locale];
    if (!copy?.body || !copy.description || !copy.requirements?.length || !copy.useCases?.length) throw new Error(`Missing translation: ${key}/${locale}`);
    if (!fs.existsSync(path.join(root, `src/content/manual/${locale}/${item.manual}.md`))) throw new Error(`Missing manual: ${key}/${locale}`);
  }
}
for (const feature of features) {
  for (const locale of ['es', 'en']) {
    if (!feature.locales[locale]?.title || !feature.locales[locale].capabilities?.length) throw new Error(`Missing feature copy: ${feature.slug}/${locale}`);
    if (!fs.existsSync(path.join(root, `src/content/manual/${locale}/${feature.manual}.md`))) throw new Error(`Missing feature manual: ${feature.slug}/${locale}`);
  }
}
console.log(`Complement content checked: ${catalog.items.length} entries, ${features.length} features`);
