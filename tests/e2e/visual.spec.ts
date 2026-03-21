import { test, expect } from "@playwright/test";

const VIEWPORTS = {
  mobile: { width: 375, height: 812 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
};

const KEY_PAGES = [
  { name: "landing", path: "/" },
  { name: "gallery", path: "/gallery" },
  { name: "build-detail", path: "/gallery/enchanted-library" },
  { name: "blog", path: "/blog" },
  { name: "article", path: "/blog/wow-housing-beginners-guide" },
  { name: "biome", path: "/biomes/enchanted-grove" },
];

// ── Screenshot Baselines ────────────────────────────────

for (const page of KEY_PAGES) {
  for (const [vpName, vpSize] of Object.entries(VIEWPORTS)) {
    test(`screenshot: ${page.name} @ ${vpName}`, async ({ browser }) => {
      const context = await browser.newContext({ viewport: vpSize });
      const p = await context.newPage();
      await p.goto(page.path, { waitUntil: "networkidle" });
      await p.screenshot({
        path: `tests/e2e/screenshots/${page.name}-${vpName}.png`,
        fullPage: true,
      });
      await context.close();
    });
  }
}

// ── Layout Validation ───────────────────────────────────

test.describe("Layout validation", () => {
  test("no horizontal scroll on any page", async ({ page }) => {
    for (const p of KEY_PAGES) {
      await page.goto(p.path, { waitUntil: "domcontentloaded" });
      const hasHScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasHScroll, `horizontal scroll on ${p.path}`).toBe(false);
    }
  });

  test("no horizontal scroll on mobile", async ({ browser }) => {
    const context = await browser.newContext({ viewport: VIEWPORTS.mobile });
    const page = await context.newPage();
    for (const p of KEY_PAGES) {
      await page.goto(p.path, { waitUntil: "domcontentloaded" });
      const hasHScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasHScroll, `horizontal scroll on mobile ${p.path}`).toBe(false);
    }
    await context.close();
  });

  test("footer at bottom on every page", async ({ page }) => {
    for (const p of KEY_PAGES) {
      await page.goto(p.path, { waitUntil: "domcontentloaded" });
      const footer = page.locator("footer");
      await expect(footer).toBeVisible();
      const footerBox = await footer.boundingBox();
      const viewportHeight = await page.evaluate(() => window.innerHeight);
      // Footer should be at or below viewport bottom
      expect(footerBox!.y + footerBox!.height).toBeGreaterThanOrEqual(viewportHeight);
    }
  });

  test("gallery cards have consistent heights within rows", async ({ page }) => {
    await page.goto("/gallery", { waitUntil: "networkidle" });
    const cards = page.locator('a[href^="/gallery/"]');
    const count = await cards.count();
    if (count >= 2) {
      const heights = new Set<number>();
      for (let i = 0; i < Math.min(count, 4); i++) {
        const box = await cards.nth(i).boundingBox();
        if (box) heights.add(Math.round(box.height));
      }
      // Cards in the same row should have the same height (within 5px tolerance)
      const heightArr = Array.from(heights);
      if (heightArr.length > 1) {
        const diff = Math.abs(heightArr[0] - heightArr[1]);
        expect(diff).toBeLessThanOrEqual(5);
      }
    }
  });
});

// ── Interactive Tests ───────────────────────────────────

test.describe("Interactive", () => {
  test("gallery filters update grid without full reload", async ({ page }) => {
    await page.goto("/gallery", { waitUntil: "networkidle" });
    const initialUrl = page.url();
    await page.selectOption("select:first-of-type", "enchanted-grove");
    await page.waitForURL(/biome/);
    expect(page.url()).not.toBe(initialUrl);
    await expect(page.locator("h1")).toContainText("Gallery");
  });

  test("copy layout code button works", async ({ page }) => {
    await page.goto("/gallery/enchanted-library", { waitUntil: "networkidle" });
    // If layout code exists, there will be a copy button
    const copyBtn = page.locator("text=Copy Code");
    if (await copyBtn.isVisible()) {
      await copyBtn.click();
      await expect(page.locator("text=Copied!")).toBeVisible();
    }
  });

  test("all nav links work (no 404s)", async ({ page }) => {
    await page.goto("/");
    const navLinks = page.locator("header nav a");
    const hrefs: string[] = [];
    const count = await navLinks.count();
    for (let i = 0; i < count; i++) {
      const href = await navLinks.nth(i).getAttribute("href");
      if (href && href.startsWith("/")) hrefs.push(href);
    }
    for (const href of hrefs) {
      const response = await page.goto(href);
      expect(response?.status(), `${href} should not 404`).not.toBe(404);
    }
  });

  test("Discord link opens in new tab", async ({ page }) => {
    await page.goto("/");
    const discordLink = page.locator('a[href*="discord.gg"]').first();
    const target = await discordLink.getAttribute("target");
    expect(target).toBe("_blank");
  });
});

// ── No Console Errors ───────────────────────────────────

test.describe("Console errors", () => {
  for (const p of KEY_PAGES) {
    test(`no JS errors on ${p.name}`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (err) => errors.push(err.message));
      await page.goto(p.path, { waitUntil: "networkidle" });
      expect(errors).toEqual([]);
    });
  }
});
