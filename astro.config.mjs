import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'

import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.xn--rssing-wxa.de',
  integrations: [tailwind(), mdx(), sitemap()],
  vite: {
    ssr: {
      noExternal: ['fp-ts'],
    },
  },
})
