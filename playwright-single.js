const expect = require('chai').expect
const { chromium } = require('playwright');

(async () => {
    const capabilities = {
      'browserName': 'Chrome',
      'browserVersion': 'latest',
      'LT:Options': {
        'platform': 'Windows 10',
        'build': 'Playwright Sample Build',
        'name': 'Playwright Sample Test',
        'user': process.env.LT_USERNAME,
        'accessKey': process.env.LT_ACCESS_KEY,
        'network': true,
        'video': true
      }
   };

  const browser = await chromium.connectOverCDP({
    endpointURL: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`,
  });

  const page = await browser.newPage();

  await page.goto('https://www.bing.com');

  const element = await page.$('[aria-label="Enter your search term"]');
  await element.click();
  await element.type('LambdaTest');
  await element.press('Enter');
  const title = await page.title();

  try {
    expect(title).to.equal('LambdaTest - Search', 'Incorrect title!')
    // Mark the test as completed or failed
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'completed', remark: 'Title matched' } })}`)
  } catch {
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Title not matched' } })}`)
  }

  await browser.close();
})();
