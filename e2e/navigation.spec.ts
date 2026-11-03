import { test, expect } from '@playwright/test';

const localizedRoutes = [
  '/sobre-nosotros',
  '/para/estudiantes',
  '/para/marketing',
  '/para/equipos',
];

for (const locale of ['es', 'en'] as const) {
  const prefix = locale === 'en' ? '/en' : '';
  const resources = locale === 'es' ? 'Recursos' : 'Resources';
  const product = locale === 'es' ? 'Producto' : 'Product';

  test(`${locale}: desktop menus expose the planned destinations`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${prefix}/`);

    const resourceButton = page.locator('.nav-links').getByRole('button', { name: resources });
    await resourceButton.focus();
    await resourceButton.press('Enter');
    await expect(resourceButton).toHaveAttribute('aria-expanded', 'true');
    const resourceMenu = page.locator('#nav-menu-resources');
    await expect(resourceMenu.getByRole('link', { name: locale === 'es' ? 'Sobre nosotros' : 'About us' })).toHaveAttribute('href', `${prefix}/sobre-nosotros`);
    await expect(resourceMenu.getByRole('link', { name: locale === 'es' ? 'Complementos' : 'Add-ons' })).toHaveAttribute('href', `${prefix}/complementos`);
    await expect(resourceMenu.getByRole('link', { name: locale === 'es' ? 'Iniciar sesión' : 'Log in' })).toHaveAttribute('href', /.+/);

    const productButton = page.locator('.nav-links').getByRole('button', { name: product });
    await productButton.click();
    await expect(resourceButton).toHaveAttribute('aria-expanded', 'false');
    const productMenu = page.locator('#nav-menu-product');
    await expect(productMenu.getByRole('link', { name: locale === 'es' ? 'Estudiantes' : 'Students' })).toHaveAttribute('href', `${prefix}/para/estudiantes`);
    await expect(productMenu.getByRole('link', { name: locale === 'es' ? 'Gestión de equipos' : 'Team management' })).toHaveAttribute('href', `${prefix}/para/equipos`);
    await expect(productMenu.getByRole('link', { name: 'Many agents' })).toHaveAttribute('href', `${prefix}/funciones/agents`);
    await page.keyboard.press('Escape');
    await expect(productButton).toHaveAttribute('aria-expanded', 'false');
    const internalDestinations = await page.locator('.nav-mega a[href^="/"]').evaluateAll((links) =>
      [...new Set(links.map((link) => link.getAttribute('href')).filter((href): href is string => !!href))],
    );
    for (const href of internalDestinations) {
      const response = await page.request.get(href);
      expect(response.ok(), `${locale}: ${href}`).toBeTruthy();
    }
    await expect(page.locator('.nav-links')).not.toContainText('Precios');
    await expect(page.locator('.nav-links')).not.toContainText('Pricing');
    await expect(page.locator('.ft')).not.toContainText(locale === 'es' ? 'Precios' : 'Pricing');
  });

  test(`${locale}: mobile menu opens both groups and closes with Escape`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${prefix}/`);
    const toggle = page.locator('[data-nav-toggle]');
    await toggle.click();
    const panel = page.locator('#nav-panel');
    await panel.locator('summary', { hasText: product }).click();
    await expect(panel.getByRole('link', { name: locale === 'es' ? 'Marketing' : 'Marketing' })).toHaveAttribute('href', `${prefix}/para/marketing`);
    await panel.locator('summary', { hasText: resources }).click();
    await expect(panel.getByRole('link', { name: locale === 'es' ? 'Manuales' : 'Manuals' })).toHaveAttribute('href', `${prefix}/manual`);
    await expect(panel.locator('details').first()).toHaveAttribute('open', '');
    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test(`${locale}: new pages render and alternate language paths resolve`, async ({ page }) => {
    for (const route of localizedRoutes) {
      const response = await page.goto(`${prefix}${route}`);
      expect(response?.ok(), `${prefix}${route}`).toBeTruthy();
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute('href', new RegExp(`/en${route}$`));
    }
  });
}
