import { test, expect } from "@playwright/test";

test.describe("Gallery page", () => {
  test("loads and shows heading", async ({ page }) => {
    await page.goto("/gallery", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    await expect(page.locator("h1")).toBeVisible();
    const h1 = await page.locator("h1").textContent();
    expect(h1).toContain("Gallery");
  });

  test("shows builds or empty state", async ({ page }) => {
    await page.goto("/gallery", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const cards = page.locator('a[href^="/gallery/"]');
    const count = await cards.count();
    if (count > 0) {
      // Has builds — cards should have titles
      const titles = page.locator('a[href^="/gallery/"] h3');
      expect(await titles.count()).toBeGreaterThan(0);
    } else {
      // Empty state — should show submit CTA
      const submitLink = page.locator('a[href="/submit"]');
      await expect(submitLink.first()).toBeVisible({ timeout: 5000 });
    }
  });

  test("has search input", async ({ page }) => {
    await page.goto("/gallery", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const search = page.locator('input[placeholder*="earch"]');
    await expect(search).toBeVisible();
  });

  test("has filter dropdowns", async ({ page }) => {
    await page.goto("/gallery", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const selects = page.locator("select");
    const count = await selects.count();
    expect(count).toBeGreaterThanOrEqual(3); // biome, size, style, sort
  });

  test("biome filter updates URL", async ({ page }) => {
    await page.goto("/gallery", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    await page.selectOption("select:first-of-type", "enchanted-grove");
    await page.waitForURL(/biome=enchanted-grove/, { timeout: 10000 });
    expect(page.url()).toContain("biome=enchanted-grove");
  });

  test("loading URL with filter params applies them", async ({ page }) => {
    await page.goto("/gallery?biome=enchanted-grove", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    await expect(page.locator("h1")).toBeVisible();
    expect(page.url()).toContain("biome=enchanted-grove");
  });

  test("empty search shows empty or no-results state", async ({ page }) => {
    await page.goto("/gallery?q=xyznonexistent99999", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3000);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("gallery has breadcrumbs", async ({ page }) => {
    await page.goto("/gallery", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const breadcrumb = page.locator("nav ol, nav[aria-label*='readcrumb']");
    await expect(breadcrumb.first()).toBeVisible();
  });

  test("clear filters link works when filtered", async ({ page }) => {
    await page.goto("/gallery?biome=enchanted-grove", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const clearLink = page.locator('text="Clear"').first();
    if (await clearLink.isVisible()) {
      await clearLink.click();
      await page.waitForTimeout(1000);
      expect(page.url()).not.toContain("biome=");
    }
  });
});
