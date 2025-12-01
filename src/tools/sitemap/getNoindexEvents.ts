import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Liest alle Event-Dateien und gibt die IDs der Events zurück,
 * die noindex: true im Frontmatter haben.
 */
export function getNoindexEventIds(): string[] {
  const eventsDir = join(process.cwd(), 'src/content/events')
  const files = readdirSync(eventsDir).filter(
    (f) => f.endsWith('.md') || f.endsWith('.mdx'),
  )

  const noindexIds: string[] = []

  for (const file of files) {
    const content = readFileSync(join(eventsDir, file), 'utf-8')
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)

    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1]
      if (/noindex:\s*true/.test(frontmatter)) {
        // ID ist der Dateiname ohne Endung
        const id = file.replace(/\.(md|mdx)$/, '')
        noindexIds.push(id)
      }
    }
  }

  return noindexIds
}
