const { Given, When, Then } = require('../helpers/fixtures');
import { expect } from "@playwright/test";

Given("I navigate to LambdaTest ECommerce Playground HomePage", async ({ page }) => {
  await page.goto("https://ecommerce-playground.lambdatest.io/");
});

When("I search for {string}", async ({ page }, product) => {
  await page.locator('[data-autocomplete="5"]').focus();
  await page.locator('[data-autocomplete="5"]').click();
  await page.locator('[data-autocomplete="5"]').fill(product);
  await page.waitForTimeout(2000);
  await page.locator(".type-text").first().click({ force: true });
});

Then("I should see search results for {string}", async ({ page }, searchTerm) => {
  await expect(page.locator("h1.h4")).toContainText(searchTerm);
});

Then("The page url should contain {string}", async ({ page }, product) => {
  const actualUrl = await page.url();
  const normalizedUrl = actualUrl.replace(/\+/g, " ").toLowerCase();
  /* console.log(`Actual URL: ${actualUrl}`); */
  /* console.log(`Normalized URL: ${normalizedUrl}`); */
  expect(normalizedUrl).toContain(product.toLowerCase());
});