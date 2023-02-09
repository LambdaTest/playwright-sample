const { test } = require('../lambdatest-setup')
const { expect } = require('@playwright/test')

test.describe('Browse LambdaTest in different browser contexts', () => {
  test('Search LambdaTest on Bing and DuckDuckGo', async ({ page }, testInfo) => {
    await page.goto('https://www.bing.com')
    const element = await page.$('[id="sb_form_q"]')
    await element.click()
    await element.type('LambdaTest')
    await page.waitForTimeout(1000)
    await element.press('Enter')
    await page.waitForSelector('[class=" b_active"]')
    const title = await page.title()

    // Create new browserContext
    const newPage = await page.context().browser().newPage(testInfo.project.use)
    await newPage.goto('https://www.duckduckgo.com')
    const searchElement = await newPage.$("[name=\"q\"]");
    await searchElement.click();
    await searchElement.type("LambdaTest");
    await searchElement.press("Enter");
    const title2 = await newPage.title()

    console.log('Page title:: ', title, title2)

    // Use the expect API for assertions provided by playwright
    expect(title).toEqual(expect.stringContaining('LambdaTest'))
    expect(title2).toEqual(expect.stringContaining('LambdaTest'))
  })
})
