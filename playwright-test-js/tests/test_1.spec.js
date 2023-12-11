const { test } = require('../lambdatest-setup')
const { expect } = require('@playwright/test')

test.describe('Browse LambdaTest in different search engines', () => {
 test('test_1', async({page}) => { 
    
    await page.goto('https://www.lambdatest.com/selenium-playground/')
    await page.click("//a[text()='Simple Form Demo']")
    //const url = await expect(page).toHaveURL('https://www.lambdatest.com/selenium-playground/simple-form-demo');
    const URL = page.url()
    if(URL.includes('simple-form-demo')){
        console.log('simple-form-demo')
    }
    else{
        console.log('simple-form-demo is not matched')
    }
    //console.log(url)
    const msg = 'Welcome to Sindhuja Pathuri for Lambda Test'
    await page.locator("//input[@id='user-message']").fill(msg)
    await page.click("//button[text()='Get Checked Value']")
    const msgs = await page.locator("//p[@id='message']").innerText(msg)
    if(msg==msgs){
        console.log(msg)
    }
    else{
        console.log('Message is not matched')
    }
    await page.waitForTimeout(10000)

})
})
