const { test } = require('../lambdatest-setup')
const { expect } = require('@playwright/test')

test.describe('Browse LambdaTest in different search engines 3', () => {
  test('Scenario3',async({page})=>{
    await page.goto("https://www.lambdatest.com/selenium-playground/input-form-demo")
    const msg='Please fill in the fields.'
     const a= await page.locator("//button[text()='Submit']").click()
    
    await page.locator("//input[@id='name']").fill("Sindhuja")
    await page.locator("//input[@id='inputEmail4']").fill("sindhuja.pathuri4@gmail.com")
    await page.locator("//input[@id='inputPassword4']").fill("Sindhuja@1234")
    
    await page.locator("//input[@id='company']").fill("ABC")
    await page.locator("//input[@name='website']").fill("ABC.com")
    await page.click("//select[@name='country']",'United States')
    await page.locator("//input[@name='city']").fill("NY")
    await page.locator("//input[@name='address_line1']").fill("xyz")
    await page.locator("//input[@name='address_line2']").fill("ghy")
    await page.locator("//input[@placeholder='State']").fill("New York")
    await page.locator("//input[@name='zip']").fill("37700")
    await page.click("//button[text()='Submit']")
    const sucmes='Thanks for contacting us, we will get back to you shortly.'
    const messag=await page.locator("//p[@style='display: block;']").innerText(sucmes)
    
    if(sucmes==messag){
        console.log(sucmes)
    }
    else{
        console.log('not success')
    }
    //await console.log(message)
    await page.waitForTimeout(10000)
    })
    
})
