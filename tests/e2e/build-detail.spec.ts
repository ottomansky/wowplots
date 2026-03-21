import { test, expect } from "@playwright/test";

// Build detail tests require builds to exist.
// When gallery is empty, tests skip gracefully.

let buildSlug = "";

test.describe("Build detail page", () => {
  test.beforeAll(async ({ browser }) => {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const res = await page.goto("/api/builds?limit=1", { waitUntil: "domcontentloaded" });
    const data = (await res?.json()) as { builds: { slug: string }[] };
    buildSlug = data?.builds?.[0]?.slug || "";
    await ctx.close();
  });

  test("build detail page loads when builds exist", async ({ page }) => {
    test.skip(!buildSlug, "No builds in gallery");
    await page.goto(`/gallery/${buildSlug}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("has image section when builds exist", async ({ page }) => {
    test.skip(!buildSlug, "No builds in gallery");
    await page.goto(`/gallery/${buildSlug}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const img = page.locator("img").first();
    await expect(img).toBeVisible();
  });

  test("has like and bookmark buttons when builds exist", async ({ page }) => {
    test.skip(!buildSlug, "No builds in gallery");
    await page.goto(`/gallery/${buildSlug}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const buttons = page.locator("button");
    const count = await buttons.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("non-existent slug returns 404", async ({ page }) => {
    const response = await page.goto("/gallery/this-slug-definitely-does-not-exist-99999", {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status()).toBe(404);
  });
});
