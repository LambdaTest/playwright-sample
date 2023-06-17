// Needs to be higher than the default Playwright timeout
jest.setTimeout(40 * 1000)

describe("DuckDuckGo Search", () => {
  beforeEach(async () => {
    await page.goto('https://duckduckgo.com')
  })

  afterAll(async () => {
    await page.close()
  })
  
  it('title should contain LambdaTest Blog - DuckDuckGo Search', async () => {
    let element = await page.$("[name=\"q\"]");
    await element.click();
    await element.type("LambdaTest Blog");
    await element.press("Enter");
    let title = (await page.title()).toString().trim()
    // let finalTitle = title.trim()
    console.log('Page title:: ', title)
    expect(finalTitle).toBe('LambdaTest Blog at DuckDuckGo')
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({action: 'setTestStatus',arguments: {status: 'passed',remark: 'Test assertion passed'}})}`);
  })

  it('title should contain LambdaTest - DuckDuckGo Search', async () => {
    let element = await page.$("[name=\"q\"]");
    await element.click();
    await element.type("LambdaTest");
    await element.press("Enter");
    let title = (await page.title()).toString().trim()
    // const finalTitle = title.trim()
    console.log('Page title:: ', title)
    expect(title).toBe('LambdaTest at DuckDuckGo')
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({action: 'setTestStatus',arguments: {status: 'passed',remark: 'Test assertion passed'}})}`);
  })
})