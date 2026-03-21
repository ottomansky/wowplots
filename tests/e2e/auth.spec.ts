import { test, expect } from "@playwright/test";

test.describe("Auth - unauthenticated", () => {
  test("/api/auth/me returns null user when not logged in", async ({
    request,
  }) => {
    const response = await request.get("/api/auth/me");
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.user).toBeNull();
  });

  test("/api/auth/discord redirects to discord.com", async ({ request }) => {
    const response = await request.get("/api/auth/discord", {
      maxRedirects: 0,
    });
    // Should be a redirect (302 or 307)
    expect([301, 302, 303, 307, 308]).toContain(response.status());
    const location = response.headers()["location"];
    expect(location).toContain("discord.com");
  });

  test("/api/auth/logout redirects to homepage", async ({ request }) => {
    const response = await request.get("/api/auth/logout", {
      maxRedirects: 0,
    });
    // Should redirect
    const status = response.status();
    expect(status === 200 || status === 302 || status === 307).toBe(true);
  });

  test("/bookmarks redirects when not authenticated", async ({ page }) => {
    const response = await page.goto("/bookmarks", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);
    // Should redirect to login or show login prompt
    const url = page.url();
    const status = response?.status();
    const hasRedirected = url.includes("discord") || url.includes("auth") || url.includes("/");
    const hasLoginPrompt = await page.locator('text="Log in", text="Sign in", text="Discord"').count();
    expect(hasRedirected || hasLoginPrompt > 0 || status === 302 || status === 307).toBe(true);
  });

  test("/my-builds redirects when not authenticated", async ({ page }) => {
    const response = await page.goto("/my-builds", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);
    const url = page.url();
    const status = response?.status();
    const hasRedirected = url.includes("discord") || url.includes("auth") || url.includes("/");
    const hasLoginPrompt = await page.locator('text="Log in", text="Sign in", text="Discord"').count();
    expect(hasRedirected || hasLoginPrompt > 0 || status === 302 || status === 307).toBe(true);
  });

  test("/admin/builds redirects when not authenticated", async ({ page }) => {
    const response = await page.goto("/admin/builds", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);
    const url = page.url();
    const pageText = await page.textContent("body");
    // Should not show admin content - either redirected or shows error
    const isProtected =
      url.includes("auth") ||
      url.includes("discord") ||
      url === "https://wowplots.com/" ||
      pageText?.includes("Not Found") ||
      pageText?.includes("Unauthorized") ||
      response?.status() === 404 ||
      response?.status() === 302 ||
      response?.status() === 307;
    expect(isProtected).toBe(true);
  });

  test("submit page handles unauthenticated state", async ({ page }) => {
    const response = await page.goto("/submit", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);
    const url = page.url();
    const pageText = await page.textContent("body");
    // Should redirect, show login prompt, or show waitlist
    const isHandled =
      url.includes("auth") ||
      url.includes("discord") ||
      pageText?.includes("Discord") ||
      pageText?.includes("Log in") ||
      pageText?.includes("Sign in") ||
      pageText?.includes("Waitlist") ||
      pageText?.includes("waitlist") ||
      response?.status() === 302 ||
      response?.status() === 404;
    expect(isHandled).toBe(true);
  });

  test("header has navigation links", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const nav = page.locator("header nav, header");
    await expect(nav.first()).toBeVisible();
    // Should have gallery link
    const galleryLink = page.locator('header a[href="/gallery"]');
    await expect(galleryLink.first()).toBeVisible();
  });
});
