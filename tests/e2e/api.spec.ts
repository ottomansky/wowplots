import { test, expect } from "@playwright/test";

test.describe("API endpoints", () => {
  test("GET /api/builds returns JSON with builds array", async ({
    request,
  }) => {
    const response = await request.get("/api/builds");
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body.builds || body)).toBe(true);
  });

  test("GET /api/builds?biome=enchanted-grove filters results", async ({
    request,
  }) => {
    const response = await request.get(
      "/api/builds?biome=enchanted-grove",
    );
    expect(response.status()).toBe(200);
    const body = await response.json();
    const builds = body.builds || body;
    expect(Array.isArray(builds)).toBe(true);
    // All returned builds should be enchanted-grove biome
    if (builds.length > 0) {
      for (const build of builds) {
        expect(build.biome || build.biomeSlug || "").toContain(
          "enchanted",
        );
      }
    }
  });

  test("GET /api/builds?limit=2 limits results", async ({ request }) => {
    const response = await request.get("/api/builds?limit=2");
    expect(response.status()).toBe(200);
    const body = await response.json();
    const builds = body.builds || body;
    expect(Array.isArray(builds)).toBe(true);
    expect(builds.length).toBeLessThanOrEqual(2);
  });

  test("POST /api/builds/fake-build-id-test/like returns 401 without auth", async ({
    request,
  }) => {
    const response = await request.post(
      "/api/builds/fake-build-id-test/like",
    );
    expect(response.status()).toBe(401);
  });

  test("POST /api/builds/fake-build-id-test/bookmark returns 401 without auth", async ({
    request,
  }) => {
    const response = await request.post(
      "/api/builds/fake-build-id-test/bookmark",
    );
    expect(response.status()).toBe(401);
  });

  test("POST /api/builds/fake-build-id-test/comments returns 401 without auth", async ({
    request,
  }) => {
    const response = await request.post(
      "/api/builds/fake-build-id-test/comments",
      {
        data: { content: "test comment" },
      },
    );
    expect(response.status()).toBe(401);
  });

  test("POST /api/waitlist with valid email returns success", async ({
    request,
  }) => {
    const response = await request.post("/api/waitlist", {
      data: { email: `test+${Date.now()}@example.com` },
    });
    // Should be 200 or 201 for success, or 409 for already exists
    expect([200, 201, 409]).toContain(response.status());
  });

  test("POST /api/waitlist with invalid email returns 400", async ({
    request,
  }) => {
    const response = await request.post("/api/waitlist", {
      data: { email: "not-an-email" },
    });
    expect(response.status()).toBe(400);
  });

  test("GET /sitemap.xml returns valid XML", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("<?xml");
    expect(body).toContain("<urlset");
    expect(body).toContain("/gallery");
  });

  test("GET /robots.txt contains expected directives", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("Sitemap:");
    expect(body).toContain("Disallow: /api/");
  });

  test("GET /feed.xml returns XML", async ({ request }) => {
    const response = await request.get("/feed.xml");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("<item>");
  });
});
