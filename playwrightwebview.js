const {_android} = require("playwright");
const {expect} = require("expect");

(async () => {
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

  let device = await _android.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`);
  await device.shell('am force-stop org.chromium.webview_shell');
  await device.shell('am start org.chromium.webview_shell/.WebViewBrowserActivity');
  let webview = await device.webView({ pkg: 'org.chromium.webview_shell' });

  console.log(`starting script execution`)
  console.log(`Model:: ${device.model()}, serial:: ${device.serial()}`);

    // Fill the input box.
    await device.fill({
      res: 'org.chromium.webview_shell:id/url_field',
    }, 'https://duckduckgo.com');
    await device.press({
      res: 'org.chromium.webview_shell:id/url_field',
    }, 'Enter');

     // Work with WebView's page as usual.
     const page = await webview.page();

     let element = await page.locator("[name=\"q\"]");
    await element.click();
    await element.type("LambdaTest Blog");
    await element.press("Enter");
    const title = await page.title()

    console.log('Page title:: ', title)
    // Use the expect API for assertions provided by playwright


  try {
    expect(title).toEqual(expect.stringContaining('LambdaTest'))
    // Mark the test as completed or failed
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: "setTestStatus", arguments: {status: "passed", remark: "Assertions passed" },})}`);
    await teardown( device,webview)
  } catch (e) {
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({action: "setTestStatus", arguments: { status: "failed", remark: e.stack }})}`);
    await teardown( device,webview)
    throw e.stack
  }

})();

async function teardown(device) {
  if (device) {
    console.log("Closing the device...");
    await device.close();
  }
}