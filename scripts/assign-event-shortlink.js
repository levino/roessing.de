#!/usr/bin/env node
import { randomInt } from 'node:crypto'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'

const EVENTS_DIR = join(process.cwd(), 'src/content/events')
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789'
const SHORTLINK_REGEX = /^shortlink:\s*([a-z0-9]{3})\s*$/m

// 3-Zeichen-Codes, die wegen NS-/extremistischer/vulgaerer Lesart nicht
// zufaellig vergeben werden sollen. Manuell setzen ist weiterhin moeglich.
const BLOCKED_CODES = new Set([
  'nzs',
  'naz',
  'nzi',
  'nsd',
  'kkk',
  'afd',
  'npd',
  'raf',
  'sex',
  'fck',
  'fuk',
  'fuc',
  'ass',
  'tit',
  'cum',
  'pus',
  'fag',
  'nig',
  'jew',
])

// Zusaetzlich werden Codes blockiert, die "ss" enthalten – im deutschen
// Kontext zu naheliegend an die NS-Schutzstaffel.
const containsBlockedSubstring = (code) => code.includes('ss')

const target = process.argv[2]
if (!target) {
  console.error(
    'Verwendung: node scripts/assign-event-shortlink.js <event-dateiname>',
  )
  process.exit(1)
}

const allFiles = readdirSync(EVENTS_DIR).filter(
  (f) => !f.startsWith('_') && (f.endsWith('.md') || f.endsWith('.mdx')),
)

const targetFile = allFiles.find(
  (f) => f === target || f === `${target}.md` || f === `${target}.mdx`,
)
if (!targetFile) {
  console.error(`Event-Datei "${target}" nicht gefunden in ${EVENTS_DIR}.`)
  process.exit(1)
}

const targetPath = join(EVENTS_DIR, targetFile)
const targetRaw = readFileSync(targetPath, 'utf-8')
const existing = targetRaw.match(SHORTLINK_REGEX)
if (existing) {
  console.log(
    `Event "${targetFile}" hat bereits den shortlink "${existing[1]}". Nichts zu tun.`,
  )
  process.exit(0)
}

const taken = new Set()
for (const file of allFiles) {
  const raw = readFileSync(join(EVENTS_DIR, file), 'utf-8')
  const match = raw.match(SHORTLINK_REGEX)
  if (match) taken.add(match[1])
}

const generate = () => {
  let code = ''
  for (let i = 0; i < 3; i += 1) {
    code += ALPHABET[randomInt(ALPHABET.length)]
  }
  return code
}

const isAcceptable = (code) =>
  !taken.has(code) &&
  !BLOCKED_CODES.has(code) &&
  !containsBlockedSubstring(code)

let code = generate()
let attempts = 0
while (!isAcceptable(code)) {
  code = generate()
  attempts += 1
  if (attempts > 1000) {
    console.error('Konnte keinen freien shortlink finden.')
    process.exit(1)
  }
}

const updated = targetRaw.replace(
  /^(---\r?\n[\s\S]*?)(\r?\n---\r?\n?)/,
  `$1\nshortlink: ${code}$2`,
)

if (updated === targetRaw) {
  console.error(
    `Konnte Frontmatter-Block in "${targetFile}" nicht erkennen. Datei nicht verändert.`,
  )
  process.exit(1)
}

writeFileSync(targetPath, updated, 'utf-8')
const slug = targetFile.replace(/\.(md|mdx)$/, '')
console.log(`Shortlink "${code}" → /events/${slug} (${targetFile})`)
