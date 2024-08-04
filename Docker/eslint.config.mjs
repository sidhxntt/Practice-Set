import { fileURLToPath } from 'url';
import { dirname } from 'path';
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import { ESLint } from 'eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslint = new ESLint({
  // Use flat config system
  baseConfig: {
    plugins: {
      '@typescript-eslint': tseslint,
      'eslint': pluginJs,
    },
    languageOptions: {
      globals: globals.browser,
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
      },
    },
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      indent: ['error', 2],
      '@typescript-eslint/indent': ['error', 2],
      semi: ['error', 'always'],
      '@typescript-eslint/semi': ['error', 'always'],
      quotes: ['error', 'double'],
      '@typescript-eslint/quotes': ['error', 'double'],
    },
    // Directly include recommended rules and configurations
    extends: [
      'eslint:recommended',
      '@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
  },
});

export default eslint;