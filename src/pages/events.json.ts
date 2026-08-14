import { getImage } from 'astro:assets'
import { getCollection, getEntry } from 'astro:content'
import sitemap from 'sitemap-ext:config'
import type { APIRoute } from 'astro'
import { erstelleFeed, type FeedEingabe } from '@/tools/events/feed'

// Maschinenlesbare Liste, keine Seite für Menschen — sie gehört nicht in die
// Sitemap.
sitemap(false)

/**
 * `/events.json` — die Veranstaltungen aus `src/content/events/` als JSON.
 *
 * Damit niemand dieselben Termine ein zweites Mal pflegen muss: Die Dorf-App
 * (und wer sonst mag) holt sie sich hier ab. Die Datei entsteht beim Build
 * aus genau denselben Inhalten wie die Seite `/events`.
 *
 * Aufbau und Regeln stehen in `src/tools/events/feed.ts` — dort sind sie
 * auch mit Vitest geprüft.
 */
export const GET: APIRoute = async ({ site }) => {
  const origin = site?.origin ?? 'https://xn--rssing-wxa.de'
  const events = await getCollection('events')

  const eingaben: FeedEingabe[] = await Promise.all(
    events.map(async (event) => {
      const location = event.data.location
        ? await getEntry(event.data.location)
        : undefined
      const organizer = event.data.organizer
        ? await getEntry(event.data.organizer)
        : undefined
      // Das Bild wird wie auf der Seite optimiert; die Gegenseite bekommt
      // eine vollständige URL, mit der sie ohne Zusatzwissen etwas anfangen
      // kann.
      const bild = event.data.image
        ? await getImage({ src: event.data.image.src })
        : undefined
      return {
        id: event.id,
        data: {
          name: event.data.name,
          description: event.data.description,
          startDate: event.data.startDate,
          allDay: event.data.allDay,
          noindex: event.data.noindex,
          ...(event.data.endDate ? { endDate: event.data.endDate } : {}),
          ...(event.data.url ? { url: event.data.url } : {}),
        },
        ...(location ? { location: location.data } : {}),
        ...(organizer ? { organizer: organizer.data } : {}),
        ...(bild ? { image: new URL(bild.src, origin).href } : {}),
      }
    }),
  )

  const feed = erstelleFeed(eingaben, { site: origin, jetzt: new Date() })

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      // Die Datei ist statisch und ändert sich nur mit einem neuen Build.
      'cache-control': 'public, max-age=3600',
    },
  })
}
