# Playwright Testing With Playwright Test Runner
* * *

Playwright Test Runner is used for end-to-end automated testing of websites and web apps across all major browsers. You can run parallel tests, get context isolation out of the box, capture videos, screenshots, and other test artifacts on test failure, and use fixtures with Playwright test runner.

LambdaTest enables you to run Playwright tests with the Playwright test runner across 40+ real browser and operating system combinations. This guide will outline the fundamentals of getting started with Playwright testing on the LambdaTest platform using the Playwright test runner.

## Prerequisites
***

>Note: All the code samples in this documentation can be found in the [LambdaTest's Repository on GitHub](https://github.com/LambdaTest/playwright-sample/). You can either download or clone the repository to quickly run your tests.

1. Clone the LambdaTest-Playwright repository on your system.

2. Install the npm dependencies.

```
npm install
```

3. In order to run your Playwright tests with Playwright test runner, you will need to set your LambdaTest username and access key in the environment variables. Click the **Access Key** button at the top-right of the Automation Dashboard to access it.

<img height="400" src="https://user-images.githubusercontent.com/70570645/170220219-2b8f209e-07bb-416a-ab66-9ee1c35b1e90.png"/>


**Windows**

```js
set LT_USERNAME="YOUR_LAMBDATEST_USERNAME"
set LT_ACCESS_KEY="YOUR_LAMBDATEST_ACCESS_KEY"
```

**macOS/Linux**

```js
export LT_USERNAME="YOUR_LAMBDATEST_USERNAME"
export LT_ACCESS_KEY="YOUR_LAMBDATEST_ACCESS_KEY"
```

## Running Playwright Tests With Playwright Test Runner
*** 

In your `playwright.config.js` file, add the browserName, browserVersion, and platform in the below projects configuration.

```js
const { devices } = require('@playwright/test')
// Playwright config to run tests on LambdaTest platform and local
const config = {
testDir: 'tests',
testMatch: '**/*.spec.js',
timeout: 60000,
projects: [
// -- LambdaTest Config --
  // name in the format: browserName:browserVersion:platform@lambdatest
  // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
  // Use additional configuration options provided by Playwright if required: https://playwright.dev/docs/api/class-testconfig
    {
      name: 'chrome:latest:MacOS Catalina@lambdatest',
      use: {
        viewport: { width: 1920, height: 1080 }
      }
    },
    {
      name: 'MicrosoftEdge:90:Windows 10@lambdatest',
      use: {
        ...devices['iPhone 12 Pro Max']
      }
    },
  ]
}

module.exports = config
```
Pass the below command to run the test.

```
npm run test
```

Visit the LambdaTest Automation dashboard to view the results of your executed test with Playwright test runner.

## Testing With Playwright Test When Migrating To LambdaTest
***

If you are migrating test suites to LambdaTest, then follow the below steps.


1. Add the `lambdatest-setup.js` to your project route.

2. Include the `playwright.config.js` in your project in the below format.

```js
const { devices } = require('@playwright/test')

// Playwright config to run tests on LambdaTest platform and local
const config = {
  testDir: 'tests',
  testMatch: '**/*.spec.js',
  timeout: 60000,
  use: {
    viewport: null
  },
  projects: [
    // -- LambdaTest Config --
    // name in the format: browserName:browserVersion:platform@lambdatest
    // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    // Use additional configuration options provided by Playwright if required: https://playwright.dev/docs/api/class-testconfig
    {
      name: 'chrome:latest:MacOS Catalina@lambdatest',
      use: {
        viewport: { width: 1920, height: 1080 }
      }
    },
    {
      name: 'chrome:latest:Windows 10@lambdatest',
      use: {
        viewport: { width: 1280, height: 720 }
      }
    },
    {
      name: 'MicrosoftEdge:90:Windows 10@lambdatest',
      use: {
        ...devices['iPhone 12 Pro Max']
      }
    },
    {
      name: 'pw-firefox:latest:Windows 10@lambdatest',
      use: {
        viewport: { width: 1280, height: 720 }
      }
    },
    {
      name: 'pw-webkit:latest:Windows 10@lambdatest',
      use: {
        viewport: { width: 1920, height: 1080 }
      }
    }

  ]
}

```

3. Add your test script path in `playwright.config.js`.

4. Import the test object from `lambdatest-setup.js` and run your tests.

```js
const { test } = require('../lambdatest-setup')
const { expect } = require('@playwright/test')

test.describe('Browse LambdaTest in different search engines', () => {
  test('Search LambdaTest on Bing', async ({ page }) => {
    await page.goto('https://www.bing.com')
    const element = await page.$('[id="sb_form_q"]')
    await element.click()
    await element.type('LambdaTest')
    await page.waitForTimeout(1000)
    await page.keyboard.press("Enter")
    await page.waitForSelector('[class=" b_active"]')
    const title = await page.title()

    console.log('Page title:: ', title)
    // Use the expect API for assertions provided by playwright
    expect(title).toEqual(expect.stringContaining('LambdaTest'))
  })
})
```
