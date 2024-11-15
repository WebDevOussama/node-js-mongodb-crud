import { builtinModules } from 'module';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPlugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.{ts,tsx,js,jsx,mjs}'],
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
  },
  {
    plugins: {
      '@typescript-eslint': eslintPlugin,
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error', // Avoid `any` type
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/comma-spacing': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/return-await': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
    },
  },
  {
    plugins: {
      'simple-import-sort': pluginSimpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Node.js built-in modules
            [`node:`, `^(${builtinModules.join('|')})(/|$)`],
            // External imports (npm packages)
            ['^@?\\w.*$', '^[^.].*$', '^\\..*$', '^\\u0000'],
            // Domain-specific layers (adjust to your app’s architecture)
            ['^@/controllers', '^@/services', '^@/repositories'],
            // Internal utilities and custom imports (helpers, utils)
            ['^@/utils'],
            // Parent imports
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports (same-folder imports and `.` last)
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ],
        },
      ],
    },
  },
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-magic-numbers': 'warn',
      'no-implicit-globals': 'error',
      'no-shadow': 'error', // Prevent variable shadowing (important for clean code)
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    ignores: ['**/node_modules'],
  },
];
