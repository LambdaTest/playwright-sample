require('dotenv').config();
const { webkit } = require("playwright");
const { expect } = require("expect");

(async () => {
  console.log('Starting Playwright iOS Real Device test...');
  console.log('Device: iPhone 16 (iOS 18)');
  
  const capabilities = {
    "LT:Options": {
      "platformName": "ios",
      "deviceName": "iPhone 16",
      "platformVersion": "18",
      "isRealMobile": true,
      "build": "Playwright iOS Build",
      "name": "Playwright iOS test",
      "user": process.env.LT_USERNAME,
      "accessKey": process.env.LT_ACCESS_KEY,
      "network": true,
      "video": true,
      "console": true,
      "projectName": "New UI",
    },
  };

  console.log('Connecting to LambdaTest iOS cloud...');
  console.log('Username:', process.env.LT_USERNAME);
  console.log('Platform: iOS 18, Device: iPhone 16');

  let browser = await webkit.connect(
      `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
          JSON.stringify(capabilities))}`,
  );

  console.log('Connected to iOS device successfully!');
  console.log(`Device: iPhone 16, iOS 18`);

  console.log('Creating browser context...');
  let context = await browser.newContext({
    hasTouch: true,  // Enable touch support for iOS
    isMobile: true   // Enable mobile mode for iOS
  });
  let page = await context.newPage();

  console.log('Navigating to Wikipedia...');
  await page.goto('https://www.wikipedia.org/', { timeout: 30000 });
  
  console.log('Finding search input...');
  let element = await page.locator('input[name="search"]');
  
  console.log('Clicking search input...');
  await element.click();
  
  console.log('Typing "playwright"...');
  await element.fill('playwright');
  
  console.log('Clicking search input again...');
  await element.click();
  
  console.log('Current URL:', await page.url());
  
  console.log('Finding and clicking search button...');
  await page.locator('#search-form > fieldset > button').click();
  
  console.log('Waiting for search results...');
  await page.waitForTimeout(3000);
  
  console.log('Counting occurrences of "19th century"...');
  const count = await page.getByText('19th century').count();
  console.log('Found', count, 'occurrences of "19th century"');
  
  try {
    console.log('Verifying count...');
    expect(count).toEqual(3);
    console.log('iOS Test PASSED!');
    
    // Mark the test as completed or failed
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: "setTestStatus", arguments: {status: "passed", remark: "Wikipedia test passed - found 3 occurrences of '19th century'" },})}`);
    console.log('Marked test as PASSED in LambdaTest dashboard');
    
    await teardown(page, context, browser)
  } catch (e) {
    console.log('iOS Test FAILED!');
    console.log('Error:', e.message);
    console.log('Expected: 3 occurrences of "19th century"');
    console.log('Actual count:', count);
    
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({action: "setTestStatus", arguments: { status: "failed", remark: e.message }})}`);
    console.log('Marked test as FAILED in LambdaTest dashboard');
    
    await teardown(page, context, browser)
    throw e.stack
  }

})().catch(err => {
  console.error('Unexpected error occurred in iOS test:');
  console.error(err);
  process.exit(1);
});

async function teardown(page, context, browser) {
  console.log('Cleaning up iOS test resources...');
  try {
    console.log('   Closing page...');
    await Promise.race([
      page.close(),
      new Promise(resolve => setTimeout(resolve, 10000)) // 10 second timeout
    ]);
    console.log('   Page closed');
    
    console.log('   Closing context...');
    await Promise.race([
      context.close(),
      new Promise(resolve => setTimeout(resolve, 10000)) // 10 second timeout
    ]);
    console.log('   Context closed');
    
    console.log('   Closing browser connection...');
    await Promise.race([
      browser.close(),
      new Promise(resolve => setTimeout(resolve, 15000)) // 15 second timeout for browser
    ]);
    console.log('   Browser closed');
    
    console.log('iOS test completed and resources cleaned up!');
  } catch (error) {
    console.log('Cleanup completed with warnings:', error.message);
  }
    process.exit(0);
} 