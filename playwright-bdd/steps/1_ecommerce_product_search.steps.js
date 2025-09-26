const { Given, When, Then } = require('../helpers/fixtures');
import { expect } from "@playwright/test";

Given("I navigate to LambdaTest ECommerce Playground", async ({ page }) => {
  await page.goto("https://ecommerce-playground.lambdatest.io/");
});

When("I enter {string} in the search box", async ({ page }, searchTerm) => {
  const searchBox = page.locator('[data-autocomplete="5"]');
  await searchBox.focus();
  await searchBox.click();
  await searchBox.fill(searchTerm);
});

When("I click on the search button", async ({ page }) => {
  await page.locator(".type-text").first().click({ force: true });
});

Then("I should see search results related to {string}", async ({ page }, searchTerm) => {
  await expect(page.locator("h1.h4")).toContainText(searchTerm);
});

Then("the page title should contain {string}", async ({ page }, searchTerm) => {
  const title = await page.title();
  expect(title.toLowerCase()).toContain(searchTerm.toLowerCase());
});