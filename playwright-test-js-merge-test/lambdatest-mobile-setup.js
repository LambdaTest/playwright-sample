/**
 * Add the file in your test suite to run tests on LambdaTest.
 * Import `test` object from this file in the tests.
 */
const base = require('@playwright/test')
const path = require('path')
const { chromium, _android } = require('playwright')
const cp = require('child_process');
const playwrightClientVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];

async function setupBrowser() {

      const lambdatestCapabilities = {
          'LT:Options': {
            'video': true,
            'console': true,
            'tunnel': false, // Add tunnel configuration if testing locally hosted webpage
            'tunnelName': '', // Optional
            'idleTimeout': 1800,
            
            'user': process.env.LT_USERNAME,
            'accessKey': process.env.LT_ACCESS_KEY,
            'useSpecificBundleVersion': true,
            'deviceName':".*",
            'platformVersion':".*",
            'platformName':'android',
            'build': 'Playwright JS Build - Mobile',
            'name': 'Playwright Test',
            'network': false,
            'isRealMobile': true,
          }
      }
      let device, context, browser, ltPage;

      device = await _android.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(lambdatestCapabilities))}`);
      
      await device.shell("am force-stop com.android.chrome");
      
      context = await device.launchBrowser();
      
      context.setDefaultTimeout(51000);
      ltPage = await context.newPage();
    return ltPage;
}

module.exports = { setupBrowser };