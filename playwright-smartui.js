require('dotenv').config();
const { chromium } = require('playwright')
const {expect} = require("expect");

(async () => {
  console.log('🎨 Starting Playwright SmartUI Visual Testing...');
  console.log('📸 Test: Visual regression testing with SmartUI');
  console.log('🌐 Platform: Windows 10, Browser: Chrome');
  
  const capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Playwright SmartUI Build',
      'name': 'Playwright SmartUI Test',
      'user': process.env.LT_USERNAME,
      'accessKey': process.env.LT_ACCESS_KEY,
      'network': true,
      'video': true,
      'console': true,
      'smartUIProjectName': process.env.SMARTUI_PROJECT || 'SmartUI-PW',
      'smartUIBaseline': false
    }
  }

  console.log('🔗 Connecting to LambdaTest...');
  console.log('👤 Username:', process.env.LT_USERNAME);
  console.log('🎨 SmartUI Project:', process.env.SMARTUI_PROJECT || 'SmartUI-PW');

  const githubURL = process.env.GITHUB_URL
  if (githubURL) {
    console.log('🔗 GitHub URL configured:', githubURL);
    capabilities['LT:Options']['github'] = {
      url: githubURL
    }
  }

  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  })

  console.log('✅ Connected to LambdaTest successfully!');
  console.log('🆕 Creating new page...');
  const page = await browser.newPage()

  console.log('🔍 Navigating to IPInfo...');
  await page.goto('https://ipinfo.io/')

  console.log('📸 Taking SmartUI screenshot of IPInfo...');
  // Add the following command in order to take screenshot in SmartUI
  // Add a relevant screenshot name
  // Set `fullPage: true` to take full page screenshots
  await page.evaluate((_) => {}, `lambdatest_action: ${JSON.stringify({
    action: 'smartui.takeScreenshot',
    arguments: { fullPage: true, screenshotName: 'ipinfo',
    selectDOM: {cssSelector:['h1.heading-h1']} }
  })}`)

  console.log('🔍 Navigating to Testim Demo...');
  await page.goto("https://demo.testim.io/");

  console.log('📸 Taking SmartUI screenshot of Testim Demo...');
  await page.evaluate((_) => {}, `lambdatest_action: ${JSON.stringify({
    action: 'smartui.takeScreenshot',
    arguments: { fullPage: true, screenshotName: 'demo' }
  })}`)

  console.log('📄 Getting page title...');
  const title = await page.title()
  console.log('📄 Page title:', title);

  try {
    console.log('⏳ Validating SmartUI screenshots...');
    // Pass the `page` object. Add `screennshotName` if you want to fetch response for a specific screenshot
    await validateSmartUIScreenshots(page)

    console.log('🧪 Verifying page title...');
    expect(title).toEqual('Space & Beyond | Testim.io demo')
    console.log('✅ SmartUI Test PASSED! Title matched and screenshots validated successfully');
    
    // Mark the test as completed or failed
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({
      action: 'setTestStatus',
      arguments: { status: 'passed', remark: 'Title matched' }
    })}`)
    console.log('📊 Marked test as PASSED in LambdaTest dashboard');
    
    await teardown(page, browser)
  } catch (err) {
    console.log('❌ SmartUI Test FAILED!');
    console.log('💥 Error:', err.message);
    console.log('📊 Expected title: "Space & Beyond | Testim.io demo"');
    console.log('📊 Actual title:', title);
    
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({
      action: 'setTestStatus',
      arguments: { status: 'failed', remark: err.stack }
    })}`)
    console.log('📊 Marked test as FAILED in LambdaTest dashboard');
    
    await teardown(page, browser)
    throw err.stack
  }

})().catch(err => {
  console.error('💥 Unexpected error occurred in SmartUI test:');
  console.error(err);
  process.exit(1);
});

async function teardown(page, browser) {
  console.log('🧹 Cleaning up SmartUI test resources...');
  await page.close();
  await browser.close();
  console.log('✅ SmartUI test completed and resources cleaned up!');
}

const validateSmartUIScreenshots = async (page, screenshotName) => {
  try {
    console.log('⏳ Waiting for SmartUI screenshot processing...');
    await page.waitForTimeout(5000) // Added delay to get reports of all screenshots captured

    console.log('📊 Fetching SmartUI screenshot status...');
    let screenshotResponse = JSON.parse(await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'smartui.fetchScreenshotStatus', arguments: { screenshotName }})}`))
    console.log('📊 Screenshot status response:', screenshotResponse)

    if (screenshotResponse.screenshotsData && Array.isArray(screenshotResponse.screenshotsData)) {
      console.log('🔍 Validating individual screenshots...');
      for (let i = 0; i < screenshotResponse.screenshotsData.length; i++) {
        let screenshot = screenshotResponse.screenshotsData[i];
        console.log(`📸 Screenshot "${screenshot.screenshotName}": ${screenshot.screenshotStatus}`);
        if (screenshot.screenshotStatus !== "Approved") {
          throw new Error(`Screenshot status is not approved for the screenshot ${screenshot.screenshotName}`);
        }
      }
      console.log('✅ All screenshots validated successfully!');
    }
  } catch (error) {
    console.log('❌ SmartUI screenshot validation failed:', error.message);
    throw new Error(error);
  }
}