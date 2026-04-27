#!/usr/bin/env node
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'

// Inter ist OFL-lizenziert. Wir laden die Variable-Variante einmalig
// nach .fonts/, damit das Plakat in jeder Build-Umgebung mit derselben
// Schrift kompiliert (und nicht mit dem typst-Default-Fallback).
const INTER_VERSION = 'v4.1'
const INTER_URL = `https://github.com/rsms/inter/raw/${INTER_VERSION}/docs/font-files/InterVariable.ttf`
const FONTS_DIR = join(process.cwd(), '.fonts')
const INTER_PATH = join(FONTS_DIR, 'InterVariable.ttf')

const ensureFonts = async () => {
  if (existsSync(INTER_PATH)) return FONTS_DIR

  console.log(`[ensure-fonts] Lade Inter ${INTER_VERSION} von ${INTER_URL}`)
  mkdirSync(FONTS_DIR, { recursive: true })

  const dl = spawnSync('curl', ['-fsSL', '-o', INTER_PATH, INTER_URL], {
    stdio: 'inherit',
  })
  if (dl.status !== 0) throw new Error('curl fehlgeschlagen.')

  console.log(`[ensure-fonts] Inter nach ${INTER_PATH} installiert.`)
  return FONTS_DIR
}

const isMainModule = () => {
  const entry = process.argv[1]
  if (!entry) return false
  return import.meta.url === `file://${entry}`
}

if (isMainModule()) {
  ensureFonts().catch((err) => {
    console.error(`[ensure-fonts] Fehler: ${err.message}`)
    process.exit(1)
  })
}

export { ensureFonts, FONTS_DIR }
