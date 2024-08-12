const { devices } = require('@playwright/test')

// Playwright config to run tests on LambdaTest platform and local
const config = {
  testDir: 'tests',
  testMatch: '**/*.spec.js',
  timeout: 120000,
  workers: 4,
  projects: [
    // -- LambdaTest Config --
    // name in the format: deviceName:platformVersion:platformName@lambdatest
    // Use additional configuration options provided by Playwright if required: https://playwright.dev/docs/api/class-testconfig
    {
      name: '.*:.*:android@lambdatest',
      use: {}
    },
    {
      name: 'Pixel 6:.*:android@lambdatest',
      use: {}
    }
  ]
}

module.exports = config
