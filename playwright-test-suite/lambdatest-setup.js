const base = require('@playwright/test');
const path = require('path')
const { chromium } = require('playwright')

// LambdaTest capabilities
const capabilities = {
  'browserName': 'Chrome',
  'browserVersion': 'latest',
  'LT:Options': {
    'platform': 'Windows 10',
    'build': 'Playwright Build',
    'name': 'Playwright Test',
    'user': process.env.LT_USERNAME,
    'accessKey': process.env.LT_ACCESS_KEY,
    // 'accessKey': process.env.LT_ACCESS_KEY_PROD,
    'network': true,
    'video': true
  }
};

// Patching the capabilities dynamically according to the project name.
const modifyCapabilities = (configName, testName) => {
  let config = configName.split('@lambdatest')[0];
  let [browserName, browserVersion, platform] = config.split(':');
  capabilities.browserName = browserName ? browserName : capabilities.browserName;
  capabilities.browserVersion = browserVersion ? browserVersion : capabilities.browserVersion;
  capabilities['LT:Options']['platform'] = platform ? platform : capabilities['LT:Options']['platform'];
  capabilities['LT:Options']['name'] = testName;
};

const isHash = (entity) => Boolean(entity && typeof(entity) === "object" && !Array.isArray(entity));
const nestedKeyValue = (hash, keys) => keys.reduce((hash, key) => (isHash(hash) ? hash[key] : undefined), hash);

exports.test = base.test.extend({
  page: async ({ page, playwright }, use, testInfo) => {
    // Configure LambdaTest platform for cross-browser testing
    let fileName = testInfo.file.split(path.sep).pop()
    if (testInfo.project.name.match(/lambdatest/)) {
      modifyCapabilities(testInfo.project.name, `${testInfo.title} - ${fileName}`);

      const browser = await chromium.connectOverCDP({
        endpointURL: `wss://stage-cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`,
      });

      const ltPage = await browser.newPage(testInfo.project.use);
      await use(ltPage);

      const testStatus = {
        action: 'setTestStatus',
        arguments: {
          status: testInfo.status,
          remark: nestedKeyValue(testInfo, ['error', 'message'])
        },
      };
      await ltPage.evaluate(() => {},
      `lambdatest_action: ${JSON.stringify(testStatus)}`);
      await ltPage.close();
      await browser.close();
    } else {
      await use(page);
    }
  },
});
