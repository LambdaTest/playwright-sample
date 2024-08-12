const { devices } = require('@playwright/test')

// Playwright config to run tests on LambdaTest platform and local
const config = {
  testDir: 'tests',
  testMatch: '**/*.spec.js',
  timeout: 120000,
  workers: 5,
  use: {
  },
  projects: [
    // -- LambdaTest Config --
    // name in the format: browserName:browserVersion:platform@lambdatest
    // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    // Use additional configuration options provided by Playwright if required: https://playwright.dev/docs/api/class-testconfig
    {
      name: 'chrome:latest:MacOs Monterey@lambdatest',
      use: {
        viewport: { width: 1280, height: 720 }
      }
    },
    {
      name: 'chrome:latest:MacOs Ventura@lambdatest',
      use: {
        viewport: { width: 1280, height: 720 }
      }
    }
  ]
}

module.exports = config
