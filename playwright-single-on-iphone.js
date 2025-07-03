require('dotenv').config();
const { chromium, devices } = require('playwright')
const {expect} = require("expect");
const cp = require('child_process');
const playwrightClientVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];

(async () => {
  console.log('📱 Starting Playwright iPhone emulation test...');
  console.log('📋 Playwright version:', playwrightClientVersion);
  console.log('🍎 Device: iPhone 11 emulation');
  
  const capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Playwright iPhone Emulation Build',
      'name': 'Playwright Sample Test',
      'user': process.env.LT_USERNAME,
      'accessKey': process.env.LT_ACCESS_KEY,
      'network': true,
      'video': true,
      'console': true,
      'tunnel': false, // Add tunnel configuration if testing locally hosted webpage
      'tunnelName': '', // Optional
      'geoLocation': '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
      'playwrightClientVersion': playwrightClientVersion
    }
  }

  console.log('🔗 Connecting to LambdaTest...');
  console.log('👤 Username:', process.env.LT_USERNAME);
  console.log('🌐 Platform: Windows 10, Browser: Chrome');

  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  })

  console.log('✅ Connected to LambdaTest successfully!');
  console.log('📱 Setting up iPhone 11 emulation...');

  // Documentation: https://playwright.dev/docs/emulation#devices
  // Supported devices: https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/server/deviceDescriptorsSource.json
  const context = await browser.newContext({ ...devices['iPhone 11'] })
  console.log('✅ iPhone 11 context created successfully!');
  
  const page = await context.newPage()
  console.log('🆕 Creating new page with iPhone 11 viewport...');

  console.log('🔍 Navigating to DuckDuckGo...');
  await page.goto("https://duckduckgo.com");

  console.log('🔍 Finding search box...');
  let element = await page.locator("[name=\"q\"]");
  
  console.log('👆 Clicking search box...');
  await element.click();
  
  console.log('⌨️  Typing "LambdaTest"...');
  await element.type("LambdaTest");
  
  console.log('⏎ Pressing Enter...');
  await element.press("Enter");
  
  console.log('⏳ Waiting for search results...');
  const title = await page.title()
  console.log('📄 Page title:', title);

  try {
    console.log('🧪 Verifying title matches expected result...');
    expect(title).toEqual('LambdaTest at DuckDuckGo')
    console.log('✅ iPhone Test PASSED! Title matched successfully');
    
    // Mark the test as completed or failed
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`)
    console.log('📊 Marked test as PASSED in LambdaTest dashboard');
    
    await teardown(page, browser)
  } catch (e) {
    console.log('❌ iPhone Test FAILED!');
    console.log('💥 Error:', e.message);
    console.log('📊 Expected title: "LambdaTest at DuckDuckGo"');
    console.log('📊 Actual title:', title);
    
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: e.stack } })}`)
    console.log('📊 Marked test as FAILED in LambdaTest dashboard');
    
    await teardown(page, browser)
    throw e
  }

})().catch(err => {
  console.error('💥 Unexpected error occurred in iPhone test:');
  console.error(err);
  process.exit(1);
});

async function teardown(page, browser) {
  console.log('🧹 Cleaning up iPhone test resources...');
  await page.close();
  await browser.close();
  console.log('✅ iPhone test completed and resources cleaned up!');
}