const expect = require('chai').expect
const { chromium } = require('playwright');

(async () => {
    const capabilities = {
      'browserName': 'Chrome',
      'browserVersion': 'latest',
      'LT:Options': {
        'platform': 'MacOS Catalina',
        'build': 'Playwright Sample Build',
        'name': 'Playwright Sample Test',
        'user': '<your user name>',
        'accessKey': '<your access key>',
        'network': true
      }
   };

  const browser = await chromium.connectOverCDP({
    endpointURL: `wss://stage-cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`,
  });

  const page = await browser.newPage();

  await page.goto('https://www.bing.com');

  const element = await page.$('[aria-label="Enter your search term"]');
  await element.click();
  await element.type('LambdaTest');
  await element.press('Enter');
  const title = await page.title();

  expect(title).to.equal("LambdaTest - Search", 'Incorrect title!');

  await browser.close();
})();
