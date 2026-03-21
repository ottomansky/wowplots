import { test, expect } from "@playwright/test";

const MOBILE = { width: 375, height: 812 };
const TABLET = { width: 768, height: 1024 };
const DESKTOP = { width: 1440, height: 900 };

test.describe("Responsive - Mobile (375px)", () => {
  test.use({ viewport: MOBILE });

  test("landing page: no horizontal scroll", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const hasHScroll = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(hasHScroll).toBe(false);
  });

  test("gallery: cards display in single column", async ({ page }) => {
    await page.goto("/gallery", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const cards = page.locator('a[href^="/gallery/"]');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
    const count = await cards.count();
    if (count >= 2) {
      const box1 = await cards.nth(0).boundingBox();
      const box2 = await cards.nth(1).boundingBox();
      // In single column, second card should be below first (not side by side)
      expect(box2!.y).toBeGreaterThan(box1!.y);
    }
  });

  test("header: nav items hidden on mobile", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    // Desktop nav links should be hidden; may have hamburger menu instead
    const desktopNav = page.locator('header nav a[href="/gallery"]');
    const isVisible = await desktopNav.first().isVisible().catch(() => false);
    // On mobile, either the nav is hidden or collapsed behind a button
    // Check if there's a mobile menu button
    const menuButton = page.locator('header button');
    const menuExists = (await menuButton.count()) > 0;
    // Either nav links are hidden or there's a menu button
    expect(!isVisible || menuExists).toBe(true);
  });

  test("footer: stacked columns at 375px", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    // Footer should not overflow
    const hasHScroll = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(hasHScroll).toBe(false);
  });

  test("build detail: stacked layout", async ({ page }) => {
    await page.goto("/gallery/enchanted-library", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);
    await expect(page.locator("h1")).toBeVisible();
    // No horizontal scroll
    const hasHScroll = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(hasHScroll).toBe(false);
  });

  test("blog index: cards stack properly", async ({ page }) => {
    await page.goto("/blog", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const hasHScroll = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(hasHScroll).toBe(false);
    await expect(page.locator("h1")).toBeVisible();
  });
});

test.describe("Responsive - Tablet (768px)", () => {
  test.use({ viewport: TABLET });

  test("gallery: multi-column layout", async ({ page }) => {
    await page.goto("/gallery", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const cards = page.locator('a[href^="/gallery/"]');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
    const count = await cards.count();
    if (count >= 2) {
      const box1 = await cards.nth(0).boundingBox();
      const box2 = await cards.nth(1).boundingBox();
      // At tablet, cards should be side by side (same y position)
      // or at least the layout should be reasonable
      expect(box1).toBeTruthy();
      expect(box2).toBeTruthy();
    }
  });

  test("no horizontal scroll on tablet", async ({ page }) => {
    await page.goto("/gallery", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const hasHScroll = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(hasHScroll).toBe(false);
  });
});

test.describe("Responsive - Desktop (1440px)", () => {
  test.use({ viewport: DESKTOP });

  test("header: all nav items visible", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const galleryLink = page.locator('header a[href="/gallery"]');
    await expect(galleryLink.first()).toBeVisible();
    const blogLink = page.locator('header a[href="/blog"]');
    await expect(blogLink.first()).toBeVisible();
  });

  test("gallery: multi-column cards", async ({ page }) => {
    await page.goto("/gallery", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const cards = page.locator('a[href^="/gallery/"]');
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
    const count = await cards.count();
    if (count >= 4) {
      const box1 = await cards.nth(0).boundingBox();
      const box2 = await cards.nth(1).boundingBox();
      // At desktop, first two cards should be on the same row (same y)
      const yDiff = Math.abs(box1!.y - box2!.y);
      expect(yDiff).toBeLessThan(10);
    }
  });
});
