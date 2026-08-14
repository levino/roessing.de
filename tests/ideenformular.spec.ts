import { expect, test } from '@playwright/test'

// Vorgabe ist der Preview-Server aus playwright.config.ts; über
// E2E_BASE_URL lässt sich lokal ein anderer Port ansteuern.
const BASE_URL = process.env.E2E_BASE_URL ?? 'http://127.0.0.1:4321'
const EINGANG = 'https://app.xn--rssing-wxa.de/api/v1/ideen'
const DANKE = 'https://xn--rssing-wxa.de/app/danke'

// Externe Ressourcen blockieren, damit die Tests unabhängig vom Netz laufen.
// Der Ideen-Eingang wird pro Test eigens abgefangen.
test.beforeEach(async ({ page }) => {
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (route) => route.abort())
})

/**
 * Fängt den Ideen-Eingang ab und liefert die abgeschickten Formularfelder.
 * So lässt sich prüfen, was der Browser wirklich sendet — auch ohne
 * JavaScript, denn abgefangen wird auf Netzwerkebene.
 */
const eingangAbfangen = async (page: import('@playwright/test').Page) => {
  const gesendet: Record<string, string>[] = []
  await page.route(EINGANG, async (route) => {
    const roh = route.request().postData() ?? ''
    gesendet.push(Object.fromEntries(new URLSearchParams(roh)))
    await route.fulfill({
      status: 200,
      contentType: 'text/html; charset=utf-8',
      body: '<!doctype html><html lang="de"><body><h1>Danke</h1></body></html>',
    })
  })
  return gesendet
}

test('Der Abschnitt „Ideen" trägt ein echtes Formular an den Ideen-Eingang', async ({
  page,
}) => {
  await page.goto(`${BASE_URL}/app`, { waitUntil: 'domcontentloaded' })

  const formular = page.locator('#ideen-formular')
  await expect(formular).toBeVisible()
  // Klassisches HTML-Formular: direkt an das Backend, per POST.
  await expect(formular).toHaveAttribute('method', /post/i)
  await expect(formular).toHaveAttribute('action', EINGANG)

  // Der Wunsch ist Pflicht und mehrzeilig, Name und E-Mail sind freiwillig.
  const wunsch = page.locator('#idee-wunsch')
  await expect(wunsch).toBeVisible()
  expect(await wunsch.evaluate((el) => el.tagName)).toBe('TEXTAREA')
  await expect(wunsch).toHaveAttribute('required', '')
  await expect(page.locator('#idee-name')).toBeVisible()
  await expect(page.locator('#idee-email')).toBeVisible()
  await expect(page.locator('#idee-name')).not.toHaveAttribute('required', '')
  await expect(page.locator('#idee-email')).not.toHaveAttribute('required', '')

  // Nach dem Absenden geht es auf die Dankeseite dieser Website.
  await expect(
    page.locator('#ideen-formular input[name="redirect"]'),
  ).toHaveAttribute('value', DANKE)
})

test('Der Honigtopf ist da und für Menschen unsichtbar', async ({ page }) => {
  await page.goto(`${BASE_URL}/app`, { waitUntil: 'domcontentloaded' })

  const honigtopf = page.locator('#ideen-formular input[name="webseite"]')
  await expect(honigtopf).toHaveCount(1)
  // Für Menschen unsichtbar, für Skripte ein offenes Feld.
  await expect(honigtopf).toBeHidden()
  await expect(honigtopf).toHaveValue('')
  await expect(honigtopf).toHaveAttribute('tabindex', '-1')
  await expect(honigtopf).toHaveAttribute('autocomplete', 'off')
})

test('Der Datenschutzhinweis steht am Formular und verlinkt die Erklärung', async ({
  page,
}) => {
  await page.goto(`${BASE_URL}/app`, { waitUntil: 'domcontentloaded' })

  const hinweis = page.locator('#ideen-datenschutz')
  await expect(hinweis).toBeVisible()
  await expect(hinweis).toContainText(/gespeichert/i)
  await expect(hinweis.locator('a[href="/app/datenschutz"]')).toHaveCount(1)
})

