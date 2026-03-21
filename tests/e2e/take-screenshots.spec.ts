import { test, type Browser } from "@playwright/test";

test.setTimeout(120000);

const DIR = "tests/screenshots";

async function snap(browser: Browser, path: string, name: string) {
  for (const [vpName, w, h] of [["desktop", 1440, 900], ["tablet", 768, 1024], ["mobile", 375, 812]] as const) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    await page.goto(path, { waitUntil: "domcontentloaded", timeout: 10000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `${DIR}/${name}-${vpName}.png`, fullPage: true });
    await ctx.close();
  }
}

test("screenshots", async ({ browser }) => {
  await snap(browser, "/", "landing");
  await snap(browser, "/gallery", "gallery");
  await snap(browser, "/gallery/enchanted-library", "build-detail");
  await snap(browser, "/blog", "blog");
  await snap(browser, "/submit", "submit");
  await snap(browser, "/about", "about");
});
