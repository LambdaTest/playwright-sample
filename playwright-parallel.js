require('dotenv').config();
const { chromium } = require('playwright')
const {expect} = require("expect");
const cp = require('child_process');
const playwrightClientVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];

const parallelTests = async (capability) => {
  const testName = capability['LT:Options']['name'];
  const platform = capability['LT:Options']['platform'];
  const browser = capability['browserName'];
  
  console.log(`🚀 Starting parallel test: ${testName}`);
  console.log(`🌐 Platform: ${platform}, Browser: ${browser}`);
  console.log(`👤 Username: ${process.env.LT_USERNAME}`);

  console.log(`🔗 Connecting to LambdaTest for ${testName}...`);
  const browserInstance = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capability))}`
  })

  console.log(`✅ Connected successfully for ${testName}!`);
  console.log(`🆕 Creating new page for ${testName}...`);

  const page = await browserInstance.newPage()

  console.log(`🔍 Navigating to DuckDuckGo for ${testName}...`);
  await page.goto("https://duckduckgo.com");

  console.log(`🔍 Finding search box for ${testName}...`);
  let element = await page.locator("[name=\"q\"]");
  
  console.log(`👆 Clicking search box for ${testName}...`);
  await element.click();
  
  console.log(`⌨️  Typing "LambdaTest" for ${testName}...`);
  await element.type("LambdaTest");
  
  console.log(`⏎ Pressing Enter for ${testName}...`);
  await element.press("Enter");
  
  console.log(`⏳ Waiting for search results for ${testName}...`);
  const title = await page.title()
  console.log(`📄 Page title for ${testName}:`, title);

  try {
    console.log(`🧪 Verifying title for ${testName}...`);
    expect(title).toEqual('LambdaTest at DuckDuckGo')
    console.log(`✅ Test PASSED for ${testName}! Title matched successfully`);
    
    // Mark the test as completed or failed
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`)
    console.log(`📊 Marked test as PASSED in LambdaTest dashboard for ${testName}`);
    
    await teardown(page, browserInstance)
  } catch (e) {
    console.log(`❌ Test FAILED for ${testName}!`);
    console.log(`💥 Error for ${testName}:`, e.message);
    console.log(`📊 Expected title: "LambdaTest at DuckDuckGo"`);
    console.log(`📊 Actual title for ${testName}:`, title);
    
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: e.stack } })}`)
    console.log(`📊 Marked test as FAILED in LambdaTest dashboard for ${testName}`);
    
    await teardown(page, browserInstance)
    throw e.stack
  }

}

async function teardown(page, browser) {
  console.log(`🧹 Cleaning up resources for test...`);
  await page.close();
  await browser.close();
  console.log(`✅ Test completed and resources cleaned up!`);
}

console.log('🔥 Starting Playwright Parallel Tests...');
console.log('📋 Playwright version:', playwrightClientVersion);
console.log('📊 Running 3 parallel tests across different platforms and browsers');

// Capabilities array for with the respective configuration for the parallel tests
const capabilities = [
  {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Playwright With Parallel Build',
      'name': 'Playwright Sample Test on Windows 10 - Chrome',
      'user': process.env.LT_USERNAME,
      'accessKey': process.env.LT_ACCESS_KEY,
      'network': true,
      'video': true,
      'console': true,
      'playwrightClientVersion': playwrightClientVersion
    }
  },
  {
    'browserName': 'MicrosoftEdge',
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'MacOS Ventura',
      'build': 'Playwright With Parallel Build',
      'name': 'Playwright Sample Test on Windows 8 - MicrosoftEdge',
      'user': process.env.LT_USERNAME,
      'accessKey': process.env.LT_ACCESS_KEY,
      'network': true,
      'video': true,
      'console': true,
      'playwrightClientVersion': playwrightClientVersion
    }
  },
  {
    'browserName': 'Chrome',
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'MacOS Big sur',
      'build': 'Playwright With Parallel Build',
      'name': 'Playwright Sample Test on MacOS Big sur - Chrome',
      'user': process.env.LT_USERNAME,
      'accessKey': process.env.LT_ACCESS_KEY,
      'network': true,
      'video': true,
      'console': true,
      'playwrightClientVersion': playwrightClientVersion
    }
  }]

console.log('🚀 Launching all parallel tests...');

const executeTests = async () => {
  try {
    const promises = capabilities.map(capability => parallelTests(capability));
    await Promise.all(promises);
    console.log('🎉 All parallel tests completed successfully!');
  } catch (error) {
    console.error('💥 Error in parallel tests execution:');
    console.error(error);
    process.exit(1);
  }
};

executeTests();
