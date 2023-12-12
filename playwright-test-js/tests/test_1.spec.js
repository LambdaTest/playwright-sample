const { test } = require('../lambdatest-setup')
const { expect } = require('@playwright/test')

test.describe('Browse LambdaTest in different search engines 2', () => {
test('Scenario1',async({page})=>{
await page.goto('https://www.lambdatest.com/selenium-playground')
await page.click("//a[text()='Simple Form Demo']")
const urllink=page.url()
if(urllink.includes('simple-form-demo')){
console.log('URL contains simple form demo')
}
else{
    console.log('URL doesnot have simple form demo')
}
const message='Welcome to Sindhuja for LambdaTest'

await page.locator("//input[@id='user-message']").fill(message)
await page.click("//button[text()='Get Checked Value']")
const display=await page.locator("//p[@id='message']").innerText(message)
if(display==message){
    console.log(message)
}
else{
    console.log('message is not matched')
}
await page.waitForTimeout(5000)
})
})
