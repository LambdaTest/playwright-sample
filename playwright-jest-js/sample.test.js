// Needs to be higher than the default Playwright timeout
jest.setTimeout(40 * 1000)

describe("DuckDuckGo Search", () => {

  let title1, title2

  beforeEach(async () => {
    await page.goto('https://duckduckgo.com')
    await page.waitForTimeout(1000)
  })

  afterAll(async () => {
    try {
      expect(title1).toEqual(expect.stringContaining("LambdaTest"))
      expect(title2).toEqual(expect.stringContaining("LambdaTest"))
      await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({action: 'setTestStatus',arguments: {status: 'passed',remark: 'Test assertion passed'}})}`);
      await page.close()
    } catch (e) {
      await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({action: 'setTestStatus',arguments: {status: 'failed',remark: e.stack}})}`);
      await page.close()
      throw e
    }
  })
  
  it('title should contain LambdaTest Blog - DuckDuckGo Search', async () => {
    let element = await page.locator("[name='q']");
    await element.click();
    await element.type("LambdaTest Blog");
    await element.press("Enter");
    title1 = await page.title()
    console.log('Page title1:: ', title1)
  })

  it('title should contain LambdaTest - DuckDuckGo Search', async () => {
    let element = await page.locator("[name='q']");
    await element.click();
    await element.type("LambdaTest");
    await element.press("Enter");
    title2 = await page.title()
    console.log('Page title2:: ', title2)
  })
})