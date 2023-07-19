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
      'smartUIProjectName': 'Play Wright HIHI',
      'smartUIBaseline': false
    }
  }

  const githubURL = process.env.GITHUB_URL
  if (githubURL) {
    capabilities['LT:Options']['github'] = {
      url: githubURL
    }
  }

  console.log(capabilities)

  const browser = await chromium.connect({
    wsEndpoint: `wss://stage-cdp.lambdatestinternal.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  })

  console.log('Browser Launched')
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

})()

async function teardown(page, browser) {
  await page.close();
  await browser.close();
}

  await page.evaluate((_) => {},
    `lambdatest_action: ${JSON.stringify({ action: 'smartui.takeScreenshot', arguments: { fullPage: true, screenshotName: 'lambdatest-website' }
    })}`) 
  await page.goto("https://www.lambdatest.com/blog")

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