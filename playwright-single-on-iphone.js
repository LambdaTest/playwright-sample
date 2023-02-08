const { chromium, devices } = require('playwright')
const { expect } = require('@playwright/test');
const cp = require('child_process');
const playwrightClientVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];

(async () => {
  const capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Playwright Sample Build',
      'name': 'Playwright Sample Test',
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

  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  })

  // Documentation: https://playwright.dev/docs/emulation#devices
  // Supported devices: https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/server/deviceDescriptorsSource.json
  const context = await browser.newContext({ ...devices['iPhone 11'] })
  const page = await context.newPage()

  await page.goto('https://www.bing.com')

  const element = await page.$('[id="sb_form_q"]')
  await element.click()
  await element.type('LambdaTest')
  await page.waitForTimeout(1000)
  await page.keyboard.press('Enter')
  await page.waitForSelector('[class=" b_active"]')
  const title = await page.title()

  try {
    expect(title).toEqual('LambdaTest - Search')
    // Mark the test as completed or failed
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`)
  } catch {
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Title not matched' } })}`)
  }

  await browser.close()
})()
