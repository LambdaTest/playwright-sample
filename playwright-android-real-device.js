const {_android} = require("playwright");
const expect = require("chai").expect;

(async () => {
  const capabilities = {
    "LT:Options": {
      "platformName": "android",
      "deviceName": "Galaxy S20",
      "platformVersion": "11",
      "isRealMobile": true,
      "build": "Playwright android build",
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
  let element = await page.$("[name=\"q\"]");
  await element.click();
  await element.type("Playwright");
  await element.press("Enter");
  let title = await page.title();

  try {
    expect(title).to.equal("Playwright at DuckDuckGo");
    // Mark the test as completed or failed
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: "setTestStatus", arguments: {status: "passed", remark: "Assertions passed" },})}`);
  } catch (e) {
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({action: "setTestStatus", arguments: { status: "failed", remark: e.stack }})}`);
    console.log("Error:: ", e.stack);
  }

  await page.close();
  await context.close();
  await device.close();
})();
