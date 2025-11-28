import path from 'node:path'
import daisyui from 'daisyui'
import type { Config } from 'tailwindcss'

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
  daisyui: {
    themes: [
      {
        // Sanftes, freundliches Theme mit warmen Pastellfarben
        sanft: {
          // Hauptfarbe: Warmes Salbeigrün
          primary: '#7c9a92',
          'primary-content': '#ffffff',

          // Sekundärfarbe: Sanftes Lavendel
          secondary: '#b8a9c9',
          'secondary-content': '#2d2a33',

          // Akzentfarbe: Warmes Pfirsich
          accent: '#f0b8a8',
          'accent-content': '#3d2c28',

          // Neutraltöne: Warmes Grau
          neutral: '#6b6b6b',
          'neutral-content': '#f5f5f5',

          // Hintergrund: Cremiges Weiß
          'base-100': '#faf8f5',
          'base-200': '#f0ebe4',
          'base-300': '#e5ded4',
          'base-content': '#3d3833',

          // Statusfarben
          info: '#89b4c8',
          'info-content': '#1a2c35',

          success: '#98c4a3',
          'success-content': '#1a2d1f',

          warning: '#e8c47c',
          'warning-content': '#3d3220',

          error: '#d99090',
          'error-content': '#3d1f1f',

          // Abgerundete Ecken für freundliches Erscheinungsbild
          '--rounded-box': '1rem',
          '--rounded-btn': '0.75rem',
          '--rounded-badge': '1rem',

          // Sanfte Animationen
          '--animation-btn': '0.3s',
          '--animation-input': '0.2s',

          // Weicher Button-Fokus
          '--btn-focus-scale': '0.98',
        },
      },
    ],
  },
} satisfies Config
