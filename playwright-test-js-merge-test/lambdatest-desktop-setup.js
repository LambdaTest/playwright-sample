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
// Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
'browserName': 'Chrome',
      'browserVersion': 'latest',
      'LT:Options': {
        
        'video': true,
        'console': true,
        'tunnel': false, // Add tunnel configuration if testing locally hosted webpage
        'tunnelName': '', // Optional
        'idleTimeout': 1800,
        'user': process.env.LT_USERNAME,
        'accessKey': process.env.LT_ACCESS_KEY,
        'useSpecificBundleVersion': true,
        'platform': 'MacOs Ventura',
        'build': 'Playwright JS Build - Desktop',
        'name': 'Playwright Test',
        'network': false,
      }
  }
  let device, context, browser, ltPage;
  browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(lambdatestCapabilities))}`)
  ltPage = await browser.newPage()
return ltPage;
}

module.exports = { setupBrowser };