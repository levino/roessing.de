import { expect, test } from '@playwright/test'

/**
 * `/events.json` ist die Schnittstelle, aus der die Dorf-App ihre Termine
 * holt. Hier wird geprüft, dass sie den Build wirklich verlässt und die
 * Zusagen aus `src/tools/events/feed.ts` auch am fertigen Artefakt gelten.
 */

interface FeedTermin {
  id: string
  name: string
  description: string
  start: string
  end?: string
  allDay: boolean
  url: string
  external: boolean
  location?: { name: string; address?: string; lat?: number; lon?: number }
  organizer?: { name: string }
}

const feedHolen = async (
  request: import('@playwright/test').APIRequestContext,
) => {
  const antwort = await request.get('http://127.0.0.1:4321/events.json')
  expect(antwort.status()).toBe(200)
  return (await antwort.json()) as {
    version: number
    generatedAt: string
    events: FeedTermin[]
  }
}

test('/events.json liefert kommende Veranstaltungen', async ({ request }) => {
  const feed = await feedHolen(request)

  expect(feed.version).toBe(1)
  expect(Number.isNaN(Date.parse(feed.generatedAt))).toBe(false)
  expect(feed.events.length).toBeGreaterThan(0)

  for (const termin of feed.events) {
    expect(termin.id).toBeTruthy()
    expect(termin.name).toBeTruthy()
    expect(termin.description).toBeTruthy()
    expect(termin.url).toMatch(/^https?:\/\//)
    expect(typeof termin.allDay).toBe('boolean')
    expect(typeof termin.external).toBe('boolean')
  }
})

test('Termine sind aufsteigend sortiert und liegen nicht in der Vergangenheit', async ({
  request,
}) => {
  const feed = await feedHolen(request)

  const zeiten = feed.events.map((termin) => Date.parse(termin.start))
  expect(zeiten).toEqual([...zeiten].sort((a, b) => a - b))

  const gestern = Date.now() - 24 * 60 * 60 * 1000
  for (const zeit of zeiten) {
    expect(zeit).toBeGreaterThan(gestern)
  }
})

test('Ganztägige Termine tragen ein Datum, Termine mit Uhrzeit einen Offset', async ({
  request,
}) => {
  const feed = await feedHolen(request)

  const ganztaegig = feed.events.filter((termin) => termin.allDay)
  const mitUhrzeit = feed.events.filter((termin) => !termin.allDay)
  // Beides kommt im Bestand vor — sonst prüft der Test nichts.
  expect(ganztaegig.length).toBeGreaterThan(0)
  expect(mitUhrzeit.length).toBeGreaterThan(0)

  for (const termin of ganztaegig) {
    expect(termin.start).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  }
  for (const termin of mitUhrzeit) {
    expect(termin.start).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/,
    )
  }
})

test('Termine ohne externe Primärquelle verlinken auf die eigene Detailseite', async ({
  request,
  page,
}) => {
  const feed = await feedHolen(request)

  const eigene = feed.events.filter((termin) => !termin.external)
  expect(eigene.length).toBeGreaterThan(0)
  for (const termin of eigene) {
    expect(termin.url).toContain(`/events/${termin.id}`)
  }

  // Stichprobe: Der Link führt wirklich auf eine Seite, die es gibt.
  const erster = eigene[0]
  const antwort = await page.goto(`http://127.0.0.1:4321/events/${erster?.id}`)
  expect(antwort?.status()).toBe(200)
})
