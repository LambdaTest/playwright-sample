import { expect, test } from '../fixtures/test'
import searches from '../test-data/searches.json'

// Data-driven: one test per row in test-data/searches.json.
for (const { term, expectResults } of searches) {
  test(`search for "${term}"`, async ({ searchPage }) => {
    await searchPage.goto()
    await searchPage.search(term)

    await expect(searchPage.heading).toHaveText(`Search - ${term}`)
    if (expectResults) {
      await expect(searchPage.productTitles.first()).toBeVisible()
      for (const title of await searchPage.productTitles.allInnerTexts()) {
        expect(title.toLowerCase()).toContain(term.toLowerCase())
      }
    } else {
      await expect(searchPage.noResults).toBeVisible()
    }
  })
}
