import test from "../setup/lambdatest-setup.js";
import { expect } from "@playwright/test";

test.describe("Browse LambdaTest", () => {
  test("Search LambdaTest on DuckDuckGo", async ({ page }) => {
    await page.goto("https://www.duckduckgo.com/",
      { ignoreHTTPSErrors: true }
    );

    const searchBox = page.locator('[name="q"]').nth(0)
    await searchBox.waitFor({ state: "visible" });
    await searchBox.click({ force: true });
    await searchBox.fill("LambdaTest");

    if (page.isIOS)
    {
      /* Directly submit the form (this works on iOS Safari) */
      await page.evaluate(() =>
      {
        const form = document.querySelector("form");
        if (form) form.submit();
      });
    }
    else
    {
      /* For Desktop and Android, press Enter to submit */
      await searchBox.press("Enter");
    }

    if (page.isIOS)
    {
      const currentURL = page.url();
      console.log("Current page URL for iOS:", currentURL);
    }

    /* Wait for navigation or search results */
    /* iOS - The URL is DuckDuckGo search */
    if (page.isIOS)
    {
      await page.waitForSelector("a[href*='duckduckgo']", { timeout: 10000 });
    }
    /* Others - The URL contains Search Term in the URL */
    else
    {
        await page.waitForLoadState("networkidle");
        // await page.waitForSelector("a[href*='lambdatest']", { timeout: 10000 });
        await page.waitForFunction(() =>
          [...document.querySelectorAll("a")].some(a =>
            /lambdatest/i.test(a.getAttribute("href") || "")
          ),
          { timeout: 10000 }
      );
    }

  /* Can be modified to explicit waits, added only for demo purpose */
  await page.waitForTimeout(5000);
  const title = await page.title();

  /* Assert if the title does not LambdaTest or duckduckgo (iOS) */
  expect(typeof title).toBe("string");
  expect(/lambdatest|duckduckgo/i.test(title)).toBeTruthy();

  /* Add delay so users can see the page, added only for demo purpose */
  await page.waitForTimeout(5000);
  });
});