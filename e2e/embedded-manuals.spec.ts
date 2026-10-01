import { test, expect } from '@playwright/test';
import catalog from '../src/data/complements-catalog.json' with { type: 'json' };

for (const locale of ['', '/en']) {
  test(`every add-on includes its usable manual ${locale || 'es'}`, async ({ page }) => {
    for (const item of catalog.items) {
      await page.goto(`${locale}/complementos/${item.slug}`);
      const manual = page.locator(`[data-embedded-manual="${item.manual}"]`);
      await expect(manual).toBeVisible();
      await expect(manual.locator('.embedded-copy')).toContainText(locale ? 'Expected result' : 'Resultado esperado');
      await expect(manual.locator('.embedded-copy')).toContainText(locale ? 'If something fails' : 'Si algo falla');
      const missing = await page.evaluate(() => [...document.querySelectorAll<HTMLAnchorElement>('main a[href^="#"]')].filter(a => !document.getElementById(decodeURIComponent(a.hash.slice(1)))).map(a => a.hash));
      expect(missing).toEqual([]);
      const duplicates = await page.evaluate(() => [...document.querySelectorAll('[id]')].map(el => el.id).filter((id, index, ids) => ids.indexOf(id) !== index));
      expect(duplicates).toEqual([]);
      await expect(page.locator('main a[href*="/manual/cms"],main a[href*="/manual/complements"]')).toHaveCount(0);
    }
  });

  test(`manual index points to app guides; products embed their guides ${locale || 'es'}`, async ({ page }) => {
    await page.goto(`${locale}/manual`);
    await expect(page.locator('main a[href*="/manual/cms"],main a[href*="/manual/complements"],main a[href*="/manual/extension"],main a[href*="/manual/companion"]')).toHaveCount(0);
    for (const [route, slug] of [['complementos', 'complements'], ['extension', 'extension'], ['companion', 'companion'], ['complementos/dome-cms', 'cms']]) {
      await page.goto(`${locale}/${route}`);
      await expect(page.locator(`[data-embedded-manual="${slug}"]`)).toBeVisible();
      await page.locator('main a[href="#manual"]:visible').first().click();
      await expect(page).toHaveURL(/#manual$/);
      if (slug !== 'complements') {
        const socialImage = await page.locator('meta[property="og:image"]').getAttribute('content');
        expect((await page.request.get(new URL(socialImage!).pathname)).status()).toBe(200);
        const stage = page.locator('[data-product-visual]');
        await expect(stage).toBeVisible();
        await expect(stage.locator('[data-flow-illustration]')).toBeVisible();
        await expect(stage.locator('.stage-background')).toHaveJSProperty('complete', true);
        expect(await stage.locator('.stage-background').evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(1000);
        await stage.locator('summary').click();
        await expect(stage.locator('.capture-gallery')).toBeVisible();
      }
      await page.setViewportSize({ width: 390, height: 844 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  });
}