test('Der E-Mail-Weg bleibt als zweiter Weg bestehen', async ({ page }) => {
  await page.goto(`${BASE_URL}/app`, { waitUntil: 'domcontentloaded' })
  const abschnitt = page.locator('#ideen')
  await expect(abschnitt.locator('a[href^="mailto:"]').first()).toHaveCount(1)
})

test('Die Dankeseite erklärt, was passiert ist, und führt zurück', async ({
  page,
}) => {
  await page.goto(`${BASE_URL}/app/danke`, { waitUntil: 'domcontentloaded' })
  await expect(page.locator('h1')).toContainText(/danke/i)
  await expect(page.locator('body')).toContainText(/Idee/i)
  // Zurück zur App-Seite und zur Datenschutzerklärung.
  await expect(
    page.locator('a[href="/app"], a[href="/app#ideen"]').first(),
  ).toHaveCount(1)
})

test('Die Datenschutzerklärung erklärt die Ideen-Sammlung', async ({
  page,
}) => {
  await page.goto(`${BASE_URL}/app/datenschutz`, {
    waitUntil: 'domcontentloaded',
  })
  const text = await page.locator('body').innerText()
  expect(text).toMatch(/Ideen/i)
  // Was, wozu, wie lange, Widerruf — alles muss dastehen.
  expect(text).toMatch(/Wunsch/i)
  expect(text).toMatch(/freiwillig/i)
  expect(text).toMatch(/Widerruf|widerruf/i)
  expect(text).toMatch(/gelöscht|Löschung|Speicherdauer/i)
})

test.describe('ohne JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  test('Das Formular lässt sich ohne JavaScript ausfüllen und abschicken', async ({
    page,
  }) => {
    const gesendet = await eingangAbfangen(page)
    await page.goto(`${BASE_URL}/app`, { waitUntil: 'domcontentloaded' })

    await page
      .locator('#idee-wunsch')
      .fill('Ein Mitfahrbrett für Fahrten nach Hildesheim.')
    await page.locator('#idee-name').fill('Erna Musterfrau')
    await page.locator('#idee-email').fill('erna@example.org')
    await page.locator('#idee-absenden').click()
    await page.waitForURL(EINGANG)

    expect(gesendet).toHaveLength(1)
    const felder = gesendet[0] as Record<string, string>
    expect(felder.wunsch).toBe('Ein Mitfahrbrett für Fahrten nach Hildesheim.')
    expect(felder.name).toBe('Erna Musterfrau')
    expect(felder.email).toBe('erna@example.org')
    expect(felder.redirect).toBe(DANKE)
    // Der Honigtopf geht leer mit — sonst würde die Einreichung verworfen.
    expect(felder.webseite).toBe('')
  })

  test('Die Dankeseite steht auch ohne JavaScript', async ({ page }) => {
    await page.goto(`${BASE_URL}/app/danke`, { waitUntil: 'domcontentloaded' })
    await expect(page.locator('h1')).toContainText(/danke/i)
  })
})

test('Mit JavaScript kommt der Zeitstempel gegen Skripte dazu', async ({
  page,
}) => {
  const gesendet = await eingangAbfangen(page)
  await page.goto(`${BASE_URL}/app`, { waitUntil: 'domcontentloaded' })

  await page
    .locator('#idee-wunsch')
    .fill('Ein Radweg nach Nordstemmen wäre großartig.')
  await page.locator('#idee-absenden').click()
  await page.waitForURL(EINGANG)

  expect(gesendet).toHaveLength(1)
  const gestartet = Number((gesendet[0] as Record<string, string>).gestartet)
  expect(Number.isFinite(gestartet)).toBe(true)
  // Plausibel: der Aufruf liegt kurz vor dem Absenden.
  expect(gestartet).toBeGreaterThan(Date.now() - 5 * 60_000)
  expect(gestartet).toBeLessThanOrEqual(Date.now())
})
