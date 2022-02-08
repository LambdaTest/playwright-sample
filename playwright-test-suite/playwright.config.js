const { devices } = require('@playwright/test')

// Playwright config to run tests on LambdaTest platform and local
const config = {
  testDir: 'tests',
  testMatch: '**/*.spec.js',
  timeout: 60000,
  use: {
    viewport: null
  },
  projects: [
    // -- LambdaTest Config --
    // name in the format: browserName:browserVersion:platform@lambdatest
    {
      name: 'chrome:latest:MacOS Catalina@lambdatest',
      use: {
        browserName: 'chromium',
        channel: 'chrome'
      }
    },
    {
      name: 'chrome:latest:Windows 10@lambdatest',
      use: {
        browserName: 'chromium',
        channel: 'chrome'
      }
    },
    {
      name: 'MicrosoftEdge:90:Windows 10@lambdatest',
      use: {
        browserName: 'chromium',
        ...devices['iPhone 12 Pro Max']
      }
    }

    // Config for running tests in local
    // {
    //   name: "chrome",
    //   use: {
    //     browserName: "chromium",
    //     channel: "chrome",
    //   },
    // },
    // {
    //   name: "safari",
    //   use: {
    //     browserName: "webkit",
    //     viewport: { width: 1200, height: 750 },
    //   },
    // },
    // {
    //   name: "firefox",
    //   use: {
    //     browserName: "firefox",
    //     viewport: { width: 800, height: 600 },
    //   },
    // },
    // // Test in mobile viewport.
    // {
    //   name: "chrome@pixel5",
    //   use: {
    //     ...devices['iPhone 12 Pro Max'],
    //   }
    // },
  ]
}

module.exports = config
