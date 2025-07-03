require('dotenv').config();
const { chromium } = require('playwright')
const {expect} = require("expect");

(async () => {
  console.log('🚦 Starting Playwright Lighthouse Report test...');
  console.log('🌐 Platform: Windows 10, Browser: Chrome');
  console.log('📊 Test: Performance testing with Lighthouse reports');
  
  const capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Playwright Test Lighthouse Report',
      'name': 'Playwright Test with Lighthouse report',
      'user': process.env.LT_USERNAME,
      'accessKey': process.env.LT_ACCESS_KEY,
      'network': true,
      'video': true,
      'console': true,
      'tunnel': false, // Add tunnel configuration if testing locally hosted webpage
      'tunnelName': '', // Optional
      'geoLocation': '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
    }
  }

  console.log('🔗 Connecting to LambdaTest...');
  console.log('👤 Username:', process.env.LT_USERNAME);

  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  })

  console.log('✅ Connected to LambdaTest successfully!');
  console.log('🆕 Creating new page...');

  const page = await browser.newPage()

  console.log('🔍 Navigating to Bing...');
  await page.goto('https://www.bing.com')

  console.log('📊 Generating Lighthouse report for Bing...');
  // Generate the lighthouse report for the provided URL
  await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'lighthouseReport', arguments: { url: 'https://www.bing.com' }})}`)

  console.log('🔍 Finding search box...');
  const element = await page.locator('[id="sb_form_q"]')
  
  console.log('👆 Clicking search box...');
  await element.click()
  
  console.log('⌨️  Typing "LambdaTest"...');
  await element.type('LambdaTest')
  await page.waitForTimeout(1000)
  
  console.log('⏎ Pressing Enter...');
  await page.keyboard.press('Enter')
  
  console.log('⏳ Waiting for search results...');
  await page.waitForSelector('[class=" b_active"]')
  const title = await page.title()
  console.log('📄 Page title:', title);

  console.log('📊 Generating second Lighthouse report for login.live.com...');
  // Generate the lighthouse report
  // You can generate multiple lighthouse reports in a test
  await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'lighthouseReport', arguments: { url: "https://login.live.com" }})}`)

  try {
    console.log('🧪 Verifying search results title...');
    expect(title).toEqual('LambdaTest - Search')
    console.log('✅ Lighthouse Test PASSED! Title matched successfully');
    
    // Mark the test as completed or failed
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`)
    console.log('📊 Marked test as PASSED in LambdaTest dashboard');
    
    await teardown(page, browser)
  } catch (e) {
    console.log('❌ Lighthouse Test FAILED!');
    console.log('💥 Error:', e.message);
    console.log('📊 Expected title: "LambdaTest - Search"');
    console.log('📊 Actual title:', title);
    
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: e.stack } })}`)
    console.log('📊 Marked test as FAILED in LambdaTest dashboard');
    
    await teardown(page, browser)
    throw e.stack
  }
})().catch(err => {
  console.error('💥 Unexpected error occurred in Lighthouse test:');
  console.error(err);
  process.exit(1);
});

async function teardown(page, browser) {
  console.log('🧹 Cleaning up Lighthouse test resources...');
  await page.close();
  await browser.close();
  console.log('✅ Lighthouse test completed and resources cleaned up!');
}
