import { rmSync } from 'node:fs'
import { join } from 'node:path'

// Räumt das Test-Event nach dem Testlauf wieder auf.
export default function globalTeardown() {
  const eventPath = join(
    import.meta.dirname,
    '..',
    'src',
    'content',
    'events',
    '2099-12-31-e2e-test-event.md',
  )
  rmSync(eventPath, { force: true })
}
