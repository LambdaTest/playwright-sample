import { expect, test } from '../fixtures/test'

// Needs `tunnel: true` in lambdatest.yml. Run with `npm run test:tunnel`.
test('open an app running on your machine @tunnel', async ({ page }) => {
  await page.goto('http://localhost:4173/')

  await expect(page.getByRole('heading', { name: 'Served from your machine' })).toBeVisible()
})
