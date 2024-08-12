/**
 * Add the file in your test suite to run tests on LambdaTest.
 * Import `test` object from this file in the tests.
 */
const path = require('path')
const { chromium, _android } = require('playwright')
const cp = require('child_process');
const playwrightClientVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];

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

  } else {
    // Desktop test
    let [browserName, browserVersion, platform] = config.split(':')
    capabilities.browserName = browserName ? browserName : capabilities.browserName
    capabilities.browserVersion = browserVersion ? browserVersion : capabilities.browserVersion
    capabilities['LT:Options']['platform'] = platform ? platform : capabilities['LT:Options']['platform']
    capabilities['LT:Options']['name'] = testName
  }
}
async function setupBrowser(testInfo) {

  let fileName = testInfo.file.split(path.sep).pop()
     
    let device, context, browser, ltPage;
      if (testInfo.project.name.match(/lambdatest/)) {
        modifyCapabilities(testInfo.project.name, `${testInfo.title} - ${fileName}`)
        
  
        // Check if its a desktop or an android test
        if (testInfo.project.name.match(/android/)) {
          // Android test
          device = await _android.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`);
          
          await device.shell("am force-stop com.android.chrome");
          context = await device.launchBrowser();
          context.setDefaultTimeout(120000)
          ltPage = await context.newPage(testInfo.project.use);

        } else {
          // Desktop test
          browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`)
  
          ltPage = await browser.newPage(testInfo.project.use)
        }
  
       
      }

    return {ltPage,device,context,browser};
}

async function tearDown(ltPage,context,browser,device,testInfo) {
  const testStatus = {
    action: 'setTestStatus',
    arguments: {
      status: testInfo.status,
      remark: testInfo.error?.stack || testInfo.error?.message,
    }
  }
  await ltPage.evaluate(() => {},
    `lambdatest_action: ${JSON.stringify(testStatus)}`)

  await ltPage.close();
  await context?.close();
  await browser?.close()
  await device?.close();
}

module.exports = { setupBrowser,tearDown };