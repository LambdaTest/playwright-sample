// const { test: base, createBdd } = require('playwright-bdd');
// const { World } = require('./world');

// const test = base.extend({
//   world: async ({ page }, use, testInfo) => {
//     const world = new World(page, testInfo);
//     await use(world);
//   },
// });

// const { Given, When, Then } = createBdd(test, { worldFixture: 'world' });

// module.exports = { test, Given, When, Then };

/* fixtures.js - Working fine except the Scenario Name */
/*
const { test: base, createBdd } = require('playwright-bdd');

const test = base.extend({
  context: async ({ browser }, use) => {
    const context = await browser.newContext();
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  },
});

const { Given, When, Then } = createBdd(test);

module.exports = { test, Given, When, Then };
*/

const { test: base, createBdd } = require('playwright-bdd');

const test = base.extend({
  page: async ({ context }, use, testInfo) => {
    const page = await context.newPage();

    console.log("✅ Running Scenario:", testInfo.title);

    /* Use LambdaTest Hooks to update the scenario name */
    /* https://www.lambdatest.com/support/docs/lambda-hooks/ */
    await page.evaluate(
      (_scenarioName) => {},
      `lambdatest_action: { "action": "setTestName", "arguments": "${testInfo.title}" }`
    );

    await use(page);

    /* Set test status on LT dashboard */
    const status = testInfo.status === 'passed' ? 'passed' : 'failed';
    await page.evaluate(
      (_status) => {},
      `lambdatest_action: { "action": "setTestStatus", "arguments": "${status}" }`
    );

    await page.close();
  },
});

const { Given, When, Then } = createBdd(test);

module.exports = { test, Given, When, Then };