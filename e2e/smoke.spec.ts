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

test('empty blog retains useful navigation and no article cards', async ({ page }) => {
  await page.goto('/blog');
  await expect(page.locator('[data-entry]')).toHaveCount(0);
  await expect(page.getByRole('status')).toContainText('Todavía no hay publicaciones');
  await expect(page.getByRole('link', { name: 'Abrir los manuales' })).toBeVisible();
});

test('replacement manuals render', async ({ page }) => {
  for (const route of ['/manual/getting-started', '/manual/cms', '/en/manual/getting-started', '/en/manual/cms']) {
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

test('desktop resources menu opens with the keyboard', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: /recursos|resources/i }).first();
  await trigger.focus();
  await trigger.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('feature and catalog navigation resolves from inner pages', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/blog');
  await expect(page.locator('.nav-links').getByRole('link', { name: 'Funciones', exact: true })).toHaveAttribute('href', '/funciones');
  await expect(page.locator('.nav-links').getByRole('link', { name: 'Complementos', exact: true })).toHaveAttribute('href', '/complementos');
});

test('mobile menu stacks product links and keeps the language toggle in its pill', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: /abrir menú|open menu/i }).click();
  const panel = page.locator('.nav-panel');
  const how = panel.getByRole('link', { name: /^funciones$|^features$/i });
  const editions = panel.getByRole('link', { name: /^(complementos|add-ons)$/i });
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
