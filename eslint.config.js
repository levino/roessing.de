import globals from 'globals'
import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-config-prettier'
import reactRecommended from 'eslint-plugin-react/configs/recommended.js'

export default [
  js.configs.recommended,
  {
    ignores: ['.yarn', '.next'],
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    ...reactRecommended,
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      ...reactRecommended.languageOptions,
      globals: {
        ...globals.node,
        ...globals.es6,
        ...globals.commonjs,
        ...globals.browser,
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
  },
  prettier,
]
