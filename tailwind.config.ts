import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'
import path from 'node:path'

export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    path.join(
      // eslint-disable-next-line no-undef
      path.dirname(require.resolve('@levino/shipyard-base')),
      '../astro/**/*.astro',
    ),
    path.join(
      // eslint-disable-next-line no-undef
      path.dirname(require.resolve('@levino/shipyard-docs')),
      '../astro/**/*.astro',
    ),
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), daisyui],
} satisfies Config
