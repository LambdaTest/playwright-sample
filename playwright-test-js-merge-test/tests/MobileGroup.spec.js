const { test, expect } = require('@playwright/test');
const { setupBrowser,tearDown } = require('../lambdatest-setup')

// test.describe.configure({ mode: 'parallel' });

test.describe('Group 1', () => {
  let browser;
  let context;
  let page;
  let device;

  test.beforeAll(async ({}, testInfo) => {
    const {ltPage,ltDevice,ltContext,ltBrowser} = await setupBrowser(testInfo);
    page = ltPage;
    device = ltDevice;
    context = ltContext;
    browser = ltBrowser;
   });

  test.afterAll(async ({}, testInfo) => {

    await tearDown(page,context,browser,device,testInfo);
  });

  
  test('test 1 Search LambdaTest on DuckDuckGo', async () => {
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

  test('test 2 Search LambdaTest on DuckDuckGo', async () => {
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