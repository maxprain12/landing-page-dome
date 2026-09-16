import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/** Homepage carousel uses role=tablist with buttons; tracked, do not add new critical ids. */
const RATCHET_CRITICAL_IDS = new Set(['aria-required-children']);

async function expectNoCriticalAxe(page: Page, { allowRatchet = false } = {}) {
  const results = await new AxeBuilder({ page }).analyze();
  const critical = results.violations.filter((item) => item.impact === 'critical');
  const blocking = allowRatchet
    ? critical.filter((item) => !RATCHET_CRITICAL_IDS.has(item.id))
    : critical;
  expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
}

test('homepage has no new critical axe violations', async ({ page }) => {
  await page.goto('/');
  await expectNoCriticalAxe(page, { allowRatchet: true });
});

test('legal pages have no critical axe violations', async ({ page }) => {
  for (const route of ['/privacy', '/terms']) {
    await page.goto(route);
    await expectNoCriticalAxe(page);
  }
});
