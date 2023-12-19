const { test } = require('../lambdatest-setup')
const { expect } = require('@playwright/test')

test.describe.skip('Browse LambdaTest in different browser contexts', () => {
  test('Search LambdaTest & LambdaTest Blog on DuckDuckGo', async ({ page }, testInfo) => {
    await page.goto('https://duckduckgo.com')
    let element = await page.locator("[name=\"q\"]");
    await element.click();
    await element.type("LambdaTest");
    await element.press("Enter");
    const title = await page.title()

    // Create new browserContext in the same window
    const newPage = await page.context().newPage(testInfo.project.use)
    await newPage.goto('https://duckduckgo.com')
    const searchElement = await newPage.locator("[name=\"q\"]");
    await searchElement.click();
    await searchElement.type("LambdaTest Blog");
    await searchElement.press("Enter");
    const title2 = await newPage.title()

    console.log('Page titles :: ', title, title2)

    // Use the expect API for assertions provided by playwright
    expect(title).toEqual(expect.stringContaining('LambdaTest'))
    expect(title2).toEqual(expect.stringContaining('LambdaTest'))
  })
})
