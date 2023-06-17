const { chromium } = require('playwright')
const { expect } = require('@playwright/test');

(async () => {
  const capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Playwright SmartUI Build',
      'name': 'Playwright SmartUI Test',
      'user': '26_dec_gdprltqa',
      'accessKey': 'CLDPAiJbkzAvBweW5qSBU1QCVKp7wj7RhHhIJrsXcWbhzQTOTe',
      'network': true,
      'video': true,
      'console': true,
      // 'smartUIProjectName': 'Playwright-SmartUI-Project',
      'smartUIBaseline': false
    }
  }

  const githubURL = process.env.GITHUB_URL
  if(githubURL){
    capabilities['LT:Options']['github'] = {
      url : githubURL
    }
  }

  
  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  })

  const page = await browser.newPage()

  await page.goto("https://duckduckgo.com");

  // Add the following command in order to take screenshot in SmartUI
  // await page.evaluate((_) => {},
  //   `lambdatest_action: ${JSON.stringify({ action: 'smartui.takeScreenshot', arguments: { fullPage: true, screenshotName: 'search-lambdatest' }
  //   })}`) // Add a relevant screenshot name here

  let element = await page.$("[name=\"q\"]");
  await element.click();
  await element.type("LambdaTest");
  await element.press("Enter");
  const title = await page.title()

  try {
    expect(title).toEqual('LambdaTest at DuckDuckGo')
    // Mark the test as completed or failed
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`)
  } catch {
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Title not matched' } })}`)
  }

  // await page.goto("https://www.lambdatest.com")

  // await page.evaluate((_) => {},
  //   `lambdatest_action: ${JSON.stringify({ action: 'smartui.takeScreenshot', arguments: { fullPage: true, screenshotName: 'lambdatest-website' }
  //   })}`) 
  // await page.goto("https://www.lambdatest.com/support/api-doc/")

  // await page.evaluate((_) => {},
  //   `lambdatest_action: ${JSON.stringify({ action: 'smartui.takeScreenshot', arguments: { fullPage: true, screenshotName: 'api-doc' }
  //   })}`) 

    await browser.close()
})()
