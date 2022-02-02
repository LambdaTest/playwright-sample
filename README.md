# Playwright-Sample
---

## Prerequisites

1. Download Visual Studio (IDE) for your operating system.
2. **Node.js and Package Manager (npm) :** Install Node.js from
   their [official website](https://nodejs.org/en/download/) Or Install Node.js using command line. Go to the terminal
   or command prompt & run the below command.

`$ install node`

To verify the node version (Node version < 15)

` $ node -v `

If node isn’t of the latest version then you can update it using the below command.

`$ npm install npm@latest -g`

3. Install npm Dependencies

`npm install`

4. **LambdaTest Authentication Credentials:** Make sure you have your LambdaTest credentials with you to run test
   automation scripts with Jest on LambdaTest Selenium Grid. You can obtain these credentials from
   the [LambdaTest Automation Dashboard](https://automation.lambdatest.com/) or
   through [LambdaTest Profile](https://accounts.lambdatest.com/detail/profile).

Set LambdaTest Username and Access Key in environment variables.

* For Linux/macOS:
  `export LT_USERNAME="YOUR_USERNAME"
  export LT_ACCESS_KEY="YOUR ACCESS KEY"`

* For Windows:
  `set LT_USERNAME="YOUR_USERNAME"
  set LT_ACCESS_KEY="YOUR ACCESS KEY"`

> #### Try Demo in Gitpod
>   Select the button below to try this demo in [Gitpod](https://www.gitpod.io/)
>
>  [![Open in Gitpod](open-in-gitpod.png)](https://gitpod.io/#https://github.com/LambdaTest/playwright-sample)
>
>   After the gitpod session launches, navigate to the terminal and run the following commands to save your [LambdaTest Credentials](https://accounts.lambdatest.com/detail/profile) to gitpod as environment variables:
>   ```
>   eval $(gp env -e LT_USERNAME=******)
>   eval $(gp env -e LT_ACCESS_KEY=******)
>   ```
>   Click the following link if you're unsure how to [access your LambdaTest credentials.](https://www.lambdatest.com/support/docs/using-environment-variables-for-authentication-credentials/)
> Also, if you start a new terminal in gitpod, you have to run the following command to reset envrionment variables:
>   ```
>   eval $(gp env -e)
>   ```
>
>   For more information consult the [gitpod documentation](https://www.gitpod.io/docs/47_environment_variables/)

<br />

## Execution

`$ node playwright-single.js `

## About LambdaTest

[LambdaTest](https://www.lambdatest.com/) is a cloud based selenium grid infrastructure that can help you run automated
cross browser compatibility tests on 2000+ different browser and operating system environments. LambdaTest supports all
programming languages and frameworks that are supported with Selenium, and have easy integrations with all popular CI/CD
platforms. It's a perfect solution to bring
your [selenium automation testing](https://www.lambdatest.com/selenium-automation) to cloud based infrastructure that
not only helps you increase your test coverage over multiple desktop and mobile browsers, but also allows you to cut
down your test execution time by running tests on parallel.
