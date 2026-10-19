import { expect, type Locator, type Page } from '@playwright/test'
import type { Address } from '../test-data/accounts'

const SHOP = 'https://ecommerce-playground.lambdatest.io/index.php?route='

export class ProductPage {
  readonly cartNotice: Locator

  constructor(readonly page: Page) {
    this.cartNotice = page.locator('#notification-box-top')
  }

  async goto(productId: number) {
    await this.page.goto(`${SHOP}product/product&product_id=${productId}`)
  }

  async addToCart() {
    await this.page.getByRole('button', { name: 'Add to Cart', exact: true }).click()
  }
}

export class CheckoutPage {
  readonly heading: Locator

  constructor(readonly page: Page) {
    this.heading = page.getByRole('heading', { level: 1 })
  }

  async goto() {
    await this.page.goto(`${SHOP}checkout/checkout`)
  }

  async fillPaymentAddress(address: Address) {
    await this.page.fill('#input-payment-firstname', address.firstName)
    await this.page.fill('#input-payment-lastname', address.lastName)
    await this.page.fill('#input-payment-address-1', address.street)
    await this.page.fill('#input-payment-city', address.city)
    await this.page.fill('#input-payment-postcode', address.postcode)
    await this.page.selectOption('#input-payment-country', { label: address.country })
    // The region list loads after the country is picked; selectOption waits for the option to appear.
    await this.page.selectOption('#input-payment-zone', { label: address.region })
  }

  async acceptTermsAndContinue() {
    // On phones the layout shifts under the pointer, so send the click to the checkbox label directly.
    await this.page.locator('label[for="input-agree"]').dispatchEvent('click')
    // The shop saves the address in the background and ignores Continue until that is done, so retry.
    await expect(async () => {
      await this.page.locator('#button-save').click()
      await expect(this.page).toHaveURL(/checkout\/confirm/, { timeout: 5_000 })
    }).toPass({ timeout: 30_000 })
  }

  async confirmOrder() {
    await this.page.locator('#button-confirm').click()
  }
}
