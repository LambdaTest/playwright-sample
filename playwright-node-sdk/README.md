# Run Playwright Tests on TestMu AI (Formerly LambdaTest) with the Playwright Node SDK

The [Playwright Node SDK](https://www.npmjs.com/package/@lambdatest/playwright-node-sdk) runs an existing Playwright
Test suite on the TestMu AI cloud without code changes: no `connect()` calls, no custom fixtures and no
capabilities in project names. Your specs and `playwright.config.js` stay as they are for local runs, and
`lambdatest.yml` decides where they run on the cloud.

### Prerequisites

- Node.js and npm (latest stable)
- A TestMu AI (Formerly LambdaTest) account with your username and access key

### Setup

Clone the repo and install the dependencies of this sample. `playwright` and `@playwright/test` must be the same version.

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

This runs `npx playwright-node-sdk playwright test`, which takes the same arguments as `npx playwright test`, for
example `npm test -- tests/todo.spec.js --workers=4`.

Each test runs once on every platform in `lambdatest.yml` (here Chrome on Windows 11 and Edge on macOS Sonoma). The
SDK marks each session passed or failed and names it after the test; tests that run in the same worker on the same
platform share one session. View results on your TestMu AI dashboard under the `build` name from `lambdatest.yml`.

### Configure platforms and capabilities

Add or change entries under `platforms`:

```yaml
platforms:
  - platform: "Windows 11"
    browserName: "chrome"       # chrome, MicrosoftEdge, pw-chromium, pw-firefox, pw-webkit
    browserVersion: "latest"
  - platform: "macOS Sonoma"
    browserName: "pw-webkit"
    browserVersion: "latest"
```

Top-level keys such as `video`, `console`, `network`, `geoLocation`, `timezone` and `resolution` apply to every
platform; `ltOptions` under a platform overrides them for that platform only. Run `npx playwright-node-sdk init` to
generate a full template, and see the [SDK README](https://www.npmjs.com/package/@lambdatest/playwright-node-sdk) for
tunnel settings, real devices and `preserveProjects` (keeping your own setup projects and `storageState`).

To keep several configurations, point the SDK at another file:

```bash
LAMBDATEST_YML_FILE=lambdatest.ci.yml npm test
```
