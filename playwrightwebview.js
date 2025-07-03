require('dotenv').config();
const {_android} = require("playwright");
const {expect} = require("expect");

(async () => {
  console.log('Starting Playwright Android WebView test...');
  console.log('Platform: Android, WebView Testing');
  console.log('Test: WebView interaction with web content');
  
  const capabilities = {
    "LT:Options": {
      "platformName": "android",
      "deviceName": ".*",
      "platformVersion": "12",
      "isRealMobile": true,
      "isPwMobileWebviewTest": true,
      "build": "Playwright Android Webview Build",
      "name": "Playwright android Webview test",
      'user': process.env.LT_USERNAME,
      'accessKey': process.env.LT_ACCESS_KEY,
      "network": false,
      "video": false,
      "console": true,
      "video": true,
      "tunnel":false
    },
  };

  console.log('Connecting to LambdaTest Android WebView...');
  console.log('Username:', process.env.LT_USERNAME);
  console.log('Platform: Android 12, WebView Shell');

  let device = await _android.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`);
  
  console.log('Connected to Android device successfully!');
  console.log(`Device Model: ${device.model()}, Serial: ${device.serial()}`);
  
  console.log('Force stopping WebView Shell...');
  await device.shell('am force-stop org.chromium.webview_shell');
  
  console.log('Starting WebView Shell...');
  await device.shell('am start org.chromium.webview_shell/.WebViewBrowserActivity');
  
  console.log('Connecting to WebView...');
  let webview = await device.webView({ pkg: 'org.chromium.webview_shell' });

  console.log('Starting WebView script execution...');

  console.log('Filling URL field with DuckDuckGo...');
  // Fill the input box.
  await device.fill({
    res: 'org.chromium.webview_shell:id/url_field',
  }, 'https://duckduckgo.com');
  
  console.log('Pressing Enter to navigate...');
  await device.press({
    res: 'org.chromium.webview_shell:id/url_field',
  }, 'Enter');

  console.log('Getting WebView page instance...');
  // Work with WebView's page as usual.
  const page = await webview.page();

  console.log('Finding search box in WebView...');
  let element = await page.locator("[name=\"q\"]");
  
  console.log('Clicking search box...');
  await element.click();
  
  console.log('Typing "LambdaTest Blog"...');
  await element.type("LambdaTest Blog");
  
  console.log('Pressing Enter...');
  await element.press("Enter");
  
  console.log('Getting page title...');
  const title = await page.title()
  console.log('Page title:', title);

  // Use the expect API for assertions provided by playwright

  try {
    console.log('Verifying title contains "LambdaTest"...');
    expect(title).toEqual(expect.stringContaining('LambdaTest'))
    console.log('WebView Test PASSED! Title contains LambdaTest');
    
    // Mark the test as completed or failed
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: "setTestStatus", arguments: {status: "passed", remark: "Assertions passed" },})}`);
    console.log('Marked test as PASSED in LambdaTest dashboard');
    
    await teardown(device, webview)
  } catch (e) {
    console.log('WebView Test FAILED!');
    console.log('Error:', e.message);
    console.log('Expected title to contain: "LambdaTest"');
    console.log('Actual title:', title);
    
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({action: "setTestStatus", arguments: { status: "failed", remark: e.stack }})}`);
    console.log('Marked test as FAILED in LambdaTest dashboard');
    
    await teardown(device, webview)
    throw e.stack
  }

})().catch(err => {
  console.error('Unexpected error occurred in WebView test:');
  console.error(err);
  process.exit(1);
});

async function teardown(device) {
  if (device) {
    console.log('Cleaning up WebView test resources...');
    console.log("Closing the device...");
    await device.close();
    console.log('WebView test completed and resources cleaned up!');
  }
}