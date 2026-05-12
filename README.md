# Playwright Cloud — TestMu AI (Formerly LambdaTest)
![pw](https://user-images.githubusercontent.com/70570645/169813479-9713557e-4430-42ea-91f4-70c6cb72ec0b.PNG)

<img height="400" src="https://user-images.githubusercontent.com/70570645/171361733-065df506-c302-452d-8bc7-e63047377f8e.png">

<p align="center">
  <a href="https://www.testmuai.com/blog/?utm_source=github&utm_medium=repo&utm_campaign=playwright-sample" target="_bank">Blog</a>
  &nbsp; &#8901; &nbsp;
  <a href="https://www.testmuai.com/support/docs/?utm_source=github&utm_medium=repo&utm_campaign=playwright-sample" target="_bank">Docs</a>
  &nbsp; &#8901; &nbsp;
  <a href="https://www.testmuai.com/learning-hub/?utm_source=github&utm_medium=repo&utm_campaign=playwright-sample" target="_bank">Learning Hub</a>
  &nbsp; &#8901; &nbsp;
  <a href="https://www.testmuai.com/newsletter/?utm_source=github&utm_medium=repo&utm_campaign=playwright-sample" target="_bank">Newsletter</a>
  &nbsp; &#8901; &nbsp;
  <a href="https://www.testmuai.com/certifications/?utm_source=github&utm_medium=repo&utm_campaign=playwright-sample" target="_bank">Certifications</a>
  &nbsp; &#8901; &nbsp;
  <a href="https://www.youtube.com/@TestMuAI" target="_bank">YouTube</a>
</p>
&emsp;
&emsp;
&emsp;

*Learn the how to get started with Playwright testing on the TestMu AI platform.*

[<img height="58" width="200" src="https://user-images.githubusercontent.com/70570645/171866795-52c11b49-0728-4229-b073-4b704209ddde.png">](https://accounts.lambdatest.com/register?utm_source=github&utm_medium=repo&utm_campaign=playwright-sample)

## Table of Contents:

* [Pre-requisites](#pre-requisites)
* [Running Your First Playwright Test](#running-your-first-playwright-test)
* [Parallel Testing](#parallel-testing)
* [Real Device iOS Testing](#real-device-ios-testing)
* [Migrate Playwright Tests](https://github.com/LambdaTest/playwright-sample/blob/main/pw-docs/migrate-playwright-tests.md)
* [Test Execution Setup](https://github.com/LambdaTest/playwright-sample/blob/main/pw-docs/test-execution-setup.md)
* [Local Testing](https://github.com/LambdaTest/playwright-sample/blob/main/pw-docs/local-testing.md)
* [Integrate With Playwright Test Runner](https://github.com/LambdaTest/playwright-sample/blob/main/pw-docs/playwright-test-runner.md)
* [Integrate With Cucumber.js](https://github.com/LambdaTest/playwright-sample/blob/main/pw-docs/cucumberjs.md)
* [Playwright Testing With CI/CD](https://github.com/LambdaTest/playwright-sample/blob/main/pw-docs/playwright-with-cicd.md)

## Pre-requisites

1. Clone the TestMu AI-Playwright repository on your system.

2. Install the npm dependencies.

```
npm install
```

3. In order to run your Playwright tests, you will need to set your TestMu AI username and access key in the environment variables. Click the **Access Key** button at the top-right of the Automation Dashboard to access it.

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

## Run Your First Playwright Test

>**Test Scenario**: The sample playwright-single.js file search the term 'TestMu AI' on Bing.

Shown below are the steps on running Playwright tests on the TestMu AI platform. 

1. Clone the TestMu AI-Playwright GitHub repository and switch to the cloned directory.

```js
git clone https://github.com/LambdaTest/playwright-sample.git
cd playwright-sample
```

2. Ensure you have npm dependencies installed. 

3. Configure your TestMu AI authentication credentials.

Once you are done with the above-mentioned steps, you can initiate your first Playwright test on LambdaTest. 

Check out [playwright-single.js](https://github.com/LambdaTest/playwright-sample/blob/main/playwright-single.js) file to view the sample test script.


4. Pass the below command to run the test.

```
node playwright-single.js
```

## View your Playwright test results

The TestMu AI Automation Dashboard is where you can see the results of your Playwright tests after running them on the TestMu AI platform. 

The below screenshot of TestMu AI Automation Dashboard shows the Playwright build on the left and the build sessions associated with the selected build on the right.

<img height="400" src="https://user-images.githubusercontent.com/70570645/169819291-57072893-32a4-48bc-b7a3-6c442911eb31.png"/>

On clicking the session name of the respective test, you can view the details of Playwright test session that you just executed. For example, the below screenshot shows a test execution details of Playwright test like Test Name, Test ID, selected configurations, test logs, basic info, input config, and test session video. 

<img height="400" src="https://user-images.githubusercontent.com/70570645/169819492-9b89a3ec-3db3-44f7-8ced-11eb747b9f2c.png"/>

## Parallel Testing With Playwright


TestMu AI allows you to perform parallel testing with Playwright across 40+ browsers and OS to automate your several test cases simultaneously. You can run one test case across various browsers, or you can run multiple test case scenarios in the same browser with different browser versions.


Shown below are the steps on running parallel tests with Playright on the TestMu AI platform. 

1. Clone the TestMu AI-Playwright GitHub repository and switch to the cloned directory.

```js
git clone https://github.com/LambdaTest/playwright-sample.git
cd playwright-sample
```

2. Ensure you have npm dependencies installed. 

3. Configure your TestMu AI authentication credentials.

Once you are done with the above-mentioned steps, you can run your parallel tests with Playwright on LambdaTest. 

**Test Scenario**: Check out [playwright-parallel.js](https://github.com/LambdaTest/playwright-sample/blob/main/playwright-parallel.js) file to view the sample test script.

4. Pass the below command to run the test.

```
node playwright-parallel.js
```

## Real Device iOS Testing

TestMu AI supports Playwright testing on real iOS devices, allowing you to test your web applications on actual iPhone hardware for authentic mobile testing experiences.

**Test Scenario**: Check out [playwright-ios-real-device.js](https://github.com/LambdaTest/playwright-sample/blob/main/playwright-ios-real-device.js) file to view the sample test script for iOS real device testing.

Run the below command to execute your test on a real iOS device:

```
node playwright-ios-real-device.js
```

**Supported Features:**
- Network Logs, Commands, Meta Data, Basic Info
- Input Config, Media, Tunnel, Geolocation, Video

## Run Playwright Tests In Gitpod

Select the button below to try this demo in [Gitpod](https://www.gitpod.io/)

[<img alt="Run in Gitpod" width="200px" align="center" src="https://user-images.githubusercontent.com/70570645/169987363-1408c494-4e2a-4f12-8828-c931eac716b0.png" />](https://gitpod.io/#https://github.com/LambdaTest/playwright-sample)

* After the Gitpod session launches, navigate to the terminal and run the following commands to save your [TestMu AI Credentials](https://accounts.lambdatest.com/detail/profile) to Gitpod as environment variables:

```
eval $(gp env -e LT_USERNAME=******)
eval $(gp env -e LT_ACCESS_KEY=******)
  ```

* Click the following link if you're unsure how to [access your TestMu AI credentials.](https://www.testmuai.com/support/docs/using-environment-variables-for-authentication-credentials/?utm_source=github&utm_medium=repo&utm_campaign=playwright-sample). Also, if you start a new terminal in Gitpod, you have to run the following command to reset envrionment variables:
```
 eval $(gp env -e)
```
For more information, refer to [Gitpod documentation](https://www.gitpod.io/docs/47_environment_variables/)

## Documentation & Resources :books:

      
Visit the following links to learn more about TestMu AI's features, setup and tutorials around test automation, mobile app testing, responsive testing, and manual testing.

* [TestMu AI Documentation](https://www.testmuai.com/support/docs/?utm_source=github&utm_medium=repo&utm_campaign=playwright-sample)
* [TestMu AI Blog](https://www.testmuai.com/blog/?utm_source=github&utm_medium=repo&utm_campaign=playwright-sample)
* [TestMu AI Learning Hub](https://www.testmuai.com/learning-hub/?utm_source=github&utm_medium=repo&utm_campaign=playwright-sample)    

## TestMu AI Community :busts_in_silhouette:

The [TestMu AI Community](https://community.testmuai.com/?utm_source=github&utm_medium=repo&utm_campaign=playwright-sample) allows people to interact with tech enthusiasts. Connect, ask questions, and learn from tech-savvy people. Discuss best practises in web development, testing, and DevOps with professionals from across the globe 🌎

## What's New At TestMu AI ❓

To stay updated with the latest features and product add-ons, visit [Changelog](https://changelog.lambdatest.com/)

## 🚀 [LambdaTest is Now TestMu AI](https://www.testmuai.com/lambdatest-is-now-testmuai/)

👋 Welcome to TestMu AI, the next evolution of LambdaTest. As of January 2026, LambdaTest has officially rebranded to TestMu AI. We have evolved from a cross-browser testing cloud into a unified, AI-native quality engineering platform designed for the modern DevOps era.

Whether you have been part of the LambdaTest community for years or are just discovering TestMu AI, our mission remains the same: to help you ship faster with high-scale test execution, autonomous testing, and deep quality analytics.

**🔄 Our Rebrand Journey**

We chose the name TestMu AI to reflect our shift towards intelligent, autonomous testing. While our identity has changed, our core technology and commitment to the testing community stay the same.

**✨ Specialties**

- 🤖 AI-Native Test Execution (Formerly LambdaTest)
- ⚡ Autonomous Test Automation
- 🌐 Cross-Browser & Mobile Testing
- 📊 Unified Quality Intelligence

👉 Find [LambdaTest's New Home](https://www.testmuai.com/).