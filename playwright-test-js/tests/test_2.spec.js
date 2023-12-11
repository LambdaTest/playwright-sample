const { test } = require('../lambdatest-setup')
const { expect } = require('@playwright/test')

test.describe('Browse LambdaTest in different search engines', () => {
  test('test_2', async({page}) => {
    
    
    await page.goto('https://www.lambdatest.com/selenium-playground/')
    await page.click("//a[text()='Drag & Drop Sliders']") 
    
    const slide = await page.locator("//input[@type='range' and @value='15']")
    let temp = 15
    while(temp!=95){
          let expected = await page.locator("//output[@id='rangeSuccess']")
          await slide.press('ArrowRight')
          temp++

   }
    await page.waitForTimeout(5000)

})
})
