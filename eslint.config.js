//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  ...tanstackConfig,
  {
    rules: {
      'import/no-cycle': 'off',
      'import/order': 'off',
      'sort-imports': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/require-await': 'off',
      'pnpm/json-enforce-catalog': 'off',
    },
  },
  {
    files: [
      'src/routes/**/*.{ts,tsx}',
      'src/server/**/*.{ts,tsx}',
      'src/shared/**/*.{ts,tsx}',
      'src/features/auth/**/*.{ts,tsx}',
    ],
    rules: {
      'no-console': 'warn',
      'no-debugger': 'error',
    },
  },
  {
    files: ['src/features/seed/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unnecessary-condition': 'off',
      'no-shadow': 'off',
    },
  },
  {
    ignores: [
      'dist/**',
      'coverage/**',
      'eslint.config.js',
      'prettier.config.js',
    ],
  },
]
