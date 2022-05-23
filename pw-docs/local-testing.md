# Local Testing Using Playwright
* * *

LambdaTest tunnel feature lets you test private server URLs, locally hosted web apps, and websites on 3000+ real browsers and operating systems. On LambdaTest, you can test plain HTML, CSS, PHP, Python, and other similar web files saved locally. When connecting to corporate firewalls or proxy settings, no restrictions apply to the new LambdaTest tunnel binary. To establish a secure and unique tunnel connection between your system and LambdaTest cloud servers, the LambdaTest tunnel utilizes various protocols like Web Sockets, HTTPS, SSH(Secure Shell), etc.

Learn how to perform local testing using Playwright across 40+ real browsers and operating systems.

## Playwright Testing Of Locally Hosted Websites
***

You can run Playwright testing of locally hosted websites and web apps via LambdaTest tunnel binary.

1. Clone the LambdaTest-Playwright repository on your system.

2. Install the npm dependencies.

```
npm install
```

3. In order to run your Playwright tests, you will need to set your LambdaTest username and access key in the environment variables.

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

4. To establish a tunnel connection between your local device and LambdaTest, download the binary file based on your OS.

- Windows **[64 Bit](https://downloads.lambdatest.com/tunnel/v3/windows/64bit/LT_Windows.zip) | [32 Bit](https://downloads.lambdatest.com/tunnel/v3/windows/32bit/LT_Windows.zip)**
- macOS **[64 Bit](https://downloads.lambdatest.com/tunnel/v3/mac/64bit/LT_Mac.zip) | [32 Bit](https://downloads.lambdatest.com/tunnel/v3/mac/32bit/LT_Mac.zip)**
- Linux **[64 Bit](https://downloads.lambdatest.com/tunnel/v3/linux/64bit/LT_Linux.zip) | [32 Bit](https://downloads.lambdatest.com/tunnel/v3/linux/32bit/LT_Linux.zip)**

5. Extract the downloaded binary file.

6. Navigate to the directory or folder where you extracted the binary file in the Command Prompt.

7. Run the below command in the terminal.

```js
./LT --user {user's login email} --key {user's access key} --tunnelName {user's tunnel name}
```

8. In desired capability, add the capability `tunnel: true`.

If multiple tunnels are running, you can add `tunnel` and `tunnel ID` capabilities.

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
      'tunnel': false, // Add tunnel configuration if testing locally hosted webpage
      'tunnelName': '' // Optional
    }
  }
 ``` 

You can view test reports for your local tests on the LambdaTest automation dashboard.
