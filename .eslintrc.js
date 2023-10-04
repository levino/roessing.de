/* eslint-env node */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@next/next/recommended',
    'plugin:storybook/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.mdx'],
      extends: ['plugin:mdx/recommended', 'plugin:react/recommended'],
    },
  ],
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
  },
  root: true,
  settings: {
    react: {
      version: 'detect',
    },
  },
}
