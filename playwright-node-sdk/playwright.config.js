const { defineConfig } = require('@playwright/test')

// A plain local config: the SDK adds one LambdaTest project per platform in lambdatest.yml.
module.exports = defineConfig({
  testDir: 'tests',
  timeout: 120000,
  workers: 2,
  reporter: 'list'
})
