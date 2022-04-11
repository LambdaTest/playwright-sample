const { setWorldConstructor } = require("@cucumber/cucumber");
const { chromium } = require('playwright')

const capabilities = {
  'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
  'browserVersion': 'latest',
  'LT:Options': {
    'platform': 'Windows 10',
    'build': 'Playwright Sample Build with Cucumber Runner',
    'name': 'Playwright Sample Test',
    'user': process.env.LT_USERNAME,
    'accessKey': process.env.LT_ACCESS_KEY,
    'network': true,
    'video': true,
    'console': true
  }
}

class CustomWorld {
  async openUrl(url) {
    const browser = await chromium.connect({
      wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    })

    const context = await browser.newContext();
    this.page = await context.newPage();
    await this.page.goto(url);
  }

  async setTestStatus(status, remark) {
    await this.page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status, remark } })}`)
  }
}

setWorldConstructor(CustomWorld);
