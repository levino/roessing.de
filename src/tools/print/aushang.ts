import { statSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Die druckfertigen Aushänge zur Rössing-App, wie sie auf /app zum
 * Herunterladen angeboten werden.
 *
 * Die PDFs liegen nicht im Repository. Sie werden bei jedem Build von der
 * Astro-Integration `src/integrations/typst-posters.ts` aus den Typst-Quellen
 * in `print/` nach `public/posters/` übersetzt und sind darüber unter
 * `/posters/<name>.pdf` abrufbar. Dadurch kann ein ausgeliefertes PDF gar
 * nicht erst von seiner Quelle abweichen.
 */

const POSTERS_DIR = join(process.cwd(), 'public/posters')

export interface AushangFormat {
  /** Dateiname ohne Endung, zugleich Name der Typst-Quelle in print/. */
  slug: string
  /** Kurzbezeichnung für den Knopf, z.B. „A4". */
  format: string
  /** Wofür dieses Format gedacht ist. */
  beschreibung: string
  /** Öffentliche Adresse des PDFs. */
  url: string
  /** Dateigröße in lesbarer Form, oder null, wenn das PDF (noch) fehlt. */
  groesse: string | null
}

/** Formatiert eine Byte-Zahl deutsch, z.B. „412 kB" oder „1,2 MB". */
export const lesbareGroesse = (bytes: number): string => {
  if (bytes < 1000) return `${bytes} B`
  if (bytes < 1000 * 1000) return `${Math.round(bytes / 1000)} kB`
  return `${(bytes / 1000 / 1000).toLocaleString('de-DE', {
    maximumFractionDigits: 1,
  })} MB`
}

/**
 * Liest die Größe eines gebauten PDFs.
 *
 * Fehlt die Datei – etwa weil jemand nur die Tests laufen lässt, ohne vorher
 * zu bauen –, wird bewusst kein Fehler geworfen: Der Download-Verweis
 * erscheint dann eben ohne Größenangabe, statt den ganzen Seitenbau zu
 * stoppen.
 */
const groesseVon = (slug: string): string | null => {
  try {
    return lesbareGroesse(statSync(join(POSTERS_DIR, `${slug}.pdf`)).size)
  } catch {
    return null
  }
}

const formate = [
  {
    slug: 'app-aushang-a4',
    format: 'A4',
    beschreibung: 'Zum Aufhängen – Schaukasten, schwarzes Brett, Ladentür.',
  },
] as const

export const aushangFormate: AushangFormat[] = formate.map((f) => ({
  ...f,
  url: `/posters/${f.slug}.pdf`,
  groesse: groesseVon(f.slug),
}))
