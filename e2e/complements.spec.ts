import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const locale of ['', '/en']) {
  test(`catalog filters, search and CMS link ${locale || 'es'}`, async ({ page }) => {
    await page.goto(`${locale}/complementos`);
    const cards = page.locator('[data-catalog-card]');
    await expect(cards).toHaveCount(12);
    await expect(cards.first()).toContainText('Dome CMS');
    await page.locator('[data-catalog-category]').selectOption('plugins');
    await expect(page.locator('[data-catalog-card]:visible')).toHaveCount(1);
    await page.locator('[data-catalog-search]').fill('missing-addon');
    await expect(page.locator('[data-catalog-empty]')).toBeVisible();
    await page.locator('[data-catalog-search]').fill('cms');
    await expect(page.locator('[data-catalog-empty]')).toBeHidden();
    await cards.first().getByRole('link').click();
    await expect(page.locator('h1')).toHaveText('Dome CMS');
    await expect(page.locator('a[href="dome://complements/plugins/dome-cms"]')).toBeVisible();
    await expect(page.locator('main a[href$="/download"]').first()).toBeVisible();
    await expect(page.locator('main a[href$="/manual/cms"]')).toBeVisible();
  });

  test(`features and manuals connect ${locale || 'es'}`, async ({ page }) => {
    await page.goto(`${locale}/funciones`);
    await expect(page.locator('.explore-grid article')).toHaveCount(10);
    await page.locator(`main a[href="${locale}/funciones/many"]`).click();
    await expect(page.locator(`main a[href="${locale}/manual/many"]`)).toBeVisible();
    await page.locator(`main a[href="${locale}/manual/many"]`).click();
    await expect(page.locator('h1')).toHaveCount(1);
    const response = await page.request.get(`${locale}/rss.xml`);
    expect(await response.text()).not.toContain('<item>');
  });
}

test('mobile catalog and keyboard filters remain accessible', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/complementos');
  await page.getByRole('button', { name: /abrir menú/i }).click();
  await expect(page.locator('.nav-panel').getByRole('link', { name: 'App móvil', exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('.nav-panel')).toBeHidden();
  await page.locator('[data-catalog-search]').focus();
  await page.keyboard.type('cms');
  await expect(page.locator('[data-catalog-card]:visible')).toHaveCount(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((item) => item.impact === 'critical' || item.impact === 'serious')).toEqual([]);
});
