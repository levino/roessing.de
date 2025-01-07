import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

import react from '@astrojs/react'
import process from 'node:process'

// https://astro.build/config
export default defineConfig({
  site: process.env.VERCEL_ENV === 'production'
    ? `https://${process.env.VERCEL_URL}`
    : process.env.VERCEL_ENV === 'preview'
    ? `https://${process.env.VERCEL_BRANCH_URL}`
    : 'http://localhost:4321',
  integrations: [tailwind(), mdx(), sitemap(), react()],
  vite: {
    ssr: {
      noExternal: ['fp-ts', 'usehooks-ts'],
    },
  },
})
