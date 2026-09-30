import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const release = {
  version: "99.1.0",
  date: "2026-09-30T10:00:00Z",
  channels: ["latest"],
  notesMarkdown: "## Updated\n- Current release from dl.dowi.es",
  assets: [
    {
      platform: "mac",
      arch: "x64",
      kind: "dmg",
      name: "Dome-99.1.0-intel.dmg",
      url: "https://dl.dowi.es/99.1.0/intel.dmg",
      size: 1024,
      sha512: "intel-checksum",
    },
    {
      platform: "linux",
      arch: "x64",
      kind: "flatpak",
      name: "Dome-99.1.0.flatpak",
      url: "https://dl.dowi.es/99.1.0/linux.flatpak",
      size: 2048,
      sha512: "flatpak-checksum",
    },
  ],
};
const index = {
  schemaVersion: 1,
  channels: { latest: release.version },
  releases: [release],
};
for (const locale of ["", "/en"]) {
  for (const section of ["download", "changelog"]) {
    test(`live ${section} waits without showing old versions ${locale || "es"}`, async ({
      page,
    }) => {
      let ready!: () => void;
      const wait = new Promise<void>((resolve) => {
        ready = resolve;
      });
      await page.route("**/releases-index.json", async (route) => {
        await wait;
        await route.fulfill({ json: index });
      });
      await page.goto(`${locale}/${section}`);
      await expect(page.locator("[data-release-skeleton]")).toBeVisible();
      await expect(page.locator("[data-release-ready]:visible")).toHaveCount(0);
      if (section === "download")
        await expect(page.locator("[data-live-version]")).toHaveText("");
      await expect(page.locator("[data-live-changelog] article")).toHaveCount(
        0,
      );
      await expect(page.locator("[data-download][href]")).toHaveCount(0);
      ready();
      await expect(page.locator("[data-live-releases]")).toHaveAttribute(
        "data-release-state",
        "ready",
      );
      await expect(page.locator("[data-release-status]")).toBeHidden();
      if (section === "download") {
        await expect(page.locator("[data-live-version]")).toHaveText("99.1.0");
        await expect(page.locator('[data-tab="win"]')).toBeHidden();
        await page.locator('[data-tab="mac"]').click();
        await expect(page.locator('[data-platform="mac"] h2')).toContainText(
          "Intel",
        );
        await expect(
          page.locator('[data-platform="mac"] [data-download]'),
        ).toHaveAttribute("href", release.assets[0].url);
        await page.locator('[data-tab="mac"]').press("ArrowRight");
        await expect(page.locator('[data-tab="linux"]')).toBeFocused();
        await expect(
          page.locator('[data-platform="linux"] [data-download]'),
        ).toHaveAttribute("href", release.assets[1].url);
      } else {
        await expect(page.locator("#v99\\.1\\.0")).toContainText(
          "Current release from dl.dowi.es",
        );
      }
      const results = await new AxeBuilder({ page }).analyze();
      expect(
        results.violations.filter(
          (item) => item.impact === "critical" || item.impact === "serious",
        ),
      ).toEqual([]);
    });
  }
}
test("failed fetch offers retry and never reveals a snapshot", async ({
  page,
}) => {
  let attempts = 0;
  await page.route("**/releases-index.json", (route) =>
    ++attempts === 1
      ? route.fulfill({ status: 502 })
      : route.fulfill({ json: index }),
  );
  await page.goto("/download");
  await expect(page.locator("[data-release-retry]")).toBeVisible();
  await expect(page.locator("[data-live-releases]")).toHaveAttribute(
    "aria-busy",
    "false",
  );
  await expect(page.locator("[data-release-ready]:visible")).toHaveCount(0);
  await page.locator("[data-release-retry]").click();
  await expect(page.locator("[data-live-version]")).toHaveText("99.1.0");
  await expect(page.locator("[data-release-status]")).toBeHidden();
});
test("malformed index is recoverable; a valid empty index shows the empty state", async ({
  page,
}) => {
  await page.route("**/releases-index.json", (route) =>
    route.fulfill({ json: { releases: "invalid" } }),
  );
  await page.goto("/changelog");
  await expect(page.locator("[data-release-retry]")).toBeVisible();
  await expect(page.locator("[data-live-changelog] article")).toHaveCount(0);
  await page.unroute("**/releases-index.json");
  await page.route("**/releases-index.json", (route) =>
    route.fulfill({ json: { schemaVersion: 1, channels: {}, releases: [] } }),
  );
  await page.locator("[data-release-retry]").click();
  await expect(page.locator("[data-changelog-empty]")).toBeVisible();
  await expect(page.locator("[data-release-status]")).toBeHidden();
});
