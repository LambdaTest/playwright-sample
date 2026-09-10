const { test } = require('../lambdatest-setup')
const { expect } = require('@playwright/test')

test.describe('Browse TestMu AI in different search engines', () => {
  test('Search TestMu AI on DuckDuckGo', async ({ page }) => {
    await page.goto('https://duckduckgo.com')
    let element = await page.locator("[name=\"q\"]");
    await element.click();
    await element.type("TestMu AI");
    await element.press("Enter");
    const title = await page.title()

    console.log('Page title:: ', title)
    // Use the expect API for assertions provided by playwright
    expect(title).toEqual(expect.stringContaining('TestMu AI'))
  })
})
