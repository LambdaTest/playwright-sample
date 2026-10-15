import type { Locator, Page } from '@playwright/test'

export class SearchPage {
  readonly heading: Locator
  readonly productTitles: Locator
  readonly noResults: Locator

  constructor(readonly page: Page) {
    this.heading = page.getByRole('heading', { level: 1 })
    this.productTitles = page.locator('.product-thumb h4 a')
    this.noResults = page.getByText('There is no product that matches the search criteria.')
  }

  async goto() {
    await this.page.goto('https://ecommerce-playground.lambdatest.io/')
  }

  async search(term: string) {
    // The header search box moves between the desktop and mobile layouts; use the visible one.
    const box = this.page.locator('input[name="search"]:visible').first()
    await box.fill(term)
    await box.press('Enter')
  }
}
