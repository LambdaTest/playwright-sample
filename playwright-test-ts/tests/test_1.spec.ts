import test from "../lambdatest-setup";
import { expect } from "@playwright/test";

test.describe("Browse LambdaTest in different search engines", () => {
  test("Search LambdaTest on Bing", async ({ page }) => {
    await page.goto("https://www.bing.com");
    const element = await page.$('[id="sb_form_q"]')
    await element.click()
    await element.type('LambdaTest')
    await page.waitForTimeout(1000)
    const searchButton = await page.$('[id="search_icon"] svg path')
    await searchButton.click()
    await page.waitForSelector('[class="b_title"]')
    const title = await page.title()

    console.log("Page title:: ", title);
    // Use the expect API for assertions provided by playwright
    expect(title).toEqual(expect.stringContaining("LambdaTest"));
  });
});
