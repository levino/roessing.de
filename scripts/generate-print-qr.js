#!/usr/bin/env node
/**
 * Erzeugt den QR-Code für den Aushang „Rössing-App".
 *
 * Der Code wird lokal aus dem npm-Paket `qrcode` gerendert – bewusst kein
 * Online-Dienst, der die Grafik erzeugt. Das Ergebnis ist eine SVG-Datei
 * neben der Typst-Quelle, die mit ins Repository committet wird.
 *
 * Die Zieladresse steht NICHT hier, sondern in `print/_aushang.typ` als
 * `#let ziel-url = "…"` – dort, wo sie auch auf dem Aushang landet. Dieses
 * Skript liest sie von dort. Damit committeter QR-Code und Aushang-Text nicht
 * auseinanderlaufen können, prüft `src/tools/print/aushang.test.ts`, dass die
 * committete SVG-Datei genau zu dieser Adresse passt.
 *
 * Aufruf:  npm run print-qr
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import QRCode from 'qrcode'

const PRINT_DIR = join(process.cwd(), 'print')
const QUELLE = join(PRINT_DIR, '_aushang.typ')
const ZIEL_SVG = join(PRINT_DIR, 'app-aushang-qr.svg')

const ZIEL_URL_REGEX = /^#let\s+ziel-url\s*=\s*"([^"]+)"\s*$/m

/** Liest die Zieladresse des QR-Codes aus der Typst-Quelle. */
export const leseZielUrl = (quellPfad = QUELLE) => {
  const raw = readFileSync(quellPfad, 'utf-8')
  const match = raw.match(ZIEL_URL_REGEX)
  if (!match) {
    throw new Error(
      `In ${quellPfad} wurde kein "#let ziel-url = ..." gefunden. ` +
        'Ohne Zieladresse lässt sich kein QR-Code erzeugen.',
    )
  }
  return match[1]
}

/**
 * Rendert den QR-Code als SVG.
 *
 * Fehlerkorrektur "H" (höchste Stufe), weil ein Aushang im Dorfladen
 * verknickt, bekritzelt oder überklebt werden kann und der Code trotzdem
 * lesbar bleiben soll.
 *
 * `margin: 4` ist die von ISO/IEC 18004 geforderte Ruhezone von vier Modulen.
 * Der Aushang setzt den Code auf cremefarbenen Grund – ohne ausreichend
 * breiten weißen Rand tun sich Scanner damit schwer. Für den Bildschirm
 * (Event-QR-Codes) reicht weniger, für Papier nicht.
 */
export const rendereQrSvg = (url) =>
  QRCode.toString(url, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 4,
    color: { dark: '#000000', light: '#ffffff' },
  })

/** Erzeugt die SVG-Datei aus der in der Typst-Quelle hinterlegten Adresse. */
export const erzeugeQrDatei = async () => {
  const url = leseZielUrl()
  const svg = await rendereQrSvg(url)
  writeFileSync(ZIEL_SVG, svg, 'utf-8')
  return { url, pfad: ZIEL_SVG }
}

export { QUELLE, ZIEL_SVG }

const isMainModule = () => {
  const entry = process.argv[1]
  if (!entry) return false
  return import.meta.url === `file://${entry}`
}

if (isMainModule()) {
  erzeugeQrDatei()
    .then(({ url, pfad }) => {
      console.log(`[print-qr] QR-Code für ${url} → ${pfad}`)
    })
    .catch((err) => {
      console.error(`[print-qr] Fehler: ${err.message}`)
      process.exit(1)
    })
}
