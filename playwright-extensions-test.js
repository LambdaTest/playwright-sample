const {chromium} = require("playwright");
const {expect} = require("@playwright/test");
const cp = require('child_process');
const playwrightClientVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];

(async () => {
  let browser;
  try {
    const capabilities = {
      "browserName": "Chrome",
      "browserVersion": "latest",
      "LT:Options": {
        "platform": "MacOS Big sur",
        "build": "Playwright Extensions test",
        "name": "Load extension and verify it",
        "user": process.env.LT_USERNAME,
        "accessKey": process.env.LT_ACCESS_KEY,
        "network": true,
        "video": true,
        "console": true,
        'playwrightClientVersion': playwrightClientVersion,
        "lambdaLoadExtensions": [
          // Add private .zip link(s) of the extension uploaded on LambdaTest
        ],
        "loadExtensions": [
          // Add public .zip link(s) of the extension
          "https://public-objects-for-test.s3.amazonaws.com/hello-world-1.0.0.zip"
        ],
      },
    };

    browser = await chromium.connectOverCDP(
      `wss://cdp.lambdatest.com/playwright-cdp?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    );

    const defaultContext = browser.contexts()[0];
    const page = defaultContext.pages()[1];

    await page.goto("chrome://extensions/")
    await page.waitForTimeout(1000)

    let [background] = defaultContext.serviceWorkers();
    if (!background)
      background = await defaultContext.waitForEvent("serviceworker");
    const extensionId = background.url().split("/")[2];
    console.log("ExtensionId:: ", extensionId);

    await page.goto(`chrome-extension://${extensionId}/hello.html`)
    await page.waitForTimeout(1000)

    let text = await (await page.$("body > p")).textContent();

    try {
      expect(text).toEqual('Hello, World!')
      // Mark the test as completed or failed
      await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Data matched' } })}`)
    } catch (e) {
      await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: e.stack } })}`)
    }

    await browser.close();
  } catch (e) {
    await browser.close();
  }
})();
