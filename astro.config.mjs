//@ts-check

import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import shipyard from '@levino/shipyard-base'
import shipyardDocs from '@levino/shipyard-docs'
import react from '@astrojs/react'
import process from 'node:process'

// https://astro.build/config
export default defineConfig({
  site: process.env.VERCEL_ENV === 'production'
    ? `https://${process.env.VERCEL_URL}`
    : process.env.VERCEL_ENV === 'preview'
    ? `https://${process.env.VERCEL_BRANCH_URL}`
    : 'http://localhost:4321',
  integrations: [
    tailwind(),
    mdx(),
    sitemap(),
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
          ['data-domain']: 'rössing.de',
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
