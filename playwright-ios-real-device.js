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
      JSON.stringify(capabilities)
    )}`,
  );

  console.log('Connected to iOS device successfully!');
  console.log('Device: iPhone 16, iOS 18');

  console.log('Creating browser context...');
  let context = await browser.newContext({
    hasTouch: true,
    isMobile: true
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

  console.log('Finding and clicking search button...');
  await page.locator('#search-form > fieldset > button').click();

  console.log('Waiting for article page...');
  await page.waitForLoadState('networkidle');

  try {
    console.log('Verifying article heading...');
    
    const heading = page.locator('#firstHeading');
    await heading.waitFor({ state: 'visible', timeout: 10000 });

    const headingText = await heading.textContent();
    console.log('Article heading:', headingText);

    expect(headingText.toLowerCase()).toContain('playwright');

    console.log('iOS Test PASSED!');

    await page.evaluate(
      _ => {},
      `lambdatest_action: ${JSON.stringify({
        action: "setTestStatus",
        arguments: {
          status: "passed",
          remark: "Wikipedia Playwright article loaded successfully"
        },
      })}`
    );

    console.log('Marked test as PASSED in LambdaTest dashboard');

    await teardown(page, context, browser);

  } catch (e) {

    console.log('iOS Test FAILED!');
    console.log('Error:', e.message);

    await page.evaluate(
      _ => {},
      `lambdatest_action: ${JSON.stringify({
        action: "setTestStatus",
        arguments: {
          status: "failed",
          remark: e.message
        }
      })}`
    );

    console.log('Marked test as FAILED in LambdaTest dashboard');

    await teardown(page, context, browser);

    throw e;
  }

})().catch(err => {
  console.error('Unexpected error occurred in iOS test:');
  console.error(err);
  process.exit(1);
});

async function teardown(page, context, browser) {
  console.log('Cleaning up iOS test resources...');

  try {
    console.log('Closing page...');
    await Promise.race([
      page.close(),
      new Promise(resolve => setTimeout(resolve, 10000))
    ]);

    console.log('Closing context...');
    await Promise.race([
      context.close(),
      new Promise(resolve => setTimeout(resolve, 10000))
    ]);

    console.log('Closing browser connection...');
    await Promise.race([
      browser.close(),
      new Promise(resolve => setTimeout(resolve, 15000))
    ]);

    console.log('iOS test completed and resources cleaned up!');

  } catch (error) {
    console.log('Cleanup completed with warnings:', error.message);
  }

  process.exit(0);
}