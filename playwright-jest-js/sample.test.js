// Needs to be higher than the default Playwright timeout
jest.setTimeout(40 * 1000)

describe("Bing Search", () => {
  beforeEach(async () => {
    await page.goto('https://www.bing.com')
  })
  it('title should contain LambdaTest Blog- Bing Search', async () => {
    await page.type('[aria-label="Enter your search term"]', "LambdaTest Blog");
    await page.press('[aria-label="Enter your search term"]', "Enter");
    const title = await page.title()
    console.log('Page title:: ', title)
    expect(title).toBe('LambdaTest Blog - Search')
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({action: 'setTestStatus',arguments: {status: 'passed',remark: 'Test assertion passed'}})}`);
  })

  it('title should contain LambdaTest- Bing Search', async () => {
    await page.type('[aria-label="Enter your search term"]', "LambdaTest");
    await page.press('[aria-label="Enter your search term"]', "Enter");
    const title = await page.title()
    console.log('Page title:: ', title)
    expect(title).toBe('LambdaTest - Search')
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({action: 'setTestStatus',arguments: {status: 'passed',remark: 'Test assertion passed'}})}`);
  })
})