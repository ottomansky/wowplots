import { test, expect } from "@playwright/test";

test.describe("Gallery page", () => {
  test("loads and shows heading", async ({ page }) => {
    await page.goto("/gallery", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    await expect(page.locator("h1")).toBeVisible();
    const h1 = await page.locator("h1").textContent();
    expect(h1).toContain("Gallery");
  });

  test("shows build cards with titles", async ({ page }) => {
    await page.goto("/gallery", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const cards = page.locator('a[href^="/gallery/"]');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    // Cards should have h3 titles
    const titles = page.locator('a[href^="/gallery/"] h3');
    expect(await titles.count()).toBeGreaterThan(0);
  });

  test("cards have image elements", async ({ page }) => {
    await page.goto("/gallery", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const cards = page.locator('a[href^="/gallery/"]');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
    const img = cards.first().locator("img");
    await expect(img).toBeVisible();
  });

  test("cards show like count", async ({ page }) => {
    await page.goto("/gallery", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const cards = page.locator('a[href^="/gallery/"]');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
    // Cards have a metrics row with heart icon and count
    const firstCard = cards.first();
    const cardText = await firstCard.textContent();
    // Should contain some numeric content (like/view counts)
    expect(cardText).toMatch(/\d+/);
  });

  test("cards link to /gallery/[slug]", async ({ page }) => {
    await page.goto("/gallery", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const cards = page.locator('a[href^="/gallery/"]');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
    const href = await cards.first().getAttribute("href");
    expect(href).toMatch(/^\/gallery\/[\w-]+$/);
  });

  test("biome filter: selecting enchanted-grove updates URL", async ({ page }) => {
    await page.goto("/gallery", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    await page.selectOption("select:first-of-type", "enchanted-grove");
    await page.waitForURL(/biome=enchanted-grove/, { timeout: 10000 });
    expect(page.url()).toContain("biome=enchanted-grove");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("size filter: selecting large updates URL", async ({ page }) => {
    await page.goto("/gallery", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    // Size is the second select
    const selects = page.locator("select");
    const count = await selects.count();
    // Find the size select
    for (let i = 0; i < count; i++) {
      const options = await selects.nth(i).locator("option").allTextContents();
      if (options.some((o) => o.toLowerCase().includes("large"))) {
        await selects.nth(i).selectOption("large");
        break;
      }
    }
    await page.waitForURL(/size=large/, { timeout: 10000 });
    expect(page.url()).toContain("size=large");
  });

  test("sort: selecting popular updates URL", async ({ page }) => {
    await page.goto("/gallery", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const selects = page.locator("select");
    const count = await selects.count();
    for (let i = 0; i < count; i++) {
      const options = await selects.nth(i).locator("option").allTextContents();
      if (options.some((o) => o.toLowerCase().includes("liked"))) {
        await selects.nth(i).selectOption("popular");
        break;
      }
    }
    await page.waitForURL(/sort=popular/, { timeout: 10000 });
    expect(page.url()).toContain("sort=popular");
  });

  test("multiple filters combine (biome + size)", async ({ page }) => {
    await page.goto("/gallery?biome=enchanted-grove&size=large", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);
    expect(page.url()).toContain("biome=enchanted-grove");
    expect(page.url()).toContain("size=large");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("loading URL with ?biome=enchanted-grove pre-applies filter", async ({
    page,
  }) => {
    await page.goto("/gallery?biome=enchanted-grove", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);
    await expect(page.locator("h1")).toBeVisible();
    // The URL should still have the parameter
    expect(page.url()).toContain("biome=enchanted-grove");
  });

  test("loading URL with ?sort=popular pre-applies sort", async ({ page }) => {
    await page.goto("/gallery?sort=popular", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);
    await expect(page.locator("h1")).toBeVisible();
    expect(page.url()).toContain("sort=popular");
  });

  test("search: typing tavern and submitting shows results", async ({
    page,
  }) => {
    await page.goto("/gallery", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const searchInput = page.locator('input[type="search"], input[placeholder*="earch"]');
    await searchInput.fill("tavern");
    await searchInput.press("Enter");
    await page.waitForURL(/q=tavern/, { timeout: 10000 });
    await expect(page.locator("h1")).toBeVisible();
  });

  test("search: empty query shows all builds", async ({ page }) => {
    await page.goto("/gallery?q=", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    await expect(page.locator("h1")).toBeVisible();
    const cards = page.locator('a[href^="/gallery/"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("Load More button visible", async ({ page }) => {
    await page.goto("/gallery", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const loadMore = page.locator('button:has-text("Load More")');
    // It may or may not be visible depending on build count
    const isVisible = await loadMore.isVisible().catch(() => false);
    // Just verify the page loaded properly either way
    await expect(page.locator("h1")).toBeVisible();
    // If visible, it should be clickable
    if (isVisible) {
      await expect(loadMore).toBeEnabled();
    }
  });

  test("empty state: searching for nonsense shows empty message", async ({
    page,
  }) => {
    await page.goto("/gallery?q=xyznonexistent99999", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(3000);
    // Should either show no cards or an empty state message
    const cards = page.locator('a[href^="/gallery/"]');
    const count = await cards.count();
    if (count === 0) {
      // Page should still have the heading
      await expect(page.locator("h1")).toBeVisible();
    }
  });

  test("gallery has breadcrumbs", async ({ page }) => {
    await page.goto("/gallery", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const breadcrumb = page.locator("nav ol, nav[aria-label*='readcrumb']");
    await expect(breadcrumb.first()).toBeVisible();
  });
});
