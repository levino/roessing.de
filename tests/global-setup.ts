import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

// Erstellt ein Test-Event mit einem Datum weit in der Zukunft,
// damit der eventStatus-Test immer "EventScheduled" erwartet.
export default function globalSetup() {
  const eventContent = `---
startDate: 2099-12-31T18:00:00+01:00
location: dgh
description: Dieses Event existiert nur für E2E-Tests.
name: Test-Event (Zukunft)
---
`
  const eventPath = join(
    import.meta.dirname,
    '..',
    'src',
    'content',
    'events',
    '2099-12-31-e2e-test-event.md',
  )
  writeFileSync(eventPath, eventContent)
}
