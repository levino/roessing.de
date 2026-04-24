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
          `Event "${file}" hat eine externe url und darf deshalb keinen Markdown-Body haben (der Body wäre für Besucher unsichtbar, weil die Event-Kachel direkt auf die externe URL verlinkt). Entweder url entfernen oder Body löschen.`,
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
})
