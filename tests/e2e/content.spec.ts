import { test, expect } from "@playwright/test";

test.describe("Blog index", () => {
  test("loads and shows heading", async ({ page }) => {
    await page.goto("/blog", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const h1 = await page.locator("h1").textContent();
    expect(h1).toContain("Guides");
  });

  test("shows article cards", async ({ page }) => {
    await page.goto("/blog", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const articles = page.locator('a[href^="/blog/"]');
    const count = await articles.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test("each card has title text", async ({ page }) => {
    await page.goto("/blog", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const articles = page.locator('a[href^="/blog/"]');
    const first = articles.first();
    await expect(first).toBeVisible();
    const text = await first.textContent();
    expect(text!.length).toBeGreaterThan(10);
  });

  test("cards have category badge", async ({ page }) => {
    await page.goto("/blog", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    // Category badges like "tutorial", "guide", "spotlight"
    const bodyText = await page.textContent("body");
    const hasCategory =
      bodyText!.includes("tutorial") ||
      bodyText!.includes("guide") ||
      bodyText!.includes("spotlight") ||
      bodyText!.includes("Tutorial") ||
      bodyText!.includes("Guide") ||
      bodyText!.includes("Spotlight");
    expect(hasCategory).toBe(true);
  });

  test("cards have reading time", async ({ page }) => {
    await page.goto("/blog", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const bodyText = await page.textContent("body");
    expect(bodyText).toMatch(/\d+\s*min\s*read/i);
  });
});

test.describe("Article page", () => {
  test("loads with proper title tag", async ({ page }) => {
    await page.goto("/blog/wow-housing-beginners-guide", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);
    const title = await page.title();
    expect(title).toContain("Beginner");
    expect(title).toContain("WoWPlots");
  });

  test("has h1 heading", async ({ page }) => {
    await page.goto("/blog/wow-housing-beginners-guide", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);
    await expect(page.locator("h1")).toContainText("Beginner");
  });

  test("has table of contents", async ({ page }) => {
    await page.goto("/blog/wow-housing-beginners-guide", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);
    // TOC should have links to sections
    const tocLinks = page.locator('a[href^="#"]');
    const count = await tocLinks.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test("has related articles section", async ({ page }) => {
    await page.goto("/blog/wow-housing-beginners-guide", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);
    // Related articles at bottom
    const relatedLinks = page.locator('a[href^="/blog/"]');
    const count = await relatedLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("has breadcrumbs", async ({ page }) => {
    await page.goto("/blog/wow-housing-beginners-guide", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);
    const breadcrumb = page.locator("nav ol");
    await expect(breadcrumb.first()).toBeVisible();
    const items = breadcrumb.first().locator("li");
    const count = await items.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });
});

test.describe("Taxonomy pages", () => {
  test("biome page loads with content", async ({ page }) => {
    await page.goto("/biomes/enchanted-grove", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);
    await expect(page.locator("h1")).toContainText("Enchanted Grove");
  });

  test("style page loads with content", async ({ page }) => {
    await page.goto("/styles/gothic", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    await expect(page.locator("h1")).toContainText("Gothic");
  });

  test("size page loads with content", async ({ page }) => {
    await page.goto("/sizes/large", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    await expect(page.locator("h1")).toContainText("Large");
  });

  test("about page loads with correct heading", async ({ page }) => {
    await page.goto("/about", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    await expect(page.locator("h1")).toContainText("About");
  });

  test("404 page shows for non-existent page", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist-12345", {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status()).toBe(404);
  });

  test("RSS feed returns XML with items", async ({ page }) => {
    const response = await page.goto("/feed.xml");
    const body = await response?.text();
    expect(body).toContain("<item>");
    expect(body).toContain("WoWPlots");
  });
});
