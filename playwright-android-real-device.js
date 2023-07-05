const {_android} = require("playwright");
const {expect} = require("expect");

(async () => {
  const capabilities = {
    "LT:Options": {
      "platformName": "android",
      "deviceName": "Galaxy S21 5G",
      "platformVersion": "12",
      "isRealMobile": true,
      "build": "Playwright Android Build",
      "name": "Playwright android test",
      "user": process.env.LT_USERNAME,
      "accessKey": process.env.LT_ACCESS_KEY,
      "network": true,
      "video": true,
      "console": true,
      "projectName": "New UI",
    },
  };

  let device = await _android.connect(
      `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
          JSON.stringify(capabilities))}`,
  );

  console.log(`Model:: ${device.model()}, serial:: ${device.serial()}`);

  await device.shell("am force-stop com.android.chrome");

  let context = await device.launchBrowser();
  let page = await context.newPage();

  await page.goto("https://duckduckgo.com");
  let element = await page.locator("[name=\"q\"]");
  await element.click();
  await element.type("Playwright");
  await element.press("Enter");
  let title = await page.title();
  
  try {
    expect(title).toEqual("Playwright at DuckDuckGo");
    // Mark the test as completed or failed
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: "setTestStatus", arguments: {status: "passed", remark: "Assertions passed" },})}`);
    await teardown(page, context, device)
  } catch (e) {
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({action: "setTestStatus", arguments: { status: "failed", remark: e.stack }})}`);
    await teardown(page, context, device)
    throw e.stack
  }

})();

async function teardown(page, context, device) {
  await page.close();
  await context.close();
  await device.close();
}



