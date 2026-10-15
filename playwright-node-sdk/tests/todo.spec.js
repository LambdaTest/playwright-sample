const { test, expect } = require('@playwright/test')

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/')
})

test('add todo items', async ({ page }) => {
  const newTodo = page.getByPlaceholder('What needs to be done?')
  await newTodo.fill('Run Playwright on LambdaTest')
  await newTodo.press('Enter')
  await newTodo.fill('Check the session video')
  await newTodo.press('Enter')

  await expect(page.getByTestId('todo-title')).toHaveText(['Run Playwright on LambdaTest', 'Check the session video'])
})

test('complete a todo item', async ({ page }) => {
  const newTodo = page.getByPlaceholder('What needs to be done?')
  await newTodo.fill('Try the Playwright Node SDK')
  await newTodo.press('Enter')

  await page.getByTestId('todo-item').getByRole('checkbox').check()
  await expect(page.getByTestId('todo-item')).toHaveClass(/completed/)
  await expect(page.getByTestId('todo-count')).toHaveText('0 items left')
})
