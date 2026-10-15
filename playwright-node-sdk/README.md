# Run Playwright Tests on TestMu AI (Formerly LambdaTest) with the Playwright Node SDK

The [Playwright Node SDK](https://www.npmjs.com/package/@lambdatest/playwright-node-sdk) runs an existing Playwright
Test suite on the TestMu AI cloud without code changes: no `connect()` calls, no cloud-specific fixtures and no
capabilities in project names. The specs, fixtures and `playwright.config.ts` in this folder are plain Playwright, and
`lambdatest.yml` decides where they run.

### What this sample covers

| Spec | What it shows |
| --- | --- |
| `tests/search.spec.ts` | Data-driven tests: one test per row in `test-data/searches.json` |
| `tests/checkout.spec.ts` | Page objects; a worker fixture that registers a shop account once per worker over HTTP; logging in; reusing the signed-in session cookies to add to cart and place an order |
| `tests/files.spec.ts` | Uploading a file from your machine and downloading a file back to it |
| `tests/browser.spec.ts` | Alert, confirm and prompt dialogs; an editor inside an iframe; two tabs sharing one cart |
| `tests/tunnel.spec.ts` | Testing an app that runs only on your machine, through the TestMu AI tunnel |

```
playwright-node-sdk/
├── lambdatest.yml          # credentials, platforms, capabilities, tunnel
├── playwright.config.ts    # plain Playwright config (timeouts, reporters, local web server)
├── fixtures/test.ts        # page-object fixtures and the per-worker account fixture
├── pages/                  # page objects
├── test-data/              # search terms, account and address data, upload file
├── local-app/server.js     # small local app for the tunnel test
└── tests/
```

### Prerequisites

- Node.js 18 or newer, and npm
- A TestMu AI (Formerly LambdaTest) account with your username and access key

### Setup

Clone the repo and install the dependencies of this sample:

```bash
git clone https://github.com/LambdaTest/playwright-sample && cd playwright-sample/playwright-node-sdk
npm install
```

Add your username and access key to `lambdatest.yml`. Don't commit your real access key.

```yaml
user: "YOUR_LAMBDATEST_USERNAME"
accessKey: "YOUR_LAMBDATEST_ACCESS_KEY"
```

### Run tests

```bash
npm test
```

This runs `npx playwright-node-sdk playwright test`, which takes the same arguments as `npx playwright test`. For
example, `npm test -- tests/search.spec.ts` runs one spec.

Every test runs on each platform in `lambdatest.yml`: Chrome on Windows 11, WebKit on macOS Sonoma, and a real Android
device. The SDK marks each session passed or failed and names it after the test. View the results on your TestMu AI
dashboard under the `build` name from `lambdatest.yml`.

To run the same suite on your own machine instead, install the browser once and use `test:local`:

```bash
npx playwright install chromium
npm run test:local
```

### Test an app on your machine (tunnel)

1. Set `tunnel: true` under `tunnelSettings` in `lambdatest.yml`.
2. Run:

```bash
npm run test:tunnel
```

Playwright starts the app in `local-app/` on `http://localhost:4173` (the `webServer` block in `playwright.config.ts`).
The SDK starts the tunnel before the tests and stops it afterwards, so the cloud browsers can open `localhost`.
The tests find the tunnel by `tunnelName`: give each run that happens at the same time its own name.

### Configure platforms and capabilities

Add or change entries under `platforms`:

```yaml
platforms:
  - platform: "Windows 11"
    browserName: "chrome"       # chrome, MicrosoftEdge, pw-chromium, pw-firefox, pw-webkit
    browserVersion: "latest"
  - platformName: "android"     # real Android device
    deviceName: "Galaxy.*"
    platformVersion: ".*"
    isRealMobile: true
    browserName: "chrome"
    playwrightConfigOptions:
      testMatch: ["**/search.spec.ts"]   # run only some specs on this platform
```

- Top-level keys such as `video`, `console`, `network`, `geoLocation`, `timezone` and `resolution` apply to every
  platform. `ltOptions` under a platform overrides them for that platform only.
- Set timeouts in `playwright.config.ts`, not in `lambdatest.yml`.
- `parallelsPerPlatform` × the number of platforms is the number of tests that run at once. Keep it within your plan's
  parallel limit.
- Real Android devices accept Playwright up to 1.61.1 today, so this sample pins 1.61.1 for every platform. If you test
  only desktop browsers, you can move to a newer version; keep `playwright` and `@playwright/test` on the same version.

Run `npx playwright-node-sdk init` to generate a full template, and see the
[SDK README](https://www.npmjs.com/package/@lambdatest/playwright-node-sdk) for all tunnel settings and
`preserveProjects`.

To keep several configurations, point the SDK at another file:

```bash
LAMBDATEST_YML_FILE=lambdatest.ci.yml npm test
```
