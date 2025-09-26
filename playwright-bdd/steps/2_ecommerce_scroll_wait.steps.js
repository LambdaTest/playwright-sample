const { Given, When, Then } = require('../helpers/fixtures');
import { expect } from "@playwright/test";

Given("I navigate to LambdaTest ECommerce Playground Login Page", async ({ page }) => {
  await page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=account/login");
});

When("I enter username {string}", async ({ page }, username) => {
  /* console.log(username); */
  await page.locator("#input-email").focus();
  await page.locator("#input-email").click();
  await page.locator("#input-email").fill(username);
});

When("I enter password {string}", async ({ page }, password) => {
  /* console.log(password); */
  await page.locator("#input-password").focus();
  await page.locator("#input-password").click();
  await page.locator("#input-password").fill(password);
});

When("I click on the login button", async ({ page }) => {
  await page.locator("[value='Login']").click();
});

Then("the user should be logged into the LambdaTest ECommerce Playground", async ({ page }) => {
  await expect(page.getByText("My Orders")).toBeVisible();
});

Then("I click on the Shop by Category menu", async ({ page }) => {
  await page.locator(".both[href='#mz-component-1626147655']").click();
});

Then("I navigate to phone & tablets item", async ({ page }) => {
  await page.getByText("Phone, Tablets & Ipod").click();
});

Then("I click on the {string} product", async ({ page }, productName) => {
  /* This is out of stock */
  const iPhoneImage = "#mz-product-grid-image-36-212408 > div > div.carousel-item.active > img";

  // Wait for the page to be fully loaded
  await page.waitForLoadState("domcontentloaded");

  // Scroll to the bottom of the page
  await page.evaluate(() => {
    const element = document.documentElement || document.body;
    window.scrollTo(0, element.scrollHeight || 0);
  });
  await page.waitForTimeout(1000);

  // Scroll back to the top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(2000);

  // Apply CSS styles to the element
  await page.locator(iPhoneImage).evaluate((element) => {
    element.style.position = "relative";
    element.style.zIndex = "1000";
    element.style.backgroundColor = "rgba(128, 128, 128, 0.5)";
    element.style.transition = "background-color 2.5s ease";
  });

  await page.waitForTimeout(2000);
  await expect(page.locator(iPhoneImage)).toBeVisible({ timeout: 2000 });
  await page.locator(iPhoneImage).click();
  await expect(page).toHaveURL(/product_id=36/);
});

Then("I add {string} product to the cart", async ({ page }, productName) => {
  await page.locator(".order-lg-1 > .text").click();
  await page.waitForTimeout(2000);
  await page.locator(".form-row .btn-secondary").click();
  await page.waitForTimeout(2000);
  await expect(page).toHaveURL(/checkout\/checkout/);
});