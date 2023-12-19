/**
 * Add the file in your test suite to run tests on LambdaTest.
 * Import `test` object from this file in the tests.
 */
const base = require('@playwright/test')
const path = require('path')
const { chromium, _android } = require('playwright')
const cp = require('child_process');
const playwrightClientVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];

// LambdaTest capabilities
const capabilities = {
  'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
  'browserVersion': 'latest',
  'LT:Options': {
    'platform': 'Windows 10',
    'build': 'Playwright JS Build',
    'name': 'Playwright Test',
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

// Patching the capabilities dynamically according to the project name.
const modifyCapabilities = (configName, testName) => {
  let config = configName.split('@lambdatest')[0]

  // Check if its an android test or a desktop test
  if (configName.match(/android/)) {
    let [deviceName, platformVersion, platform] = config.split(':')
    capabilities['LT:Options']['deviceName'] = deviceName
    capabilities['LT:Options']['platformVersion'] = platformVersion
    capabilities['LT:Options']['platformName'] = platform
    capabilities['LT:Options']['name'] = testName
    capabilities['LT:Options']['build'] = 'Playwright JS Android Build'
    capabilities['LT:Options']['isRealMobile'] = true

    delete capabilities.browserName;
    delete capabilities.browserVersion;
  } else {
    // Desktop test
    let [browserName, browserVersion, platform] = config.split(':')
    capabilities.browserName = browserName ? browserName : capabilities.browserName
    capabilities.browserVersion = browserVersion ? browserVersion : capabilities.browserVersion
    capabilities['LT:Options']['platform'] = platform ? platform : capabilities['LT:Options']['platform']
    capabilities['LT:Options']['name'] = testName
  }
}

exports.test = base.test.extend({
  page: async ({ page, playwright }, use, testInfo) => {
    // Configure LambdaTest platform for cross-browser testing
    let fileName = testInfo.file.split(path.sep).pop()
    if (testInfo.project.name.match(/lambdatest/)) {
      modifyCapabilities(testInfo.project.name, `${testInfo.title} - ${fileName}`)
      let device, context, browser, ltPage;

      // Check if its a desktop or an android test
      if (testInfo.project.name.match(/android/)) {
        // Android test
        device = await _android.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`);
        await device.shell("am force-stop com.android.chrome");
    
        context = await device.launchBrowser();
        ltPage = await context.newPage(testInfo.project.use);
      } else {
        // Desktop test
        browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`)
        ltPage = await browser.newPage(testInfo.project.use)
      }

      await use(ltPage)

      const testStatus = {
        action: 'setTestStatus',
        arguments: {
          status: testInfo.status,
          remark: testInfo.error?.stack || testInfo.error?.message,
        }
      }
      await ltPage.evaluate(() => {},
        `lambdatest_action: ${JSON.stringify(testStatus)}`)

      await ltPage.close()
      await context?.close();
      await browser?.close()
      await device?.close();
    } else {
      // Run tests in local in case of local config provided
      await use(page)
    }
  }
})
