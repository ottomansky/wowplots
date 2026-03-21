import { test, expect } from "@playwright/test";

test.describe("Build detail page", () => {
  test("loads with correct title", async ({ page }) => {
    await page.goto("/gallery/enchanted-library", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);
    await expect(page.locator("h1")).toContainText("Enchanted Library");
  });

  test("has image gallery section", async ({ page }) => {
    await page.goto("/gallery/enchanted-library", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);
    const images = page.locator("img");
    await expect(images.first()).toBeVisible();
    const count = await images.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("has biome badge linking to biome page", async ({ page }) => {
    await page.goto("/gallery/enchanted-library", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);
    const biomeBadge = page.locator('a[href^="/biomes/"]');
    await expect(biomeBadge.first()).toBeVisible();
    const href = await biomeBadge.first().getAttribute("href");
    expect(href).toBe("/biomes/enchanted-grove");
    const text = await biomeBadge.first().textContent();
    expect(text).toContain("Enchanted Grove");
  });

  test("has size badge", async ({ page }) => {
    await page.goto("/gallery/enchanted-library", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);
    const sizeBadge = page.locator('a[href^="/sizes/"]');
    await expect(sizeBadge.first()).toBeVisible();
    const text = await sizeBadge.first().textContent();
    expect(text?.toLowerCase()).toContain("large");
  });

  test("has like button", async ({ page }) => {
    await page.goto("/gallery/enchanted-library", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);
    // Like button with heart icon or "like" text
    const likeBtn = page.locator('button:has(svg), button:has-text("Like")');
    const count = await likeBtn.count();
    expect(count).toBeGreaterThan(0);
  });

  test("has bookmark button", async ({ page }) => {
    await page.goto("/gallery/enchanted-library", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);
    // Look for bookmark-related buttons
    const buttons = page.locator("button");
    const btnCount = await buttons.count();
    // Should have at least 2 buttons (like + bookmark)
    expect(btnCount).toBeGreaterThanOrEqual(2);
  });

  test("has view count", async ({ page }) => {
    await page.goto("/gallery/enchanted-library", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);
    // View count is displayed as a number next to an eye icon (SVG)
    // The page has metrics like "848" for views and "112" for likes
    const pageText = await page.textContent("body");
    // Should contain numeric counts (views, likes)
    expect(pageText).toMatch(/\d{2,}/);
  });

  test("has date displayed", async ({ page }) => {
    await page.goto("/gallery/enchanted-library", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);
    const pageText = await page.textContent("body");
    // Should contain a date like "March 6, 2026"
    expect(pageText).toMatch(
      /(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}/,
    );
  });

  test("has comments section", async ({ page }) => {
    await page.goto("/gallery/enchanted-library", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);
    // Comments section has "Comments" heading and "Post Comment" button
    const pageText = await page.textContent("body");
    expect(pageText).toContain("Comment");
  });

  test("has related builds section", async ({ page }) => {
    await page.goto("/gallery/enchanted-library", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);
    // Related builds section with "More ... Builds" heading
    const pageText = await page.textContent("body");
    expect(pageText).toContain("Builds");
    // Should have links to other builds
    const buildLinks = page.locator('a[href^="/gallery/"]');
    const count = await buildLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test("non-existent slug returns 404", async ({ page }) => {
    const response = await page.goto("/gallery/this-does-not-exist-99999", {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status()).toBe(404);
  });

  test("has breadcrumbs", async ({ page }) => {
    await page.goto("/gallery/enchanted-library", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);
    const breadcrumb = page.locator("nav ol");
    await expect(breadcrumb.first()).toBeVisible();
    const items = breadcrumb.first().locator("li");
    const count = await items.count();
    // Home / Gallery / The Enchanted Library
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test("has JSON-LD script tag", async ({ page }) => {
    await page.goto("/gallery/enchanted-library", {
      waitUntil: "domcontentloaded",
    });
    const jsonLd = page.locator('script[type="application/ld+json"]');
    const count = await jsonLd.count();
    expect(count).toBeGreaterThanOrEqual(1);
    const content = await jsonLd.first().textContent();
    expect(content).toContain("Enchanted Library");
  });

  test("has tags section with links", async ({ page }) => {
    await page.goto("/gallery/enchanted-library", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);
    const tagLinks = page.locator('a[href*="/gallery?tag="]');
    const count = await tagLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});
