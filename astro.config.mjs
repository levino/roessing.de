//@ts-check

import process from 'node:process'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import sitemapExt from '@inox-tools/sitemap-ext'
import shipyard from '@levino/shipyard-base'
import shipyardDocs from '@levino/shipyard-docs'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site:
    process.env.CF_PAGES_BRANCH === 'main'
      ? 'https://www.xn--rssing-wxa.de/'
      : (process.env.CF_PAGES_URL ?? 'http://localhost:4321'),
  integrations: [
    tailwind(),
    mdx(),
    sitemapExt({ includeByDefault: true }),
    react(),
    shipyard({
      navigation: {
        events: {
          label: 'Events',
          href: '/events',
        },
        docs: {
          label: 'Wissen',
          href: '/docs/intro',
        },
        projekte: {
          label: 'Projekte',
          href: '/projekte',
        },
        about: {
          label: 'Mitmachen',
          href: '/about',
        },
      },
      title: 'Rössing',
      tagline: 'Über den Ort Rössing',
      brand: 'Rössing',
      scripts: [
        {
          src: 'https://analytics.levinkeller.de/js/script.js',
          defer: true,
          'data-domain': 'rössing.de',
        },
      ],
    }),
    shipyardDocs(),
  ],
  vite: {
    ssr: {
      noExternal: ['fp-ts', 'usehooks-ts'],
    },
  },
})
