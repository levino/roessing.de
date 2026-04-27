#!/usr/bin/env node
import { spawnSync } from 'node:child_process'
import {
  chmodSync,
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import process from 'node:process'

const TYPST_VERSION = 'v0.13.1'
const BIN_DIR = join(process.cwd(), '.bin')
const BIN_PATH = join(BIN_DIR, 'typst')

const which = (cmd) => {
  const res = spawnSync('which', [cmd], { encoding: 'utf-8' })
  return res.status === 0 ? res.stdout.trim() : null
}

const detectTarget = () => {
  const arch = process.arch
  const platform = process.platform
  if (platform === 'linux' && arch === 'x64') return 'x86_64-unknown-linux-musl'
  if (platform === 'linux' && arch === 'arm64')
    return 'aarch64-unknown-linux-musl'
  if (platform === 'darwin' && arch === 'x64') return 'x86_64-apple-darwin'
  if (platform === 'darwin' && arch === 'arm64') return 'aarch64-apple-darwin'
  if (platform === 'win32' && arch === 'x64') return 'x86_64-pc-windows-msvc'
  throw new Error(`Plattform ${platform}/${arch} wird nicht unterstützt.`)
}

const resolveTypst = async () => {
  const onPath = which('typst')
  if (onPath) return onPath
  if (existsSync(BIN_PATH)) return BIN_PATH

  const target = detectTarget()
  const archiveName = `typst-${target}`
  const ext = target.includes('windows') ? 'zip' : 'tar.xz'
  const url = `https://github.com/typst/typst/releases/download/${TYPST_VERSION}/${archiveName}.${ext}`

  console.log(`[ensure-typst] Lade Typst ${TYPST_VERSION} von ${url}`)
  const tmp = join(tmpdir(), `typst-${Date.now()}`)
  mkdirSync(tmp, { recursive: true })
  const archivePath = join(tmp, `typst.${ext}`)

  const dl = spawnSync('curl', ['-fsSL', '-o', archivePath, url], {
    stdio: 'inherit',
  })
  if (dl.status !== 0) throw new Error('curl fehlgeschlagen.')

  if (ext === 'tar.xz') {
    const tar = spawnSync('tar', ['-xJf', archivePath, '-C', tmp], {
      stdio: 'inherit',
    })
    if (tar.status !== 0) throw new Error('tar fehlgeschlagen.')
  } else {
    const unzip = spawnSync('unzip', ['-q', archivePath, '-d', tmp], {
      stdio: 'inherit',
    })
    if (unzip.status !== 0) throw new Error('unzip fehlgeschlagen.')
  }

  const extractedBin = join(
    tmp,
    archiveName,
    target.includes('windows') ? 'typst.exe' : 'typst',
  )
  mkdirSync(BIN_DIR, { recursive: true })
  renameSync(extractedBin, BIN_PATH)
  chmodSync(BIN_PATH, 0o755)
  rmSync(tmp, { recursive: true, force: true })

  console.log(`[ensure-typst] Typst nach ${BIN_PATH} installiert.`)
  return BIN_PATH
}

const isMainModule = () => {
  const entry = process.argv[1]
  if (!entry) return false
  return import.meta.url === `file://${entry}`
}

if (isMainModule()) {
  resolveTypst()
    .then((path) => {
      const versionCheck = spawnSync(path, ['--version'], { encoding: 'utf-8' })
      console.log(`[ensure-typst] ${versionCheck.stdout.trim()}`)
    })
    .catch((err) => {
      console.error(`[ensure-typst] Fehler: ${err.message}`)
      process.exit(1)
    })
}

export { resolveTypst, BIN_PATH }
