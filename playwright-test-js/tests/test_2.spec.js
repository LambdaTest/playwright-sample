const { test } = require('../lambdatest-setup')
const { expect } = require('@playwright/test')

test.describe('Browse LambdaTest in different search engines 2', () => {
  test('Scenario2',async({page})=>{
    await page.goto("https://www.lambdatest.com/selenium-playground/")
    await page.click("//a[text()='Drag & Drop Sliders']")
    const slider=await page.locator("//input[@type='range' and @value='15']")
    let temp =15
       while(temp!='95'){
               let expval =await page.locator("//output[@id='rangeSuccess']")
                await slider.press('ArrowRight')
            temp++
             }
             console.log(temp)
        await page.waitForTimeout(5000)
    
    })
    
})
