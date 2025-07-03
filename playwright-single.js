require('dotenv').config();
const { chromium } = require('playwright')
const {expect} = require("expect");
const cp = require('child_process');
const playwrightClientVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];

(async () => {
  console.log('Starting Playwright test...');
  console.log('Playwright version:', playwrightClientVersion);
  
  const capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Playwright Single Build',
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

  console.log('Connecting to LambdaTest...');
  console.log('Username:', process.env.LT_USERNAME);
  console.log('Platform: Windows 10, Browser: Chrome');

  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  })

  console.log('Connected to LambdaTest successfully!');
  console.log('Creating new page...');

  const page = await browser.newPage()

  console.log('Navigating to DuckDuckGo...');
  await page.goto("https://duckduckgo.com");

  console.log('Finding search box...');
  let element = await page.locator("[name=\"q\"]");
  
  console.log('Clicking search box...');
  await element.click();
  
  console.log('Typing "LambdaTest"...');
  await element.type("LambdaTest");
  
  console.log('Pressing Enter...');
  await element.press("Enter");
  
  console.log('Waiting for search results...');
  const title = await page.title()
  console.log('Page title:', title);

  try {
    console.log('Verifying title matches expected result...');
    expect(title).toEqual('LambdaTest at DuckDuckGo')
    console.log('Test PASSED! Title matched successfully');
    
    // Mark the test as completed or failed
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`)
    console.log('Marked test as PASSED in LambdaTest dashboard');
    
    await teardown(page, browser)
  } catch (e) {
    console.log('Test FAILED!');
    console.log('Error:', e.message);
    console.log('Expected title: "LambdaTest at DuckDuckGo"');
    console.log('Actual title:', title);
    
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: e.stack } })}`)
    console.log('Marked test as FAILED in LambdaTest dashboard');
    
    await teardown(page, browser)
    throw e
  }

})().catch(err => {
  console.error('Unexpected error occurred:');
  console.error(err);
  process.exit(1);
});

async function teardown(page, browser) {
  console.log('Cleaning up resources...');
  await page.close();
  await browser.close();
  console.log('Test completed and resources cleaned up!');
}