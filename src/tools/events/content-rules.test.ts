import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { z } from 'astro/zod'
import { load, YAMLException } from 'js-yaml'
import { describe, expect, test, vi } from 'vitest'
import { createEventSchema } from '../../content.config'

/**
 * `src/content.config.ts` importiert das virtuelle Astro-Modul
 * `astro:content`, das es außerhalb eines Astro-Builds nicht gibt. Für den
 * Schema-Test genügen die drei Bausteine, die das Event-Schema benutzt:
 * `z` (das Zod von Astro), `defineCollection` (hier egal) und `reference`
 * (im Build ein Verweis auf eine andere Collection, in der Frontmatter
 * schlicht ein Dateiname).
 */
vi.mock('astro:content', async () => {
  const { z: astroZod } = await import('astro/zod')
  return {
    z: astroZod,
    defineCollection: (collection: unknown) => collection,
    reference: () => astroZod.string(),
  }
})

const EVENTS_PFAD = 'src/content/events'
const ADVENTSKALENDER_PFAD = 'src/content/adventskalender-events'
const EVENTS_DIR = join(process.cwd(), EVENTS_PFAD)

interface ParsedEvent {
  frontmatter: string
  body: string
}

const parseEvent = (filePath: string): ParsedEvent => {
  const raw = readFileSync(filePath, 'utf-8')
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { frontmatter: '', body: raw }
  return { frontmatter: match[1] ?? '', body: (match[2] ?? '').trim() }
}

const hasFrontmatterKey = (frontmatter: string, key: string): boolean =>
  new RegExp(`^${key}:\\s*\\S`, 'm').test(frontmatter)

const istEventDatei = (name: string): boolean =>
  name.endsWith('.md') || name.endsWith('.mdx')

const eventFiles = readdirSync(EVENTS_DIR).filter(istEventDatei)

/**
 * Alle Event-Dateien beider Collections als `[Verzeichnis, Dateiname]`.
 * Die verschlüsselten `.enc`-Dateien des Adventskalenders bleiben außen vor —
 * entschlüsselt (via `npm run setup`) tauchen sie als `.md` hier auf.
 */
const alleEventDateien: [string, string][] = [
  EVENTS_PFAD,
  ADVENTSKALENDER_PFAD,
].flatMap((verzeichnis) =>
  readdirSync(join(process.cwd(), verzeichnis))
    .filter(istEventDatei)
    .map((file): [string, string] => [verzeichnis, file]),
)

/**
 * Das echte Collection-Schema aus `src/content.config.ts`. `image()` liefert
 * im Build geladene Bild-Metadaten; in der Frontmatter steht davor nur ein
 * Pfad, also genügt hier `z.string()`.
 */
const eventSchema = createEventSchema({
  image: () => z.string(),
} as unknown as Parameters<typeof createEventSchema>[0])

describe('Event-Content-Regeln', () => {
  test.each(eventFiles)(
    '%s: url und Markdown-Body schließen sich gegenseitig aus',
    (file) => {
      const { frontmatter, body } = parseEvent(join(EVENTS_DIR, file))
      if (hasFrontmatterKey(frontmatter, 'url')) {
        expect(
          body,
          `Event "${file}" hat eine externe url und darf deshalb keinen Markdown-Body haben. Das url-Feld ist für Events gedacht, deren Primärquelle eine schema.org-taugliche Event-Seite beim externen Veranstalter ist (kein zweiter kanonischer Link hier). Der Body wäre für Besucher unsichtbar, weil die Event-Kachel direkt dorthin verlinkt. Entweder url entfernen (dann sind wir Primärquelle und der externe Link gehört in den Body) oder Body löschen.`,
        ).toBe('')
      }
    },
  )

  test.each(eventFiles)(
    '%s: ohne url muss ein Markdown-Body vorhanden sein',
    (file) => {
      const { frontmatter, body } = parseEvent(join(EVENTS_DIR, file))
      if (!hasFrontmatterKey(frontmatter, 'url')) {
        expect(
          body.length,
          `Event "${file}" hat keinen Markdown-Body. Ohne Body bleibt die Event-Detailseite leer. Mindestens die description als Fließtext ergänzen.`,
        ).toBeGreaterThan(0)
      }
    },
  )

  test('shortlinks sind eindeutig und korrekt formatiert', () => {
    const seen = new Map<string, string>()
    for (const file of eventFiles) {
      const { frontmatter } = parseEvent(join(EVENTS_DIR, file))
      const match = frontmatter.match(/^shortlink:\s*(\S+)\s*$/m)
      if (!match) continue
      const value = match[1] ?? ''
      expect(
        value,
        `Event "${file}" hat einen ungültigen shortlink "${value}". Erwartet werden genau 3 Zeichen aus [a-z0-9].`,
      ).toMatch(/^[a-z0-9]{3}$/)
      const previous = seen.get(value)
      expect(
        previous,
        `Doppelter shortlink "${value}" in "${file}" und "${previous}". Shortlinks müssen eindeutig sein.`,
      ).toBeUndefined()
      seen.set(value, file)
    }
  })

  test.each(alleEventDateien)(
    '%s/%s: Frontmatter ist gültiges YAML und erfüllt das Event-Schema',
    (verzeichnis, file) => {
      const { frontmatter } = parseEvent(join(process.cwd(), verzeichnis, file))

      expect(
        frontmatter.trim().length,
        `Event "${file}" hat keine Frontmatter. Erwartet wird ein Block zwischen zwei "---"-Zeilen am Dateianfang.`,
      ).toBeGreaterThan(0)

      // Erst wirklich parsen: Die übrigen Regeln in dieser Datei arbeiten mit
      // Regexen und übersehen deshalb ungültiges YAML. Das fiel bisher erst
      // im CI-Build auf, wo Astro die Frontmatter tatsächlich liest.
      let daten: unknown
      try {
        daten = load(frontmatter)
      } catch (fehler) {
        const grund =
          fehler instanceof YAMLException ? fehler.message : String(fehler)
        throw new Error(
          `Die Frontmatter von "${file}" ist kein gültiges YAML:\n${grund}\n\n` +
            'Häufigste Ursache: ein Doppelpunkt gefolgt von einem Leerzeichen ' +
            'mitten im Wert (z. B. "Treffen im Dorfgemeinschaftshaus: Wir ' +
            'überlegen …"). YAML liest das als neues Schlüssel-Wert-Paar. ' +
            'Solche Werte gehören in Anführungszeichen: ' +
            'description: "Treffen im Dorfgemeinschaftshaus: Wir überlegen …". ' +
            'Enthält der Wert selbst Anführungszeichen, einfache verwenden ' +
            "(') und darin doppelte.",
        )
      }

      expect(
        daten,
        `Die Frontmatter von "${file}" ergibt kein Objekt (Schlüssel-Wert-Paare).`,
      ).toBeTypeOf('object')

      const ergebnis = eventSchema.safeParse(daten)
      if (!ergebnis.success) {
        const probleme = ergebnis.error.issues
          .map(
            (issue) =>
              `  - ${issue.path.join('.') || '(Wurzel)'}: ${issue.message}`,
          )
          .join('\n')
        throw new Error(
          `Die Frontmatter von "${file}" passt nicht zum Event-Schema aus src/content.config.ts:\n${probleme}`,
        )
      }
    },
  )
})
