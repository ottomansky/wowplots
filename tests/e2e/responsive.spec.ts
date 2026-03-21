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
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHScroll).toBe(false);
  });

  test("gallery: loads without horizontal scroll", async ({ page }) => {
    await page.goto("/gallery", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    await expect(page.locator("h1")).toBeVisible();
    const hasHScroll = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHScroll).toBe(false);
  });

  test("header: nav items hidden on mobile", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const desktopNav = page.locator('header nav a[href="/gallery"]');
    const isVisible = await desktopNav.first().isVisible().catch(() => false);
    const menuButton = page.locator("header button");
    const menuExists = (await menuButton.count()) > 0;
    expect(!isVisible || menuExists).toBe(true);
  });

  test("footer: no overflow on mobile", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    await expect(page.locator("footer")).toBeVisible();
    const hasHScroll = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHScroll).toBe(false);
  });

  test("blog index loads on mobile", async ({ page }) => {
    await page.goto("/blog", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const hasHScroll = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHScroll).toBe(false);
    await expect(page.locator("h1")).toBeVisible();
  });
});

test.describe("Responsive - Tablet (768px)", () => {
  test.use({ viewport: TABLET });

  test("gallery loads at tablet width", async ({ page }) => {
    await page.goto("/gallery", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("no horizontal scroll on tablet", async ({ page }) => {
    await page.goto("/gallery", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const hasHScroll = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHScroll).toBe(false);
  });
});

test.describe("Responsive - Desktop (1440px)", () => {
  test.use({ viewport: DESKTOP });

  test("header: all nav items visible", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    await expect(page.locator('header a[href="/gallery"]').first()).toBeVisible();
    await expect(page.locator('header a[href="/blog"]').first()).toBeVisible();
  });

  test("gallery loads at desktop width", async ({ page }) => {
    await page.goto("/gallery", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    await expect(page.locator("h1")).toBeVisible();
  });
});
