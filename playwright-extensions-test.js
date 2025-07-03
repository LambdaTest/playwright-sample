require('dotenv').config();
const {chromium} = require("playwright");
const {expect} = require("expect");
const cp = require('child_process');
const playwrightClientVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];

(async () => {
  console.log('🔌 Starting Playwright Extensions test...');
  console.log('📋 Playwright version:', playwrightClientVersion);
  console.log('🌐 Platform: Windows 10, Browser: Chrome with Extensions');
  
  let browser;
  try {
    const capabilities = {
      "browserName": "Chrome",
      "browserVersion": "latest",
      "LT:Options": {
        "platform": "Windows 10",
        "build": "Playwright Extensions Build",
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

    console.log('🔗 Connecting to LambdaTest...');
    console.log('👤 Username:', process.env.LT_USERNAME);
    console.log('🔌 Loading extension: hello-world-1.0.0.zip');

    browser = await chromium.connectOverCDP(
      `wss://cdp.lambdatest.com/playwright-cdp?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    );

    console.log('✅ Connected to LambdaTest successfully!');
    console.log('🧩 Getting default browser context...');
    
    const defaultContext = browser.contexts()[0];
    const page = defaultContext.pages()[1];

    console.log('🔍 Navigating to Chrome Extensions page...');
    await page.goto("chrome://extensions/")
    await page.waitForTimeout(1000)

    console.log('🔍 Finding extension service worker...');
    let [background] = defaultContext.serviceWorkers();
    if (!background) {
      console.log('⏳ Waiting for service worker...');
      background = await defaultContext.waitForEvent("serviceworker");
    }
    
    const extensionId = background.url().split("/")[2];
    console.log("✅ Extension loaded successfully!");
    console.log("🆔 Extension ID:", extensionId);

    console.log('🔍 Navigating to extension page...');
    await page.goto(`chrome-extension://${extensionId}/hello.html`)
    await page.waitForTimeout(1000)

    console.log('📄 Reading extension content...');
    let text = await (await page.locator("body > p")).textContent();
    console.log('📝 Extension text:', text);

    try {
      console.log('🧪 Verifying extension content...');
      expect(text).toEqual('Hello, World!')
      console.log('✅ Extensions Test PASSED! Content matched successfully');
      
      // Mark the test as completed or failed
      await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Data matched' } })}`)
      console.log('📊 Marked test as PASSED in LambdaTest dashboard');
      
    } catch (e) {
      console.log('❌ Extensions Test FAILED!');
      console.log('💥 Error:', e.message);
      console.log('📊 Expected text: "Hello, World!"');
      console.log('📊 Actual text:', text);
      
      await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: e.stack } })}`)
      console.log('📊 Marked test as FAILED in LambdaTest dashboard');
    }

    await teardown(page, browser)
  } catch (e) {
    console.log('💥 Unexpected error occurred in Extensions test:');
    console.error(e);
    await teardown(page, browser)
    throw e
  }
})().catch(err => {
  console.error('💥 Fatal error in Extensions test:');
  console.error(err);
  process.exit(1);
});

async function teardown(page, browser) {
  console.log('🧹 Cleaning up Extensions test resources...');
  await page.close();
  await browser.close();
  console.log('✅ Extensions test completed and resources cleaned up!');
}