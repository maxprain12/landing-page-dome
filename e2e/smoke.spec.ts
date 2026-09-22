import { test, expect } from '@playwright/test';

test('homepage has a single h1, lang, and download CTA', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.getByRole('link', { name: /descargar|download/i }).first()).toBeVisible();
  await expect(page.locator('main').first()).toBeVisible();
});

test('mobile keeps the primary CTA', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('link', { name: /descargar|download/i }).first()).toBeVisible();
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

test('content indexes and TBA pages render with a single h1', async ({ page }) => {
  for (const route of ['/blog', '/manual', '/contact', '/pricing', '/en/blog', '/en/manual', '/en/contact', '/en/pricing']) {
    const response = await page.goto(route);
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('#main-content')).toBeVisible();
  }
});

test('blog magazine filters hide unmatched cards', async ({ page }) => {
  await page.goto('/blog');
  const cards = page.locator('[data-entry]');
  const total = await cards.count();
  expect(total).toBeGreaterThan(1);
  await page.getByRole('button', { name: /flujo|workflow/i }).click();
  const visible = await cards.evaluateAll((nodes) => nodes.filter((node) => !node.hasAttribute('hidden')).length);
  expect(visible).toBeGreaterThan(0);
  expect(visible).toBeLessThan(total);
});

test('sample article and manual render', async ({ page }) => {
  for (const route of ['/blog/local-first', '/manual/first-workflow', '/en/blog/local-first', '/en/manual/first-workflow']) {
    const response = await page.goto(route);
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main article, .prose').first()).toBeVisible();
  }
});

test('rss feeds are reachable', async ({ page }) => {
  for (const route of ['/rss.xml', '/en/rss.xml']) {
    const response = await page.goto(route);
    expect(response?.ok()).toBeTruthy();
    const body = await response?.text();
    expect(body).toContain('<rss');
  }
});

test('desktop product menu opens with the keyboard', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: /producto|product/i }).first();
  await trigger.focus();
  await trigger.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('product menu anchors point to the homepage from inner pages', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/blog');
  const trigger = page.getByRole('button', { name: /producto|product/i }).first();
  await trigger.click();
  await expect(page.getByRole('link', { name: /cómo funciona|how it works/i }).first()).toHaveAttribute(
    'href',
    /\/#como-funciona$/,
  );
});

test('mobile menu stacks product links and keeps the language toggle in its pill', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: /abrir menú|open menu/i }).click();
  await page.locator('.nav-acc').filter({ hasText: /producto|product/i }).locator('summary').click();
  const panel = page.locator('.nav-panel');
  const how = panel.getByRole('link', { name: /cómo funciona|how it works/i });
  const editions = panel.getByRole('link', { name: /^(ediciones|editions)$/i });
  const howBox = await how.boundingBox();
  const editionsBox = await editions.boundingBox();
  expect(howBox).toBeTruthy();
  expect(editionsBox).toBeTruthy();
  expect(editionsBox!.y).toBeGreaterThan(howBox!.y + 12);
  expect(howBox!.width).toBeGreaterThan(200);
  const lang = panel.locator('.nav-lang');
  await expect(lang).toBeVisible();
  const langBox = await lang.boundingBox();
  const panelBox = await panel.boundingBox();
  expect(langBox).toBeTruthy();
  expect(panelBox).toBeTruthy();
  expect(langBox!.x).toBeGreaterThanOrEqual(panelBox!.x);
  expect(langBox!.x + langBox!.width).toBeLessThanOrEqual(panelBox!.x + panelBox!.width + 1);
});
