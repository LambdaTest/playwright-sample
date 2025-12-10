import 'dotenv/config';
import * as base from '@playwright/test';
import path from 'path';
import { chromium, _android, webkit } from 'playwright';

/* Capabilities will be over-ridden by Device & OS combinations from playwright.config.js */
const capabilities = {
  browserName: 'Chrome',
  browserVersion: 'latest',
  'LT:Options': {
    platform: 'Windows 10',
    build: 'Playwright Build',
    name: 'Playwright Test',
    user: process.env.LT_USERNAME,
    accessKey: process.env.LT_ACCESS_KEY,
    network: true,
    video: true,
    terminal: true,
    console: true,
    /* Enable tunnel for testing locally-hosted pages */
    tunnel: false,
    tunnelName: '',
    geoLocation: '',
  },
};


const modifyCapabilities = (configName, testName) => {
  const config = configName.split('@lambdatest')[0];

  if (/android/i.test(configName)) {
    const [deviceName, platformVersion, platformName] = config.split(':');
    delete capabilities.browserName;
    delete capabilities.browserVersion;
    capabilities['LT:Options'] = {
      ...capabilities['LT:Options'],
      platformName: platformName || 'android',
      deviceName: deviceName || 'Galaxy S21 5G',
      platformVersion: platformVersion || '12',
      isRealMobile: true,
      build: '[JS] Playwright Android Real Device Build',
      name: testName,
    };
  } else if (/ios/i.test(configName)) {
    const [deviceName, platformVersion, platformName] = config.split(':');
    delete capabilities.browserName;
    delete capabilities.browserVersion;
    capabilities['LT:Options'] = {
      ...capabilities['LT:Options'],
      platformName: platformName || 'ios',
      deviceName: deviceName || 'iPhone 16',
      platformVersion: platformVersion || '18',
      isRealMobile: true,
      ensureWebviewsHavePages: true,
      autoAcceptAlerts: true,
      autoGrantPermissions: true,
      build: '[JS] Playwright iOS Real Device Build',
      name: testName,
    };
  } else {
    const [browserName, browserVersion, platform] = config.split(':');
    capabilities.browserName = browserName || 'Chrome';
    capabilities.browserVersion = browserVersion || 'latest';
    capabilities['LT:Options'] = {
      ...capabilities['LT:Options'],
      platform: platform || 'Windows 10',
      build: '[JS] Playwright Desktop Build',
      name: testName,
    };
  }
};

/* Extend Playwright test */
const test = base.test.extend({
  page: async ({ page }, use, testInfo) => {
    /* Set the iOS Falg to False */
    let isIOS = false;

    const fileName = testInfo.file.split(path.sep).pop() || '';

    if (/lambdatest/i.test(testInfo.project.name)) {
      modifyCapabilities(testInfo.project.name, `${testInfo.title} - ${fileName}`);

      let ltPage;
      let browserOrDevice;

      if (/android/i.test(testInfo.project.name)) {
        const device = await _android.connect(
          `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
            JSON.stringify(capabilities)
          )}`
        );
        await device.shell('am force-stop com.android.chrome');
        const context = await device.launchBrowser();
        ltPage = await context.newPage();
        browserOrDevice = device;
      } else if (/ios/i.test(testInfo.project.name)) {
        /* Set the iOS Flag since the tests are handled in a different way */
        isIOS = true;
        const browser = await webkit.connect(
          `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
            JSON.stringify(capabilities)
          )}`
        );
        console.log('Connected to iOS device successfully!');
        const context = await browser.newContext({ hasTouch: true, isMobile: true });
        ltPage = await context.newPage();
        browserOrDevice = browser;
      } else {
        const browser = await chromium.connect({
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
            JSON.stringify(capabilities)
          )}`,
        });
        ltPage = await browser.newPage();
        browserOrDevice = browser;
      }

      /* Pass isIOS as a property on page for tests */
      ltPage.isIOS = isIOS;

      await use(ltPage);

      const testStatus = {
        action: 'setTestStatus',
        arguments: {
          status: testInfo.status,
          remark: testInfo.error?.stack || testInfo.error?.message || '',
        },
      };
      await ltPage.evaluate(() => {}, `lambdatest_action: ${JSON.stringify(testStatus)}`);

      await ltPage.close();
      await browserOrDevice.close();
    } else {
      /* Local Execution */
      page.isIOS = false;
      await use(page);
    }
  },
});

export default test;