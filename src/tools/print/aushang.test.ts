import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, test } from 'vitest'
import {
  leseZielUrl,
  rendereQrSvg,
} from '../../../scripts/generate-print-qr.js'
import { kontaktMail, kontaktTelefon } from '../../data/kontakt'

/**
 * Schutz davor, dass Aushang, QR-Code und die Angaben auf der Website
 * auseinanderlaufen.
 *
 * Die PDFs selbst werden nicht geprüft: Sie liegen nicht im Repository,
 * sondern entstehen bei jedem `npm run build` neu aus der Typst-Quelle
 * (src/integrations/typst-posters.ts). Damit ist ein Auseinanderlaufen von
 * Quelle und PDF strukturell ausgeschlossen – der Build schlägt fehl, wenn
 * die Quelle nicht übersetzt. Was dagegen sehr wohl auseinanderlaufen kann,
 * ist der committete QR-Code und die Adresse, die auf dem Aushang steht.
 * Genau das prüft dieser Test.
 */

const PRINT_DIR = join(process.cwd(), 'print')
const QUELLE = join(PRINT_DIR, '_aushang.typ')
const QR_SVG = join(PRINT_DIR, 'app-aushang-qr.svg')

const quelle = readFileSync(QUELLE, 'utf-8')

/**
 * Die Quelle ohne Kommentarzeilen – also nur das, was tatsächlich auf dem
 * Papier landen kann. Kommentare dürfen durchaus erklären, wo der Aushang
 * hängt; auf dem Blatt selbst hat das nichts zu suchen.
 */
const gedruckterInhalt = quelle
  .split('\n')
  .filter((zeile) => !zeile.trimStart().startsWith('//'))
  .join('\n')

/** Liest eine `#let name = "wert"`-Zuweisung aus der Typst-Quelle. */
const typstText = (name: string): string => {
  const match = quelle.match(
    new RegExp(`^#let\\s+${name}\\s*=\\s*"([^"]*)"\\s*$`, 'm'),
  )
  if (!match?.[1]) throw new Error(`"#let ${name}" fehlt in ${QUELLE}`)
  return match[1]
}

describe('Aushang zur Rössing-App', () => {
  test('der committete QR-Code zeigt auf die Adresse aus der Quelle', async () => {
    const erwartet = await rendereQrSvg(leseZielUrl(QUELLE))
    expect(readFileSync(QR_SVG, 'utf-8')).toBe(erwartet)
  })

  test('der QR-Code führt auf die App-Seite dieser Website', () => {
    // Punycode-Form: Umlaut-Domains werden von QR-Scannern uneinheitlich
    // behandelt. Schrägstrich am Ende, weil /app sonst per 307 umgeleitet
    // wird und der Scan einen Zwischenschritt mehr braucht.
    expect(leseZielUrl(QUELLE)).toBe('https://xn--rssing-wxa.de/app/')
  })

  test('die Klartext-Adresse passt zur QR-Adresse', () => {
    // Auf dem Papier steht die lesbare Umlaut-Form; sie muss dieselbe Seite
    // meinen wie der QR-Code.
    expect(typstText('ziel-url-anzeige')).toBe('rössing.de/app')
  })

  test('der Kontaktweg stimmt mit src/data/kontakt.ts überein', () => {
    expect(typstText('kontakt-mail')).toBe(kontaktMail)
    // Auf Papier mit Leerzeichen gesetzt, damit die Nummer abzulesen ist.
    expect(typstText('kontakt-telefon').replace(/\s/g, '')).toBe(kontaktTelefon)
  })

  test('der Aushang vereinnahmt niemanden als Mitveranstalter', () => {
    // Der Aushang hängt im Dorfladen, aber RNah ist nicht Mitveranstalter –
    // der Laden stellt nur die Fläche. Deshalb darf auf dem Blatt weder ein
    // Logo noch eine Nennung auftauchen, die eine Partnerschaft nahelegt.
    expect(gedruckterInhalt).not.toMatch(/RNah|Dorfladen/i)
  })
})
