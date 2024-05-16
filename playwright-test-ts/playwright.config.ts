import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

// Playwright config to run tests on LambdaTest platform and local
const config: PlaywrightTestConfig = {
  testDir: "tests",
  timeout: 300000,
  use: {},
  projects: [
    // -- LambdaTest Config --
    // name in the format: browserName:browserVersion:platform@lambdatest
    // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    // Use additional configuration options provided by Playwright if required: https://playwright.dev/docs/api/class-testconfig
    {
      name: "chrome:latest:MacOS Ventura@lambdatest",
      use: {
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "chrome:latest:Windows 11@lambdatest",
      use: {
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: "MicrosoftEdge:latest:MacOS Ventura@lambdatest",
      use: {
        ...devices["iPhone 12 Pro Max"],
      },
    },
    {
      name: "pw-firefox:latest:Windows 11@lambdatest",
      use: {
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: "pw-webkit:latest:Windows 10@lambdatest",
      use: {
        viewport: { width: 1920, height: 1080 },
      },
    },
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
  ],
};

export default config;
