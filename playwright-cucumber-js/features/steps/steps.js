const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");

Given("Open LambdaTest Website", { timeout: 60 * 1000 }, async function () {
  await this.openUrl('https://www.lambdatest.com/');
});

When("Open HyperExecute page", async function () {
  await this.page.hover('text=Platform')
  await this.page.click('h3:has-text("HyperExecute")');
});

Then("Open HyperExecute documentation", async function () {
  await this.page.click('text=Read More');
  let title = await this.page.title()

  try{
    assert.equal(title, "How to use HyperExecute for scalable and reliable web automation testing | LambdaTest", "Page title does not match")

    await this.setTestStatus("passed", "Title matched")
  } catch (e) {
    await this.setTestStatus("failed", e)
    throw(e)
  }
});
