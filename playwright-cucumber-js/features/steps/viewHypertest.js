const {Given, When, Then} = require("@cucumber/cucumber");
const assert = require("assert");

Given("Open LambdaTest Website", {timeout: 60 * 1000}, async function() {
  await page.goto("https://www.lambdatest.com/");
});

When("Open HyperExecute page", async function() {
  await page.hover("text=Platform");
  await page.click("h3:has-text(\"HyperExecute\")");
});

Then("Open HyperExecute documentation", async function() {
  await page.click("text=Read More");
  let title = await page.title();

  try {
    assert.equal(title,
        "How to use HyperExecute for scalable and reliable web automation testing | LambdaTest",
        "Page title does not match");

    await this.setTestStatus("passed", "Title matched");
  } catch (e) {
    await this.setTestStatus("failed", e);
    throw(e);
  }
});
