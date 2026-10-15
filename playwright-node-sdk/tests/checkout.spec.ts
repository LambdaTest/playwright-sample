import { expect, test } from '../fixtures/test'
import { newYorkAddress } from '../test-data/accounts'

test('log in with a registered account', async ({ loginPage, account }) => {
  await loginPage.goto()
  await loginPage.login(account.email, account.password)

  await expect(loginPage.page).toHaveURL(/account\/account/)
  await expect(loginPage.page.getByRole('heading', { name: 'My Account' })).toBeVisible()
})

test.describe('signed in', () => {
  // Start already signed in: reuse the session cookies from the account fixture.
  test.beforeEach(async ({ context, account }) => {
    await context.addCookies(account.cookies)
  })

  test('add a product to the cart and place the order', async ({ productPage, checkoutPage }) => {
    await productPage.goto(40)
    await productPage.addToCart()
    await expect(productPage.cartNotice).toContainText('You have added iPhone to your shopping cart!')

    await checkoutPage.goto()
    await checkoutPage.fillPaymentAddress(newYorkAddress)
    await checkoutPage.acceptTermsAndContinue()
    await expect(checkoutPage.heading).toHaveText('Confirm Order')

    await checkoutPage.confirmOrder()
    await expect(checkoutPage.heading).toHaveText('Your order has been placed!')
  })
})
