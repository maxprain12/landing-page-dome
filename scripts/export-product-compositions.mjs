import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '@playwright/test';
const base = new URL(process.argv[2] ?? 'http://127.0.0.1:14330');
if (!['127.0.0.1', 'localhost'].includes(base.hostname)) throw new Error('Export from the local built website.');
const output = path.resolve('public/product-captures/compositions');
fs.mkdirSync(output, { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1680, height: 1100 }, deviceScaleFactor: 1 });
  for (const locale of ['', '/en']) for (const [product, pathname] of [['cms', '/complementos/dome-cms'], ['extension', '/extension'], ['companion', '/companion']]) {
    await page.goto(new URL(`${locale}${pathname}`, base).href);
    await page.evaluate(() => document.fonts.ready);
    const stage = page.locator(`[data-product-visual="${product}"] .visual-stage`);
    await stage.scrollIntoViewIfNeeded();
    await stage.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
    await stage.screenshot({ path: path.join(output, `${product}${locale ? '-en' : ''}.png`) });
  }
} finally { await browser.close(); }
console.log('Exported six bilingual compositions with the editorial flow illustrations.');
