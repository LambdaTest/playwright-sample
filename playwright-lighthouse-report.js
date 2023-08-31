const { chromium } = require('playwright')
const {expect} = require("expect");

(async () => {
  const capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Playwright Test Lighthouse Report',
      'name': 'Playwright Test with Lighthouse report',
      'user': process.env.LT_USERNAME,
      'accessKey': process.env.LT_ACCESS_KEY,
      'network': true,
      'video': true,
      'console': true,
      'tunnel': false, // Add tunnel configuration if testing locally hosted webpage
      'tunnelName': '', // Optional
      'geoLocation': '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
    }
  }

  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  })

  const page = await browser.newPage()

  await page.goto('https://www.bing.com')

  // Generate the lighthouse report for the provided URL
  await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'lighthouseReport', arguments: { url: 'https://www.bing.com' }})}`)

  const element = await page.locator('[id="sb_form_q"]')
  await element.click()
  await element.type('LambdaTest')
  await page.waitForTimeout(1000)
  await page.keyboard.press('Enter')
  await page.waitForSelector('[class=" b_active"]')
  const title = await page.title()

  // Generate the lighthouse report
  // You can generate multiple lighthouse reports in a test
  await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'lighthouseReport', arguments: { url: "https://login.live.com" }})}`)

  try {
    expect(title).toEqual('LambdaTest - Search')
    // Mark the test as completed or failed
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`)
    await teardown(page, browser)
  } catch (e) {
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: e.stack } })}`)
    await teardown(page, browser)
    throw e.stack
  }
})()

async function teardown(page, browser) {
  await page.close();
  await browser.close();
}
