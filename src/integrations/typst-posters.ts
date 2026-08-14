import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { basename, join } from 'node:path'
import type { AstroIntegration } from 'astro'
import type { Plugin } from 'vite'
import { ensureFonts } from '../../scripts/ensure-fonts.js'
import { resolveTypst } from '../../scripts/ensure-typst.js'

const POSTER_URL_PREFIX = '/posters'
const PUBLIC_POSTERS_REL = 'public/posters'

/**
 * Verzeichnisse, deren .typ-Dateien zu PDFs übersetzt werden.
 *
 * - `src/content/events` – Plakate zu einzelnen Veranstaltungen
 * - `print`              – dauerhafte Drucksachen (z.B. der App-Aushang)
 *
 * Alle Ergebnisse landen in `public/posters/` und sind darüber unter
 * `/posters/<name>.pdf` abrufbar. Die PDFs werden bewusst NICHT committet
 * (siehe .gitignore): Sie entstehen bei jedem Build neu aus der Quelle und
 * können deshalb gar nicht erst von ihr abweichen.
 *
 * Dateien, deren Name mit „_“ beginnt, sind Bausteine (gemeinsame Texte und
 * Layouts) und werden nicht einzeln übersetzt.
 */
const SOURCE_DIRS = ['src/content/events', 'print']

const slugFromTypFile = (filePath: string): string =>
  basename(filePath).replace(/\.typ$/, '')

const typstViteLoader = (): Plugin => ({
  name: 'typst-posters:vite-loader',
  enforce: 'pre',
  load(id) {
    if (!id.endsWith('.typ')) return null
    const slug = slugFromTypFile(id)
    return `export default ${JSON.stringify(`${POSTER_URL_PREFIX}/${slug}.pdf`)};\n`
  },
})

const isOutdated = (sourcePaths: string[], outputPath: string): boolean => {
  try {
    const out = statSync(outputPath)
    return sourcePaths.some((p) => statSync(p).mtimeMs > out.mtimeMs)
  } catch {
    return true
  }
}

/**
 * Sammelt alle Dateien eines Quellverzeichnisses, von denen ein PDF abhängt.
 *
 * Neben der .typ-Datei selbst sind das die Bausteine (`_*.typ`) und die
 * eingebundenen Grafiken (z.B. der QR-Code). Sonst würde eine Änderung an
 * einem Baustein nicht dazu führen, dass das PDF neu gebaut wird.
 */
const dependenciesOf = (dir: string, files: string[]): string[] =>
  files
    .filter((f) => f.startsWith('_') || f.endsWith('.svg'))
    .map((f) => join(dir, f))

const compilePosters = async (logger: {
  info: (msg: string) => void
  error: (msg: string) => void
}): Promise<void> => {
  const outDir = join(process.cwd(), PUBLIC_POSTERS_REL)
  let typstBin: string | null = null
  let fontPath: string | null = null

  for (const relDir of SOURCE_DIRS) {
    const dir = join(process.cwd(), relDir)
    if (!existsSync(dir)) continue

    const allFiles = readdirSync(dir)
    const typFiles = allFiles.filter(
      (f) => !f.startsWith('_') && f.endsWith('.typ'),
    )
    if (typFiles.length === 0) continue

    mkdirSync(outDir, { recursive: true })
    // Typst und Schriften erst holen, wenn wirklich etwas zu bauen ist.
    typstBin ??= await resolveTypst()
    fontPath ??= await ensureFonts()

    const shared = dependenciesOf(dir, allFiles)

    for (const file of typFiles) {
      const slug = slugFromTypFile(file)
      const inputPath = join(dir, file)
      const outputPath = join(outDir, `${slug}.pdf`)
      if (!isOutdated([inputPath, ...shared], outputPath)) {
        logger.info(`Plakat aktuell: ${slug}.pdf`)
        continue
      }
      const result = spawnSync(
        typstBin,
        ['compile', '--font-path', fontPath, inputPath, outputPath],
        { encoding: 'utf-8' },
      )
      if (result.status !== 0) {
        logger.error(`Typst-Kompilierung von ${file} fehlgeschlagen:`)
        logger.error(result.stderr)
        throw new Error(`Plakat-Kompilierung fehlgeschlagen: ${file}`)
      }
      logger.info(`Plakat kompiliert: ${slug}.pdf`)
    }
  }
}

const typstPosters = (): AstroIntegration => ({
  name: 'typst-posters',
  hooks: {
    'astro:config:setup': async ({ updateConfig, logger }) => {
      updateConfig({
        vite: {
          plugins: [typstViteLoader()],
          assetsInclude: ['**/*.typ'],
        },
      })
      await compilePosters(logger)
    },
  },
})

export default typstPosters
