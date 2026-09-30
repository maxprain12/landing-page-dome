import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
const root = new URL('../../', import.meta.url);

test('production host serves replacements, redirects old manuals and returns 410 for retired posts', async (t) => {
  const port = 14329;
  const child = spawn(process.execPath, ['scripts/serve.mjs'], { cwd: root, env: { ...process.env, PORT: String(port) }, stdio: ['ignore', 'pipe', 'pipe'] });
  t.after(() => child.kill());
  await Promise.race([once(child.stdout, 'data'), once(child, 'exit').then(() => { throw new Error('Host exited'); })]);
  const base = `http://127.0.0.1:${port}`;
  for (const locale of ['', '/en']) {
    for (const slug of ['pdf-to-follow-up', 'local-first', 'many-with-ollama']) {
      const response = await fetch(`${base}${locale}/blog/${slug}`, { method: 'HEAD' });
      assert.equal(response.status, 410);
    }
    for (const [slug, replacement] of [['first-workflow', 'getting-started'], ['contacts', 'integrations'], ['email-and-social', 'integrations']]) {
      const response = await fetch(`${base}${locale}/manual/${slug}/`, { redirect: 'manual' });
      assert.equal(response.status, 301);
      assert.equal(response.headers.get('location'), `${locale}/manual/${replacement}`);
    }
    assert.equal((await fetch(`${base}${locale}/manual/library`)).status, 200);
    assert.equal((await fetch(`${base}${locale}/complementos/dome-cms`)).status, 200);
    const rss = await (await fetch(`${base}${locale}/rss.xml`)).text();
    assert.match(rss, /<rss/);
    assert.doesNotMatch(rss, /<item>/);
  }
  const sitemap = fs.readFileSync(new URL('dist/sitemap-0.xml', root), 'utf8');
  assert.doesNotMatch(sitemap, /\/blog\/(pdf-to-follow-up|local-first|many-with-ollama)/);
});

test('generated feature, add-on and manual links resolve in both locales', () => {
  const dist = new URL('dist/', root);
  function walk(folder) {
    for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
      const file = path.join(folder, entry.name);
      if (entry.isDirectory()) walk(file);
      else if (entry.name.endsWith('.html')) {
        for (const match of fs.readFileSync(file, 'utf8').matchAll(/href="(\/(?:en\/)?(?:manual|complementos|funciones|blog)(?:\/[^"#?]*)?)(?:[?#][^"]*)?"/g)) {
          const pathname = match[1].replace(/\/+$/, '');
          assert.ok(fs.existsSync(new URL(`.${pathname}/index.html`, dist)), `${file}: missing ${pathname}`);
        }
      }
    }
  }
  walk(fileURLToPath(dist));
});
