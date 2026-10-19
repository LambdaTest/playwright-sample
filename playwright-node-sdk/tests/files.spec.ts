import fs from 'node:fs'
import path from 'node:path'
import { expect, test } from '../fixtures/test'
import { openPlayground } from '../pages/Playground'

test('upload a file from your machine', async ({ page }) => {
  await openPlayground(page, 'upload-file-demo')
  // The file is read on your machine and sent to the cloud browser.
  await page.locator('#file').setInputFiles(path.join(__dirname, '../test-data/sample.png'))

  await expect(page.locator('#error')).toHaveText('File Successfully Uploaded')
})

test('download a file to your machine', async ({ page }, testInfo) => {
  const text = `Downloaded by Playwright at ${Date.now()}`
  await openPlayground(page, 'generate-file-to-download-demo')
  // Type key by key: the page enables "Generate File" on key presses.
  await page.locator('#textbox').pressSequentially(text)
  await page.getByRole('button', { name: 'Generate File' }).click()

  const downloadPromise = page.waitForEvent('download')
  await page.locator('#link-to-download').click()
  const download = await downloadPromise

  // saveAs copies the file from the cloud browser to your machine.
  const file = testInfo.outputPath(download.suggestedFilename())
  await download.saveAs(file)
  expect(download.suggestedFilename()).toBe('Lambdainfo.txt')
  expect(fs.readFileSync(file, 'utf8')).toBe(text)
})
