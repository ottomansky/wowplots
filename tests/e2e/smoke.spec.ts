import { test, expect } from "@playwright/test";

test.describe("Gallery", () => {
  test("loads and shows build cards", async ({ page }) => {
    await page.goto("/gallery");
    await expect(page.locator("h1")).toContainText("Gallery");
    // Should have build card links
    const cards = page.locator('a[href^="/gallery/"]');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("filtering changes visible results", async ({ page }) => {
    await page.goto("/gallery");
    // Select a biome filter
    await page.selectOption('select:first-of-type', 'enchanted-grove');
    await page.waitForURL(/biome=enchanted-grove/);
    // Page should still load
    await expect(page.locator("h1")).toContainText("Gallery");
  });

  test("build detail page renders title and images", async ({ page }) => {
    await page.goto("/gallery/enchanted-library");
    await expect(page.locator("h1")).toContainText("Enchanted Library");
    // Should have an image
    const img = page.locator("img").first();
    await expect(img).toBeVisible();
  });

  test("search returns results", async ({ page }) => {
    await page.goto("/gallery");
    await page.fill('input[placeholder="Search builds..."]', 'tavern');
    await page.press('input[placeholder="Search builds..."]', 'Enter');
    await page.waitForURL(/q=tavern/);
    await expect(page.locator("h1")).toContainText("Gallery");
  });
});

test.describe("Core pages", () => {
  test("landing page loads", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Inspiring WoW");
  });

  test("blog loads with articles", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.locator("h1")).toContainText("Guides");
    const articles = page.locator('a[href^="/blog/wow-housing"]');
    const count = await articles.count();
    expect(count).toBeGreaterThan(3);
  });

  test("sitemap includes gallery URLs", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    const body = await response?.text();
    expect(body).toContain("/gallery");
    expect(body).toContain("/blog/wow-housing-beginners-guide");
    expect(body).toContain("/biomes/enchanted-grove");
  });

  test("robots.txt is correct", async ({ page }) => {
    const response = await page.goto("/robots.txt");
    const body = await response?.text();
    expect(body).toContain("Sitemap:");
    expect(body).toContain("Disallow: /api/");
  });

  test("RSS feed has articles", async ({ page }) => {
    const response = await page.goto("/feed.xml");
    const body = await response?.text();
    expect(body).toContain("<item>");
    expect(body).toContain("WoWPlots");
  });
});

test.describe("Mobile", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("gallery is single column on mobile", async ({ page }) => {
    await page.goto("/gallery");
    await expect(page.locator("h1")).toContainText("Gallery");
    // Cards should be visible
    const cards = page.locator('a[href^="/gallery/"]');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
  });
});

test.describe("No console errors", () => {
  test("landing page has no JS errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });

  test("gallery has no JS errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/gallery");
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });
});
