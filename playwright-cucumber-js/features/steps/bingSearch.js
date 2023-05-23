const {Given, When, Then} = require("@cucumber/cucumber");
const assert = require("assert");

Given("Open Bing Website", {timeout: 60 * 1000}, async function() {
  await page.goto("https://www.bing.com");
});

When("Search for LambdaTest", async function() {
  const element = await page.$('[id="sb_form_q"]')
	await element.click()
	await element.type('LambdaTest')
	await page.waitForTimeout(1000)
	await page.keyboard.press('Enter')
	await page.waitForSelector('[class=" b_active"]')
});

Then("Title should match", async function() {
  const title = await page.title()

  try {
    assert.equal(title,
        "LambdaTest - Search",
        "Page title does not match");

    await this.setTestStatus("passed", "Title matched");
  } catch (e) {
    await this.setTestStatus("failed", e);
    throw(e);
  }
});
