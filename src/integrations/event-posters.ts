import { spawnSync } from 'node:child_process'
import { mkdirSync, readdirSync, statSync } from 'node:fs'
import { basename, join } from 'node:path'
import type { AstroIntegration } from 'astro'
import type { Plugin } from 'vite'
import { resolveTypst } from '../../scripts/ensure-typst.js'

const POSTER_URL_PREFIX = '/posters'
const EVENTS_REL = 'src/content/events'
const PUBLIC_POSTERS_REL = 'public/posters'

const slugFromTypFile = (filePath: string): string =>
  basename(filePath).replace(/\.typ$/, '')

const typstViteLoader = (): Plugin => ({
  name: 'event-posters:vite-loader',
  enforce: 'pre',
  load(id) {
    if (!id.endsWith('.typ')) return null
    const slug = slugFromTypFile(id)
    return `export default ${JSON.stringify(`${POSTER_URL_PREFIX}/${slug}.pdf`)};\n`
  },
})

const isOutdated = (sourcePath: string, outputPath: string): boolean => {
  try {
    const src = statSync(sourcePath)
    const out = statSync(outputPath)
    return src.mtimeMs > out.mtimeMs
  } catch {
    return true
  }
}

const compilePosters = async (logger: {
  info: (msg: string) => void
  error: (msg: string) => void
}): Promise<void> => {
  const eventsDir = join(process.cwd(), EVENTS_REL)
  const typFiles = readdirSync(eventsDir).filter(
    (f) => !f.startsWith('_') && f.endsWith('.typ'),
  )
  if (typFiles.length === 0) return

  const outDir = join(process.cwd(), PUBLIC_POSTERS_REL)
  mkdirSync(outDir, { recursive: true })

  const typstBin = await resolveTypst()

  for (const file of typFiles) {
    const slug = slugFromTypFile(file)
    const inputPath = join(eventsDir, file)
    const outputPath = join(outDir, `${slug}.pdf`)
    if (!isOutdated(inputPath, outputPath)) {
      logger.info(`Plakat aktuell: ${slug}.pdf`)
      continue
    }
    const result = spawnSync(typstBin, ['compile', inputPath, outputPath], {
      encoding: 'utf-8',
    })
    if (result.status !== 0) {
      logger.error(`Typst-Kompilierung von ${file} fehlgeschlagen:`)
      logger.error(result.stderr)
      throw new Error(`Plakat-Kompilierung fehlgeschlagen: ${file}`)
    }
    logger.info(`Plakat kompiliert: ${slug}.pdf`)
  }
}

const eventPosters = (): AstroIntegration => ({
  name: 'event-posters',
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

export default eventPosters
