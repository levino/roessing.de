//@ts-check

import process from 'node:process'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import sitemapExt from '@inox-tools/sitemap-ext'
import shipyard from '@levino/shipyard-base'
import shipyardDocs from '@levino/shipyard-docs'
import { defineConfig } from 'astro/config'

function getSiteUrl() {
  // Cloudflare Worker Build-Variable (WORKERS_CI_BRANCH) hat Vorrang
  const branch =
    process.env.WORKERS_CI_BRANCH ||
    process.env.GITHUB_HEAD_REF ||
    process.env.GITHUB_REF_NAME

  if (!branch) {
    // Lokale Entwicklung (keine CI-Umgebung erkannt)
    return 'http://localhost:4321'
  }

  if (branch === 'main') {
    return 'https://www.xn--rssing-wxa.de/'
  }

  // Preview: Branch-Name für deterministische Worker-URL sanitizen
  const sanitized = branch.replace(/\//g, '-').toLowerCase()
  return `https://${sanitized}-roessing-de.post-505.workers.dev`
}

// https://astro.build/config
export default defineConfig({
  site: getSiteUrl(),
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
