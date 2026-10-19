import { test as base, type Cookie } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { SearchPage } from '../pages/SearchPage'
import { CheckoutPage, ProductPage } from '../pages/ShopPages'
import { type Account, newAccount } from '../test-data/accounts'

type Pages = {
  searchPage: SearchPage
  loginPage: LoginPage
  productPage: ProductPage
  checkoutPage: CheckoutPage
}

type WorkerFixtures = {
  // A shop account registered once per worker, with the cookies of its signed-in session.
  account: Account & { cookies: Cookie[] }
}

export const test = base.extend<Pages, WorkerFixtures>({
  account: [
    async ({ playwright }, use, workerInfo) => {
      // Register over HTTP: fast, and it needs no browser.
      const api = await playwright.request.newContext()
      const account = newAccount(workerInfo.workerIndex)
      const response = await api.post('https://ecommerce-playground.lambdatest.io/index.php?route=account/register', {
        form: {
          firstname: account.firstName,
          lastname: account.lastName,
          email: account.email,
          telephone: account.telephone,
          password: account.password,
          confirm: account.password,
          agree: '1',
        },
      })
      if (!response.url().includes('account/success')) throw new Error(`Registering ${account.email} failed`)
      const { cookies } = await api.storageState()
      await api.dispose()
      await use({ ...account, cookies })
    },
    { scope: 'worker' },
  ],

  searchPage: async ({ page }, use) => use(new SearchPage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  productPage: async ({ page }, use) => use(new ProductPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
})

export { expect } from '@playwright/test'
