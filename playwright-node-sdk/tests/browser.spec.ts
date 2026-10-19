import { expect, test } from '../fixtures/test'
import { openPlayground } from '../pages/Playground'

test('handle alert, confirm and prompt dialogs', async ({ page }) => {
  await openPlayground(page, 'javascript-alert-box-demo')
  const messages: string[] = []
  page.on('dialog', async (dialog) => {
    messages.push(dialog.message())
    if (dialog.type() === 'prompt') await dialog.accept('Playwright')
    else await dialog.accept()
  })

  const buttons = page.getByRole('button', { name: 'Click Me' })
  await buttons.nth(0).click()
  await buttons.nth(1).click()
  await buttons.nth(2).click()

  await expect(page.locator('#confirm-demo')).toHaveText('You pressed OK!')
  await expect(page.locator('#prompt-demo')).toHaveText("You have entered 'Playwright' !")
  expect(messages).toEqual(['I am an alert box!', 'Press a button!', 'Please enter your name'])
})

test('type into an editor inside an iframe', async ({ page }) => {
  await openPlayground(page, 'iframe-demo')
  const editor = page.frameLocator('#iFrame1').locator('[contenteditable="true"]')

  await editor.fill('Typed by Playwright on TestMu AI')
  await expect(editor).toHaveText('Typed by Playwright on TestMu AI')
})

test('see the same cart in a second tab', async ({ page, productPage }) => {
  await productPage.goto(40)
  await productPage.addToCart()
  await expect(productPage.cartNotice).toContainText('You have added iPhone to your shopping cart!')

  // A new tab in the same context shares cookies, so it sees the same cart.
  const secondTab = await page.context().newPage()
  await secondTab.goto('https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart')
  await expect(secondTab.locator('#content').getByText('iPhone', { exact: true })).toBeVisible()
  await secondTab.close()
})
