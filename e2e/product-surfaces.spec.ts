import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const locale of ["", "/en"]) {
  test(`product diagrams and functions replace editions ${locale || "es"}`, async ({
    page,
  }) => {
    for (const product of ["extension", "companion"]) {
      await page.goto(`${locale}/${product}`);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator(".connection")).toBeVisible();
      await expect(page.locator(".pp-feature")).toHaveCount(3);
      await expect(page.locator(".pp-card")).toHaveCount(0);
      await expect(
        page.locator('main a[href="#manual"]'),
      ).toBeVisible();
      const results = await new AxeBuilder({ page }).analyze();
      expect(
        results.violations.filter(
          (item) => item.impact === "critical" || item.impact === "serious",
        ),
      ).toEqual([]);
      await page.setViewportSize({ width: 390, height: 844 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
    await page.goto(`${locale}/`);
    await expect(
      page.locator('a[href$="/pro"], a[href$="/study"], a[href$="/dev"]'),
    ).toHaveCount(0);
    await expect(page.locator('[data-feature-tab="learning"]')).toContainText(
      locale ? "Learning" : "Aprendizaje",
    );
  });
}
test("category sidebar, sorting and CMS detail work on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/complementos?category=workflows");
  await expect(page.locator("[data-catalog-card]:visible")).toHaveCount(3);
  await page.locator('[data-category-link="agents"]').click();
  await expect(page.locator("[data-catalog-card]:visible")).toHaveCount(5);
  await page.locator('[data-category-link=""]').click();
  await page.locator("[data-catalog-sort]").selectOption("name");
  const names = await page
    .locator("[data-catalog-card]")
    .evaluateAll((cards) =>
      cards.map((card) => (card as HTMLElement).dataset.name!),
    );
  expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b, "es")));
  await page.goto("/complementos/dome-cms");
  await expect(page.locator(".market-flow")).toContainText("GitHub");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
