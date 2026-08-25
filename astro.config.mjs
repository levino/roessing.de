//@ts-check

import process from 'node:process'
import { fileURLToPath } from 'node:url'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemapExt from '@inox-tools/sitemap-ext'
import shipyard from '@levino/shipyard-base'
import shipyardDocs from '@levino/shipyard-docs'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import eventShortlinks from './src/integrations/event-shortlinks.ts'
import typstPosters from './src/integrations/typst-posters.ts'

const branch = process.env.WORKERS_CI_BRANCH

// localhost nur bei `astro dev`, bei Build immer auf Produktion defaulten
const isDevServer = process.argv.includes('dev')

const site = isDevServer
  ? 'http://localhost:4321'
  : branch && branch !== 'main'
    ? `https://${branch.replace(/\//g, '-').toLowerCase()}-roessing-de.post-505.workers.dev`
    : 'https://xn--rssing-wxa.de/'

// https://astro.build/config
export default defineConfig({
  site,
  redirects: {
    // Alter englischer Pfad des Impressums bleibt erreichbar
    '/imprint': '/impressum',
  },
  integrations: [
    mdx(),
    sitemapExt({ includeByDefault: true }),
    react(),
    shipyard({
      navigation: {
        docs: {
          label: 'Wissen',
          href: '/docs/intro',
        },
        events: {
          label: 'Veranstaltungen',
          href: '/events',
        },
        vereine: {
          label: 'Vereine',
          href: '/vereine',
        },
        app: {
          label: 'App',
          href: '/app',
        },
        about: {
          label: 'Mitmachen',
          href: '/about',
        },
        projekte: {
          label: 'Projekte',
          href: '/projekte',
        },
        'digitales-dorf': {
          label: 'Digitales Dorf',
          href: '/digitales-dorf',
        },
      },
      footer: {
        links: [
          { label: 'Impressum', to: '/impressum' },
          { label: 'Datenschutz', to: '/datenschutz' },
          { label: 'Mitmachen', to: '/about' },
        ],
      },
      title: 'Rössing',
      tagline: 'Über den Ort Rössing',
      brand: 'Rössing',
      css: fileURLToPath(new URL('./src/styles/app.css', import.meta.url)),
      scripts: [
        {
          src: 'https://analytics.levinkeller.de/js/script.js',
          defer: true,
          'data-domain': 'rössing.de',
        },
      ],
    }),
    shipyardDocs(),
    eventShortlinks(),
    typstPosters(),
  ],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['fp-ts'],
    },
  },
})
