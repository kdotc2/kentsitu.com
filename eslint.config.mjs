import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // This will show an error if console.log is used, but allow console.warn and console.error
      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],
      // Turns off the rule to disallow the usage of explicit "any" type in TypeScript
      // '@typescript-eslint/no-explicit-any': 'off',
      // Turns off the Next.js rule to enforce using next/image instead of the regular img tag
      '@next/next/no-img-element': 'off',
    },
  },
]

export default eslintConfig
