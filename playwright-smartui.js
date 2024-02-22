const { chromium } = require('playwright')
const {expect} = require("expect");

(async () => {
  const capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Playwright SmartUI Build',
      'name': 'Playwright SmartUI Test',
      'user': process.env.LT_USERNAME,
      'accessKey': process.env.LT_ACCESS_KEY,
      'network': true,
      'video': true,
      'console': true,
      'smartUIProjectName': process.env.SMARTUI_PROJECT || 'SmartUI-PW',
      'smartUIBaseline': false
    }
  }

  const githubURL = process.env.GITHUB_URL
  if (githubURL) {
    capabilities['LT:Options']['github'] = {
      url: githubURL
    }
  }

  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  })

  console.log('Browser Launched')
  const page = await browser.newPage()

  console.log('Navigating URL')
  await page.goto('https://ipinfo.io/')

  // Add the following command in order to take screenshot in SmartUI
  // Add a relevant screenshot name
  // Set `fullPage: true` to take full page screenshots
  await page.evaluate((_) => {}, `lambdatest_action: ${JSON.stringify({
    action: 'smartui.takeScreenshot',
    arguments: { fullPage: true, screenshotName: 'ipinfo',
    selectDOM: {cssSelector:['h1.heading-h1']} }
  })}`)

  await page.goto("https://demo.testim.io/");

  await page.evaluate((_) => {}, `lambdatest_action: ${JSON.stringify({
    action: 'smartui.takeScreenshot',
    arguments: { fullPage: true, screenshotName: 'demo' }
  })}`)


  const title = await page.title()

  try {
    // Pass the `page` object. Add `screennshotName` if you want to fetch response for a specific screenshot
    await validateSmartUIScreenshots(page)

    expect(title).toEqual('Space & Beyond | Testim.io demo')
    // Mark the test as completed or failed
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({
      action: 'setTestStatus',
      arguments: { status: 'passed', remark: 'Title matched' }
    })}`)
    await teardown(page, browser)
  } catch (err) {
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({
      action: 'setTestStatus',
      arguments: { status: 'failed', remark: err.stack }
    })}`)
    await teardown(page, browser)
    throw err.stack
  }

})()

async function teardown(page, browser) {
  await page.close();
  await browser.close();
}

const validateSmartUIScreenshots = async (page, screenshotName) => {
  try {
    await page.waitForTimeout(5000) // Added delay to get reports of all screenshots captured

    let screenshotResponse = JSON.parse(await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'smartui.fetchScreenshotStatus', arguments: { screenshotName }})}`))
    console.log('screenshotStatus response: ', screenshotResponse)

    if (screenshotResponse.screenshotsData && Array.isArray(screenshotResponse.screenshotsData)) {
      for (let i = 0; i < screenshotResponse.screenshotsData.length; i++) {
        let screenshot = screenshotResponse.screenshotsData[i];
        if (screenshot.screenshotStatus !== "Approved") {
          throw new Error(`Screenshot status is not approved for the screenshot ${screenshot.screenshotName}`);
        }
      }
    }
  } catch (error) {
    throw new Error(error);
  }
}