const { test, expect } = require('@playwright/test');
const { setupBrowser } = require('../lambdatest-mobile-setup')
const { chromium, _android } = require('playwright');

// test.describe.configure({ mode: 'parallel' });

test.describe('Group 1', () => {
  let browser;
  let context;
  let page;
  let device;
  let testInfoGlobal; 

  test.beforeAll(async () => {

    page = await setupBrowser();
  });

  test.afterAll(async () => {
    
    if (testInfoGlobal) { 
      const testStatus = {
        action: 'setTestStatus',
        arguments: {
          status: testInfoGlobal.status,
          remark: testInfoGlobal.error?.stack || testInfoGlobal.error?.message,
        }
      }
      await page.evaluate(() => {},
        `lambdatest_action: ${JSON.stringify(testStatus)}`)
    }

    await page?.close();
    await context?.close();
    await browser?.close();
    await device?.close();
  });

  
  test('test 1 Search LambdaTest on DuckDuckGo', async ({},testInfo) => {
    testInfoGlobal = testInfo;
    await page.goto('https://duckduckgo.com')
    let element = await page.locator("[name=\"q\"]");
    await element.click();
    await element.type("LambdaTest");
    await element.press("Enter");
    const title = await page.title()
    

    console.log('Page title:: ', title)
    // Use the expect API for assertions provided by playwright
    expect(title).toEqual(expect.stringContaining('LambdaTest'))
  })

  test('test 2 Search LambdaTest on DuckDuckGo', async ({},testInfo) => {
    testInfoGlobal = testInfo;
    await page.goto('https://duckduckgo.com')
    let element = await page.locator("[name=\"q\"]");
    await element.click();
    await element.type("LambdaTest");
    await element.press("Enter");
    const title = await page.title()
    

    console.log('Page title:: ', title)
    // Use the expect API for assertions provided by playwright
    expect(title).toEqual(expect.stringContaining('LambdaTest'))
  })
});