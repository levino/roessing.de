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
    darkTheme: 'sanft-dark',
    themes: [
      {
        // Sanftes, freundliches Light-Theme mit warmen Pastellfarben
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
      {
        // Sanftes Dark-Theme - passend zum Light-Theme
        'sanft-dark': {
          // Hauptfarbe: Warmes Salbeigrün (etwas heller für Dark-Mode)
          primary: '#8fb3aa',
          'primary-content': '#1a2320',

          // Sekundärfarbe: Sanftes Lavendel
          secondary: '#c4b5d4',
          'secondary-content': '#1e1b22',

          // Akzentfarbe: Warmes Pfirsich
          accent: '#e8a090',
          'accent-content': '#2a1f1c',

          // Neutraltöne: Warmes Dunkelgrau
          neutral: '#3d3833',
          'neutral-content': '#e5ded4',

          // Hintergrund: Warmes Dunkel
          'base-100': '#1e1c1a',
          'base-200': '#28251f',
          'base-300': '#332f28',
          'base-content': '#e5ded4',

          // Statusfarben (angepasst für Dark-Mode)
          info: '#6ca3bc',
          'info-content': '#e8f4f9',

          success: '#7ab38a',
          'success-content': '#e8f5eb',

          warning: '#d4ad5a',
          'warning-content': '#faf5e8',

          error: '#c77a7a',
          'error-content': '#fce8e8',

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
