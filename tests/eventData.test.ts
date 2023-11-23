import { test, expect } from '@playwright/test'

test('Google Event Data', async ({ page }) => {
  await page.goto('http://127.0.0.1:4321/events/2023-12-02-weihnachtsmarkt')

  const scriptContent = await page.evaluate(() => {
    const script = document.querySelector('script[type="application/ld+json"]')
    return script ? script.textContent : null
  })

  if (!scriptContent) {
    throw new Error('No script content found')
  }

  const jsonData = JSON.parse(scriptContent)

  // Assertions
  expect(jsonData).toHaveProperty('@context', 'https://schema.org')
  expect(jsonData).toHaveProperty('@type', 'Event')
  expect(typeof jsonData.name).toBe('string')
  expect(jsonData.location.name).toBe('Dorfgemeinschaftshaus Rössing')
  expect(jsonData.organizer.name).toBe('Dorfpflege Rössing e.V.')
  expect(typeof jsonData.image).toBe('string')
})
