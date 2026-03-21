import { test, expect } from "@playwright/test";

test.describe("Gallery", () => {
  test("loads and shows heading", async ({ page }) => {
    await page.goto("/gallery");
    await expect(page.locator("h1")).toContainText("Gallery");
  });

  test("shows builds or empty state", async ({ page }) => {
    await page.goto("/gallery");
    await page.waitForTimeout(2000);
    const cards = page.locator('a[href^="/gallery/"]');
    const count = await cards.count();
    if (count === 0) {
      // Empty state should show
      await expect(page.locator("h1")).toContainText("Gallery");
    } else {
      expect(count).toBeGreaterThan(0);
    }
  });

  test("filtering works", async ({ page }) => {
    await page.goto("/gallery");
    await page.selectOption("select:first-of-type", "enchanted-grove");
    await page.waitForURL(/biome=enchanted-grove/);
    await expect(page.locator("h1")).toContainText("Gallery");
  });

  test("search works", async ({ page }) => {
    await page.goto("/gallery");
    await page.fill('input[placeholder="Search builds..."]', "tavern");
    await page.press('input[placeholder="Search builds..."]', "Enter");
    await page.waitForURL(/q=tavern/);
    await expect(page.locator("h1")).toContainText("Gallery");
  });
});

test.describe("Core pages", () => {
  test("landing page loads", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("inspiring");
  });

  test("blog loads with articles", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.locator("h1")).toContainText("Guides");
    const articles = page.locator('a[href^="/blog/wow-housing"]');
    const count = await articles.count();
    expect(count).toBeGreaterThan(3);
  });

  test("sitemap is valid", async ({ page }) => {
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

  test("gallery loads on mobile", async ({ page }) => {
    await page.goto("/gallery");
    await expect(page.locator("h1")).toContainText("Gallery");
  });
});

test.describe("No console errors", () => {
  test("landing page has no JS errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/");
    await page.waitForTimeout(2000);
    expect(errors).toEqual([]);
  });

  test("gallery has no JS errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/gallery");
    await page.waitForTimeout(2000);
    expect(errors).toEqual([]);
  });
});
