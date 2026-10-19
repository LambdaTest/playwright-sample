import type { Page } from '@playwright/test'

// Opens a TestMu AI Selenium Playground demo. The demos attach their handlers in client-side
// scripts, so wait for the network to go quiet before interacting.
export const openPlayground = async (page: Page, demo: string) => {
  await page.goto(`https://www.testmuai.com/selenium-playground/${demo}/`, { waitUntil: 'networkidle' })
}
