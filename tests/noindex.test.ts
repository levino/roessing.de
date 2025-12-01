import { expect, test } from '@playwright/test'

// Test: Event mit noindex: true hat das entsprechende Meta-Tag
test('Event mit noindex: true hat noindex Meta-Tag', async ({ page }) => {
  // Adventskalender-Event hat noindex: true
  await page.goto('http://127.0.0.1:4321/events/2025-12-01-adventskalender-tuer-1')

  const robotsMeta = await page.locator('meta[name="robots"]').getAttribute('content')
  expect(robotsMeta).toBe('noindex, nofollow')
})

// Test: Event ohne noindex hat kein noindex Meta-Tag
test('Event ohne noindex hat kein noindex Meta-Tag', async ({ page }) => {
  // Dorfschnack-Event hat kein noindex
  await page.goto('http://127.0.0.1:4321/events/2026-02-04-dorfschnack')

  const robotsMeta = await page.locator('meta[name="robots"]')
  expect(await robotsMeta.count()).toBe(0)
})

// Test: Sitemap enthält keine noindex-Events
test('Sitemap enthält keine noindex-Events', async ({ page }) => {
  await page.goto('http://127.0.0.1:4321/sitemap-0.xml')

  const content = await page.content()

  // Adventskalender-Events mit noindex sollten nicht in der Sitemap sein
  expect(content).not.toContain('2025-12-01-adventskalender-tuer-1')
  expect(content).not.toContain('2025-12-02-adventskalender-tuer-2')
  expect(content).not.toContain('2025-12-06-nikolaus-rnah')
})

// Test: Sitemap enthält Events ohne noindex
test('Sitemap enthält Events ohne noindex', async ({ page }) => {
  await page.goto('http://127.0.0.1:4321/sitemap-0.xml')

  const content = await page.content()

  // Dorfschnack-Event ohne noindex sollte in der Sitemap sein
  expect(content).toContain('2026-02-04-dorfschnack')
})
