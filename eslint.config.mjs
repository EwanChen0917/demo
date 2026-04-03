import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import vueParser from 'vue-eslint-parser';
import vuePlugin from 'eslint-plugin-vue';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'packages/*/src/auto-imports.d.ts',
      'packages/*/src/components.d.ts',
    ],
  },
  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    './.eslintrc-auto-import.json',
  ),
  {
    files: ['**/*.{ts,mts,cts,tsx,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: [
            path.resolve(__dirname, './tsconfig.base.json'),
            path.resolve(__dirname, './packages/*/tsconfig.json'),
          ],
          noWarnOnMultipleProjects: true,
        },
        alias: {
          map: [
            ['@app/main', path.resolve(__dirname, './packages/main/src')],
            ['@app/a', path.resolve(__dirname, './packages/a/src')],
            ['@app/a/router', path.resolve(__dirname, './packages/a/src/router/index.ts')],
            ['@app/b', path.resolve(__dirname, './packages/b/src')],
            ['@app/b/router', path.resolve(__dirname, './packages/b/src/router/index.ts')],
            ['@app/shared', path.resolve(__dirname, './packages/shared/src')],
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        },
      },
    },
    rules: {
      'prettier/prettier': 1,
      'vue/require-default-prop': 0,
      'vue/singleline-html-element-content-newline': 0,
      'vue/max-attributes-per-line': 0,
      'vue/custom-event-name-casing': [2, 'camelCase'],
      'vue/no-v-text': 1,
      'vue/padding-line-between-blocks': 1,
      'vue/require-direct-export': 1,
      'vue/multi-word-component-names': 0,
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/no-unused-vars': 1,
      '@typescript-eslint/no-empty-function': 0,
      '@typescript-eslint/no-explicit-any': 0,
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      'import/extensions': [
        2,
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'import/no-unresolved': [
        'error',
        {
          ignore: ['^virtual:', '^@app\/(a|b)\/router$'],
        },
      ],
      'import/prefer-default-export': 'off',
      'import/newline-after-import': 'off',
      'no-redeclare': 0,
      'no-param-reassign': 0,
      'import/no-extraneous-dependencies': 0,
      'vue/script-setup-uses-vars': 'error',
      'vue/no-mutating-props': 'off',
      '@typescript-eslint/ban-ts-ignore': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-unused-vars': 'warn',
      'space-before-function-paren': 'off',
      'vue/attributes-order': 'off',
      'vue/one-component-per-file': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/attribute-hyphenation': 'off',
      'vue/require-explicit-emits': 'off',
      'vue/no-v-html': 'off',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'never',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
      'vue/no-reserved-component-names': 'off',
    },
  },
  {
    files: ['packages/main/**/*.{ts,vue}'],
    settings: {
      'import/resolver': {
        alias: {
          map: [['@', path.resolve(__dirname, './packages/main/src')]],
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        },
      },
    },
  },
];
