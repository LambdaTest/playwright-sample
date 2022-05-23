# Playwright - Test Execution Setup
* * *

Whenever you run a Playwright test, you must specify the operating system and the browser you wish to use. The LambdaTest Desired Capabilities Generator allows you to automatically create the capabilities class needed to run your Playwright automation scripts on LambdaTest. In this documentation, learn how to configure the desired capability for selecting browsers and OS, organzing tests, changing desktop resolution, and more for your Playwright tests.


## Choosing Browser And OS
***

To perform Playwright testing on LambdaTest, you need to define the `browserName`, `browserVersion`, and `platform` capabilities in your automation scripts.

| Key | Expected Values | Description 
| -------- | -----| ------------ | 
| browserName   |  Chrome, Microsoft Edge<br/> <br/>**Playwright Bundled Browsers**: pw-chromium, pw-webkit, and pw-firefox |   Specify the browser to test on    | 
| browserVersion  |  Chrome 66 & above, Edge 80 & above |   Specify the browser version to test on    | 
| platform  |  **Windows**: 11, 10, 8, 8.1, 7 <br/><br/> **macOS**: Monterey, Big Sur, Cataline, Mojave |    Specify the platform name    | 

## Organizing Tests
***

You can name your test cases and categorize your builds by build, and name for easier analysis. You will need to use the name, and build capabilities to organize Playwright automated tests.

| Key | Values | Description | 
| -------- | -----| ------------ | 
| build   |  Playwright Sample Build |   Represent the build number for your test    | 
| name   |  Playwright Sample Test |    Represents the name of a test   | 

Shown below is the script that configure the `build` and `name` capabilities. 

```js
const { chromium } = require('playwright');

const capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Playwright Sample Build',
      'name': 'Playwright Sample Test',
      'user': process.env.LT_USERNAME,
      'accessKey': process.env.LT_ACCESS_KEY,
      'network': true,
      'video': true,
      'console': true
    }
  }

  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  })
```

## Changing Browser Window Size
***

The default viewport size for Playwright tests is 1280x720. If you wish to maximize the browser window during your Playwright test, you can do it as shown in the code below.

```js
// Create context with given viewport
const context = await browser.newContext({
  viewport: { width: 1280, height: 1024 }
});
```
The above Playwright test runs on a default viewport of 1280x1024. However, you can also select any other viewport when creating a `new context`.

If you resize viewport for individual page then run the below command.

```js
await page.setViewportSize({ width: 1600, height: 1200 });
```

## Debugging Tests
***

By specifying the capabilities for the debugging tools, you can debug and fix your failed Playwright test sessions using network logs, console logs, and video logs.


| Key | Values | Description | Desired Capability |
| -------- | -----| ------------ | --------------|
| network   | true/false |   Enable network logs    |  `const capabilities = { 'LT:Options': {'network': true,}}` |
| console  | true/false |   Enable browser console logs  | `const capabilities = { 'LT:Options': {'console': true,}}` |
| video   |  true/false |    Enable Video recording of the entire screen     | `const capabilities = { 'LT:Options': {'video': true,}}` |

## Mark Tests As Passed Or Failed
***

While running Playwright tests on the LambdaTest platform, you may come across a scenario in which a test that failed in your local instance turns up to be successful on LambdaTest. For verifying expected behavior, it is critical to identify automated tests as **Passed** or **Failed** based on your testing requirements.

By default, the Status of each test that runs successfully is marked as **Completed**, and if there are any issues, the Status is marked as **Failed**.

Shown below is syntax how to mark Playwright tests as **Passed** or **Failed**.

1. To mark test status as **passed**.

```
await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status:'passed', remark: 'Title matched' } })}`)
```

2. To mark test status as **failed**.

```
await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status:'failed', remark: 'Title not matched' } })}`)
```
