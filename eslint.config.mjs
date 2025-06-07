import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Files to ignore
const ignorePatterns = [
  '.next/**',
  'node_modules/**',
  'public/**',
  '**/*.min.js',
  '**/dist/**',
  '**/build/**',
  'memory-bank/**',
  '**/*.css',
  '**/*.md',
];

const eslintConfig = [
  {
    ignores: ignorePatterns,
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.plugins('json', 'markdown', 'css'),
  {
    rules: {
      // Formatting rules
      indent: ['error', 2, { SwitchCase: 1 }],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'arrow-parens': ['error', 'as-needed'],
      'max-len': ['error', { code: 100, ignoreUrls: true, ignoreStrings: true }],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],

      // Best practices
      'arrow-body-style': ['error', 'as-needed'],
      'prefer-arrow-callback': 'error',
      'no-unused-vars': 'off', // Turn off base rule
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'import/order': [
        'error',
        {
          'groups': [
            'builtin', // Módulos internos de Node.js
            'external', // Paquetes externos
            'internal', // Otras importaciones internas (puedes agregar más grupos si es necesario)
          ],
          'alphabetize': {
            'order': 'asc',
            'caseInsensitive': true,
          },
          'newlines-between': 'always',
        },
      ],
    },
  },
  // JSON files configuration
  {
    files: ['**/*.json'],
    rules: {},
  },
  // Markdown files configuration
  {
    files: ['**/*.md'],
    processor: 'markdown/markdown',
  },
  // CSS files configuration
  {
    files: ['**/*.css'],
    rules: {},
  },
];

export default eslintConfig;
