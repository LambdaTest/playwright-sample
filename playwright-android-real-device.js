require('dotenv').config();
const {_android} = require("playwright");
const {expect} = require("expect");

(async () => {
  console.log('Starting Playwright Android Real Device test...');
  console.log('Device: Galaxy S21 5G (Android 12)');
  
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

  console.log('Connecting to LambdaTest Android cloud...');
  console.log('Username:', process.env.LT_USERNAME);
  console.log('Platform: Android 12, Device: Galaxy S21 5G');

  let device = await _android.connect(
      `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
          JSON.stringify(capabilities))}`,
  );

  console.log('Connected to Android device successfully!');
  console.log(`Device Model: ${device.model()}, Serial: ${device.serial()}`);

  console.log('Force stopping Chrome browser...');
  await device.shell("am force-stop com.android.chrome");

  console.log('Launching Chrome browser...');
  let context = await device.launchBrowser();
  let page = await context.newPage();

  console.log('Navigating to DuckDuckGo...');
  await page.goto("https://duckduckgo.com");
  
  console.log('Finding search box...');
  let element = await page.locator("[name=\"q\"]");
  
  console.log('Clicking search box...');
  await element.click();
  
  console.log('Typing "Playwright"...');
  await element.type("Playwright");
  
  console.log('Pressing Enter...');
  await element.press("Enter");
  
  console.log('Waiting for search results...');
  let title = await page.title();
  console.log('Page title:', title);
  
  try {
    console.log('Verifying title contains "Playwright"...');
    expect(title).toEqual("Playwright at DuckDuckGo");
    console.log('Android Test PASSED! Title matched successfully');
    
    // Mark the test as completed or failed
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: "setTestStatus", arguments: {status: "passed", remark: "Assertions passed" },})}`);
    console.log('Marked test as PASSED in LambdaTest dashboard');
    
    await teardown(page, context, device)
  } catch (e) {
    console.log('Android Test FAILED!');
    console.log('Error:', e.message);
    console.log('Expected title: "Playwright at DuckDuckGo"');
    console.log('Actual title:', title);
    
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({action: "setTestStatus", arguments: { status: "failed", remark: e.stack }})}`);
    console.log('Marked test as FAILED in LambdaTest dashboard');
    
    await teardown(page, context, device)
    throw e.stack
  }

})().catch(err => {
  console.error('Unexpected error occurred in Android test:');
  console.error(err);
  process.exit(1);
});

async function teardown(page, context, device) {
  console.log('Cleaning up Android test resources...');
  await page.close();
  await context.close();
  await device.close();
  console.log('Android test completed and resources cleaned up!');
}