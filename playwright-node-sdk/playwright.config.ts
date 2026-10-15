import { defineConfig } from '@playwright/test'

// A plain Playwright config: `npm run test:local` uses it as is, and the SDK adds one
// TestMu AI project per platform in lambdatest.yml.
export default defineConfig({
  testDir: './tests',
  timeout: 120_000,
  // Retry once so a network blip between your machine and the cloud doesn't fail the run.
  retries: 1,
  expect: { timeout: 15_000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    actionTimeout: 30_000,
    navigationTimeout: 60_000,
    trace: 'retain-on-failure',
  },
  // Local app for the @tunnel test.
  webServer: {
    command: 'node local-app/server.js',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
  },
})
