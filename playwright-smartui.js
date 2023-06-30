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
      'user': process.env.LT_USERNAME,
      'accessKey': process.env.LT_ACCESS_KEY,
      'network': true,
      'video': true,
      'console': true,
      'smartUIProjectName': 'Playwright-SmartUI-Project-approveAll',
      'smartUIBaseline': false
    }
  }

  const githubURL = process.env.GITHUB_URL
  if(githubURL){
    capabilities['LT:Options']['github'] = {
      url : githubURL
    }
  }

  console.log(capabilities)
  
  const browser = await chromium.connect({
    wsEndpoint: `wss://stage-cdp.lambdatestinternal.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  })

  const page = await browser.newPage()

  await page.goto('https://www.google.com')

  // Add the following command in order to take screenshot in SmartUI
  await page.evaluate((_) => {},
    `lambdatest_action: ${JSON.stringify({ action: 'smartui.takeScreenshot', arguments: { fullPage: true, screenshotName: 'search-lambdatest' }
    })}`) // Add a relevant screenshot name here

  // const element = await page.$('[id="sb_form_q"]')
  // await element.click()
  // await element.type('LambdaTest')
  // await page.waitForTimeout(1000)
  // await page.keyboard.press('Enter')
  // await page.waitForSelector('[class=" b_active"]')
  // const title = await page.title()

  // try {
  //   expect(title).toEqual('LambdaTest - Search')
  //   // Mark the test as completed or failed
  //   await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`)
  // } catch {
  //   await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Title not matched' } })}`)
  // }

  await page.goto("https://www.lambdatest.com")

  await page.evaluate((_) => {},
    `lambdatest_action: ${JSON.stringify({ action: 'smartui.takeScreenshot', arguments: { fullPage: true, screenshotName: 'lambdatest-website' }
    })}`) 
  await page.goto("https://www.lambdatest.com/blog")

  await page.evaluate((_) => {},
    `lambdatest_action: ${JSON.stringify({ action: 'smartui.takeScreenshot', arguments: { fullPage: true, screenshotName: 'api-doc' }
    })}`) 

    await browser.close()
})()
