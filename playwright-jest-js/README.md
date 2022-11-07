# Testing Playwright with Jest on LambdaTest

## Pre-requisites

1. Clone the repo, then `cd playwright-jest-js`

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

4. Pass the below command to run the test.

```
npm test
```
