<img height="200" src="https://user-images.githubusercontent.com/70570645/169812365-4141efe0-918e-4bfc-a2d5-bf3da9571d2b.png">

*Playwright is a Node.js library that uses a single API to automate Chromium, Firefox, and WebKit. It is designed to enable powerful, reliable, and efficient [automated browser testing](https://www.lambdatest.com/automated-browser-testing). Playwright can also automate Microsoft Edge since it is built on the open-source Chromium web framework. LambdaTest allows you to run Playwright tests across 40+ real browsers and operating system combinations.* 

*Learn the basics of [getting started with Playwright testing on the LambdaTest platform](https://www.lambdatest.com/support/docs/playwright-testing/).*

# Playwright Cloud ![pw](https://user-images.githubusercontent.com/70570645/169813479-9713557e-4430-42ea-91f4-70c6cb72ec0b.PNG)

***

* [Pre-requisites](#pre-requisites)
* [Running Your First Playwright Test](#running-your-first-playwright-test)
* [Parallel Testing](#parallel-testing)
* [Migrate Playwright Tests](https://github.com/LambdaTest/playwright-sample/blob/master/pw-docs/migrate-playwright-tests.md)
* [Test Execution Setup](https://github.com/LambdaTest/playwright-sample/blob/master/pw-docs/test-execution-setup.md)
* [Local Testing](https://github.com/LambdaTest/playwright-sample/blob/master/pw-docs/local-testing.md)
* [Integrate With Playwright Test Runner](https://github.com/LambdaTest/playwright-sample/blob/master/pw-docs/playwright-test-runner.md)
* [Integrate With Cucumber.js](https://github.com/LambdaTest/playwright-sample/blob/master/pw-docs/cucumberjs.md)
* [Playwright Testing With CI/CD](https://github.com/LambdaTest/playwright-sample/blob/master/pw-docs/playwright-with-cicd.md)
***

# Pre-requisites

1. Clone the [LambdaTest-Playwright repository](https://github.com/LambdaTest/playwright-sample) on your system.

2. Install the npm dependencies.

```
npm install
```

3. In order to run your Playwright tests, you will need to set your LambdaTest username and access key in the environment variables. Click the **Access Key** button at the top-right of the Automation Dashboard to access it.

<img height="300" src="https://user-images.githubusercontent.com/70570645/169819599-127dd293-347d-45b6-9651-e46f2b038583.png"/>

**Windows**

```js
set LT_USERNAME="YOUR_LAMBDATEST_USERNAME"
set LT_ACCESS_KEY="YOUR_LAMBDATEST_ACCESS_KEY"
```

**macOS/Linux**

```js
export LT_USERNAME="YOUR_LAMBDATEST_USERNAME"
export LT_ACCESS_KEY="YOUR_LAMBDATEST_ACCESS_KEY"
```

# Run Your First Playwright Test
* * *

Shown below are the steps on running Playwright tests on the LambdaTest platform. 

1. Clone the [LambdaTest-Playwright GitHub repository](https://github.com/LambdaTest/playwright-sample) and switch to the cloned directory.

```js
git clone https://github.com/LambdaTest/playwright-sample.git
cd playwright-sample-main
```

2. Ensure you have npm dependencies installed. 

3. Configure your LambdaTest authentication credentials.

Once you are done with the above-mentioned steps, you can initiate your first Playwright test on LambdaTest. 

The below test script searches the term 'LambdaTest' on Bing.

```js
const { chromium } = require('playwright')
const { expect } = require('@playwright/test');

(async () => {
  const capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Playwright Sample Build',
      'name': 'Playwright Sample Test',
      'user': process.env.LT_USERNAME,
      'accessKey': process.env.LT_ACCESS_KEY,
      'network': true,
      'video': true,
      'console': true
    }
  }

  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  })

  const page = await browser.newPage()

  await page.goto('https://www.bing.com')

  const element = await page.$('[aria-label="Enter your search term"]')
  await element.click()
  await element.type('LambdaTest')
  await element.press('Enter')
  const title = await page.title()

  try {
    expect(title).toEqual('LambdaTest - Search')
    // Mark the test as completed or failed
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`)
  } catch {
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Title not matched' } })}`)
  }

  await browser.close()
})()

```

4. Pass the below command to run the test.

```
node playwright-single.js
```

# View your Playwright test results
***

The LambdaTest Automation Dashboard is where you can see the results of your Playwright tests after running them on the LambdaTest platform. 

The below screenshot of LambdaTest Automation Dashboard shows the Playwright build on the left and the build sessions associated with the selected build on the right.

<img height="400" src="https://user-images.githubusercontent.com/70570645/169819291-57072893-32a4-48bc-b7a3-6c442911eb31.png"/>

On clicking the session name of the respective test, you can view the details of Playwright test session that you just executed. For example, the below screenshot shows a test execution details of Playwright test like Test Name, Test ID, selected configurations, test logs, basic info, input config, and test session video. 

<img height="400" src="https://user-images.githubusercontent.com/70570645/169819492-9b89a3ec-3db3-44f7-8ced-11eb747b9f2c.png"/>

## Parallel Testing With Playwright
* * *

LambdaTest allows you to perform parallel testing with Playwright across 40+ browsers and OS to automate your several test cases simultaneously. You can run one test case across various browsers, or you can run multiple test case scenarios in the same browser with different browser versions.


Shown below are the steps on running parallel tests with Playright on the LambdaTest platform. 

1. Clone the [LambdaTest-Playwright GitHub repository](https://github.com/LambdaTest/playwright-sample) and switch to the cloned directory.

```js
git clone https://github.com/LambdaTest/playwright-sample.git
cd playwright-sample-main
```

2. Ensure you have npm dependencies installed. 

3. Configure your LambdaTest authentication credentials.

Once you are done with the above-mentioned steps, you can run your parallel tests with Playwright on LambdaTest. 

The below test script searches the term 'LambdaTest' on Bing.

```js
const { chromium } = require('playwright')
const { expect } = require('@playwright/test')

const parallelTests = async (capability) => {
  console.log('Initialising test:: ', capability['LT:Options']['name'])

  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capability))}`
  })

  const page = await browser.newPage()

  await page.goto('https://www.bing.com')

  const element = await page.$('[aria-label="Enter your search term"]')
  await element.click()
  await element.type('LambdaTest')
  await element.press('Enter')
  const title = await page.title()

  try {
    expect(title).toEqual('LambdaTest - Search')
    // Mark the test as completed or failed
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`)
  } catch {
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Title not matched' } })}`)
  }

  await browser.close()
}

// Capabilities array for with the respective configuration for the parallel tests
const capabilities = [
  {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Playwright Sample Build',
      'name': 'Playwright Sample Test on Windows 10 - Chrome',
      'user': process.env.LT_USERNAME,
      'accessKey': process.env.LT_ACCESS_KEY,
      'network': true,
      'video': true,
      'console': true
    }
  },
  {
    'browserName': 'MicrosoftEdge',
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 8',
      'build': 'Playwright Sample Build',
      'name': 'Playwright Sample Test on Windows 8 - MicrosoftEdge',
      'user': process.env.LT_USERNAME,
      'accessKey': process.env.LT_ACCESS_KEY,
      'network': true,
      'video': true,
      'console': true
    }
  },
  {
    'browserName': 'Chrome',
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'MacOS Big sur',
      'build': 'Playwright Sample Build',
      'name': 'Playwright Sample Test on MacOS Big sur - Chrome',
      'user': process.env.LT_USERNAME,
      'accessKey': process.env.LT_ACCESS_KEY,
      'network': true,
      'video': true,
      'console': true
    }
  }]

capabilities.forEach(async (capability) => {
  await parallelTests(capability)
})

```

4. Pass the below command to run the test.

```
node playwright-parallel.js
```

## Gitpod
***

Select the button below to try this demo in [Gitpod](https://www.gitpod.io/)

[<img alt="Run in Gitpod" width="100 px" align="center" src="https://img.shields.io/badge/Gitpod-000000?style=for-the-badge&logo=gitpod&logoColor=#FFAE33" />](https://gitpod.io/#https://github.com/LambdaTest/playwright-sample)

* After the Gitpod session launches, navigate to the terminal and run the following commands to save your [LambdaTest Credentials](https://accounts.lambdatest.com/detail/profile) to Gitpod as environment variables:

```
eval $(gp env -e LT_USERNAME=******)
eval $(gp env -e LT_ACCESS_KEY=******)
  ```

* Click the following link if you're unsure how to [access your LambdaTest credentials.](https://www.lambdatest.com/support/docs/using-environment-variables-for-authentication-credentials/). Also, if you start a new terminal in Gitpod, you have to run the following command to reset envrionment variables:
```
 eval $(gp env -e)
```
For more information consult the [Gitpod documentation](https://www.gitpod.io/docs/47_environment_variables/)

## LambdaTest Community :busts_in_silhouette:
***
The [LambdaTest Community](https://community.lambdatest.com/) allows people to interact with LambdaTest tech enthusiasts. Connect, ask questions, and learn from tech-savvy people. Discuss best practises in web development, testing, and DevOps with professionals from across the globe.

## Documentation & Resources :books:
***
      
If you want to learn more about the LambdaTest's features, setup, and usage, visit the [LambdaTest documentation](https://www.lambdatest.com/support/docs/). You can also find in-depth tutorials around test automation, mobile app testing, responsive testing, manual testing on [LambdaTest Blog](https://www.lambdatest.com/blog/) and [LambdaTest Learning Hub](https://www.lambdatest.com/learning-hub/).     
      
 ## About LambdaTest
***
[LambdaTest](https://www.lambdatest.com) is a leading test execution platform that allows users to run both manual and automated testing of web and mobile apps across 3000+ different browsers, browser versions, and operating systems. You can accelerate your test execution and achieve faster release cycles. Over 500 enterprises and 1M+ users across 132+ countries rely on LambdaTest for their web testing needs.     
    
[<img height="50" src="https://user-images.githubusercontent.com/70570645/169649126-ed61f6de-49b5-4593-80cf-3391ca40d665.PNG">](https://accounts.lambdatest.com/register)
      
## We are here to help you :headphones:
***
* LambdaTest Support: [support@lambdatest.com](mailto:support@lambdatest.com)
* Playwright Testing Page: https://www.lambdatest.com/playwright-testing
* LambdaTest HomePage: https://www.lambdatest.com      



