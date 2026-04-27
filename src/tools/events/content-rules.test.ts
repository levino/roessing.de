import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, test } from 'vitest'

const EVENTS_DIR = join(process.cwd(), 'src/content/events')

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

const eventFiles = readdirSync(EVENTS_DIR).filter(
  (f) => f.endsWith('.md') || f.endsWith('.mdx'),
)

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
})
