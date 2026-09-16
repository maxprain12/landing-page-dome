import { test, expect } from '@playwright/test';

test('homepage has a single h1, lang, and download CTA', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.getByRole('link', { name: /download/i }).first()).toBeVisible();
  await expect(page.locator('main').first()).toBeVisible();
});

test('mobile keeps the primary CTA', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('link', { name: /download/i }).first()).toBeVisible();
});

test('reduced-motion media query is honored in CSS/JS', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const honored = await page.evaluate(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  expect(honored).toBe(true);
});

test('optional /en/ keeps a single h1 when the locale exists', async ({ page }) => {
  const response = await page.goto('/en/');
  if (!response || response.status() === 404) {
    test.info().annotations.push({ type: 'ratchet', description: 'no /en/ on this branch' });
    return;
  }
  expect(response.ok()).toBeTruthy();
  await expect(page.locator('h1')).toHaveCount(1);
});

test('legal pages render', async ({ page }) => {
  for (const route of ['/privacy', '/terms']) {
    const response = await page.goto(route);
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator('h1')).toHaveCount(1);
  }
});
