import { test, expect } from "@playwright/test";

const PAGES = [
  { name: "landing", path: "/" },
  { name: "gallery", path: "/gallery" },
  { name: "blog", path: "/blog" },
  { name: "about", path: "/about" },
  { name: "article", path: "/blog/wow-housing-beginners-guide" },
  { name: "biome", path: "/biomes/enchanted-grove" },
];

test.describe("SEO - Title tags", () => {
  for (const p of PAGES) {
    test(`${p.name} has a <title> tag`, async ({ page }) => {
      await page.goto(p.path, { waitUntil: "domcontentloaded" });
      const title = await page.title();
      expect(title.length).toBeGreaterThan(5);
    });
  }

  test("pages have unique titles", async ({ page }) => {
    const titles: string[] = [];
    for (const p of PAGES) {
      await page.goto(p.path, { waitUntil: "domcontentloaded" });
      titles.push(await page.title());
    }
    const unique = new Set(titles);
    expect(unique.size).toBe(titles.length);
  });
});

test.describe("SEO - Meta descriptions", () => {
  for (const p of PAGES) {
    test(`${p.name} has meta description`, async ({ page }) => {
      await page.goto(p.path, { waitUntil: "domcontentloaded" });
      const desc = page.locator('meta[name="description"]');
      const content = await desc.getAttribute("content");
      expect(content).toBeTruthy();
      expect(content!.length).toBeGreaterThan(20);
    });
  }
});

test.describe("SEO - Open Graph", () => {
  test("build detail has og:title (conditional)", async ({ page }) => {
    // Skip if no builds exist
    const res = await page.goto("/api/builds?limit=1", { waitUntil: "domcontentloaded" });
    const data = (await res?.json()) as { builds: { slug: string }[] };
    test.skip(!data?.builds?.length, "No builds in gallery");
    await page.goto(`/gallery/${data.builds[0].slug}`, { waitUntil: "domcontentloaded" });
    const ogTitle = page.locator('meta[property="og:title"]');
    const content = await ogTitle.getAttribute("content");
    expect(content).toBeTruthy();
  });

  test("all pages have og:url or canonical", async ({ page }) => {
    for (const p of PAGES) {
      await page.goto(p.path, { waitUntil: "domcontentloaded" });
      const ogUrl = page.locator('meta[property="og:url"]');
      const canonical = page.locator('link[rel="canonical"]');
      const hasOg = (await ogUrl.count()) > 0;
      const hasCanonical = (await canonical.count()) > 0;
      expect(
        hasOg || hasCanonical,
        `${p.path} should have og:url or canonical`,
      ).toBe(true);
    }
  });
});

test.describe("SEO - Structured Data", () => {
  test("article page has JSON-LD", async ({ page }) => {
    await page.goto("/blog/wow-housing-beginners-guide", {
      waitUntil: "domcontentloaded",
    });
    const jsonLd = page.locator('script[type="application/ld+json"]');
    const count = await jsonLd.count();
    expect(count).toBeGreaterThanOrEqual(1);
    const content = await jsonLd.first().textContent();
    const parsed = JSON.parse(content!);
    expect(parsed["@type"] || parsed["@graph"]).toBeTruthy();
  });

  test("build detail has JSON-LD (conditional)", async ({ page }) => {
    const res = await page.goto("/api/builds?limit=1", { waitUntil: "domcontentloaded" });
    const data = (await res?.json()) as { builds: { slug: string }[] };
    test.skip(!data?.builds?.length, "No builds in gallery");
    await page.goto(`/gallery/${data.builds[0].slug}`, { waitUntil: "domcontentloaded" });
    const jsonLd = page.locator('script[type="application/ld+json"]');
    const count = await jsonLd.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});

test.describe("SEO - Sitemap & Robots", () => {
  test("sitemap includes key pages", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    const body = await response.text();
    expect(body).toContain("/gallery");
    expect(body).toContain("/blog");
    expect(body).toContain("/biomes/enchanted-grove");
  });

  test("robots.txt disallows /api/", async ({ request }) => {
    const response = await request.get("/robots.txt");
    const body = await response.text();
    expect(body).toContain("Disallow: /api/");
  });

  test("RSS feed has correct content type", async ({ request }) => {
    const response = await request.get("/feed.xml");
    const contentType = response.headers()["content-type"];
    expect(contentType).toMatch(/xml|rss/i);
  });
});
