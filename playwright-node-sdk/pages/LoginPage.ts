import type { Page } from '@playwright/test'

export class LoginPage {
  constructor(readonly page: Page) {}

  async goto() {
    await this.page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login')
  }

  async login(email: string, password: string) {
    await this.page.fill('#input-email', email)
    await this.page.fill('#input-password', password)
    // Submit with Enter: on phones the on-screen keyboard shifts the page, so a click can miss the button.
    await this.page.press('#input-password', 'Enter')
  }
}
