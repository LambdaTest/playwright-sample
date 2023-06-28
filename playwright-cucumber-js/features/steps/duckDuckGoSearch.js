const {Given, When, Then} = require("@cucumber/cucumber");
const assert = require("assert");

Given("Open DuckDuckGo Website", {timeout: 60 * 1000}, async function() {
  await page.goto("https://duckduckgo.com");
});

When("Search for LambdaTest", async function() {
  let element = await page.locator("[name=\"q\"]");
  await element.click();
  await element.type("LambdaTest");
  await element.press("Enter");
});

Then("Title should match", async function() {
  const title = await page.title()

  try {
    assert.equal(title,
        "LambdaTest at DuckDuckGo",
        "Page title does not match");

    await this.setTestStatus("passed", "Title matched");
  } catch (e) {
    await this.setTestStatus("failed", e);
    throw(e);
  }
});
