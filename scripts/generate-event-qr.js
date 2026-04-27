#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import QRCode from 'qrcode'

const SITE_ORIGIN = 'https://xn--rssing-wxa.de'
const EVENTS_DIR = join(process.cwd(), 'src/content/events')
const SHORTLINK_REGEX = /^shortlink:\s*([a-z0-9]{3})\s*$/m

const target = process.argv[2]
if (!target) {
  console.error(
    'Verwendung: node scripts/generate-event-qr.js <event-dateiname>',
  )
  process.exit(1)
}

const targetFile = target.endsWith('.md') ? target : `${target}.md`
const targetPath = join(EVENTS_DIR, targetFile)
const raw = readFileSync(targetPath, 'utf-8')
const match = raw.match(SHORTLINK_REGEX)
if (!match) {
  console.error(
    `Event "${targetFile}" hat keinen shortlink. Erst per "npm run shortlink ${target}" einen vergeben.`,
  )
  process.exit(1)
}

const code = match[1]
const url = `${SITE_ORIGIN}/${code}`
const slug = targetFile.replace(/\.md$/, '')
const outPath = join(EVENTS_DIR, `${slug}-qr.svg`)

const svg = await QRCode.toString(url, {
  type: 'svg',
  errorCorrectionLevel: 'H',
  margin: 1,
  color: { dark: '#000000', light: '#ffffff00' },
})

writeFileSync(outPath, svg, 'utf-8')
console.log(`QR-Code für ${url} → ${outPath}`)
