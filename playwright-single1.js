const { chromium } = require('playwright')
const {expect} = require("expect");
const cp = require('child_process');
const playwrightClientVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];

(async () => {
  const capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Playwright Single Build',
      'name': 'Playwright Sample Test',
      'user': 'vanterushashankreddy2121',
      'accessKey': 'IUvFZk3DFlCWONehtRDv6zmOK2exJnkzYnztd5NM0zewo0dPPx',
      'network': true,
      'video': true,
      'console': true,
      'tunnel': false, // Add tunnel configuration if testing locally hosted webpage
      'tunnelName': '', // Optional
      'geoLocation': '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
      'playwrightClientVersion': playwrightClientVersion
    }
  }

  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  })

  const page = await browser.newPage()

  await page.goto('https://www.lambdatest.com/selenium-playground')
        await page.click("//a[text()='Simple Form Demo']")
        //const url = await expect(page).toHaveURL('https://www.lambdatest.com/selenium-playground/simple-form-demo');
        const link = page.url()
        if(link.includes('simple-form-demo')){
            console.log(link)
            }
        else{
            console.log('link doesnot matched')
        }
        const inputmessage='Shashankreddy'
        await page.locator("//input[@id='user-message']").fill(inputmessage)
        await page.click("//button[text()='Get Checked Value']")
        const displayedmessage =  await page.locator("//p[@id='message']").innerText(inputmessage)
        
        if(inputmessage==displayedmessage){
            console.log(displayedmessage)
        }
        else{
            console.log('inplut message is not displayed')
        }
        //await page.waitForTimeout(5000)
        })()
