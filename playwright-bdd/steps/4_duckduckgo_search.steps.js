const { Given, When, Then } = require('../helpers/fixtures');
import { expect } from "@playwright/test";

Given("I open the DuckDuckGo homepage", async ({ page }) => {
  await page.goto("https://duckduckgo.com/");
});

Then("Look out for {string}", async ({ page }, searchTerm) => {
  await page.locator("#searchbox_input").fill(searchTerm);
  await page.locator("#searchbox_input").press("Enter");
});

Then("I should see results related to {string}", async ({ page }, searchTerm) => {
  await expect(page).toHaveURL(new RegExp(searchTerm, "i"));
});