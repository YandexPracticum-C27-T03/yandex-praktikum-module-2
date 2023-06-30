module.exports = {
  env: {
    browser: true,
    es2020: true,
    es2021: true,
    node: true,
  },
  plugins: ['import', '@typescript-eslint', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  ignorePatterns: ['node_modules/', 'dist/', 'build/', '*.js'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['./src'],
      },
    },
  },
  rules: {
    'import/no-unresolved': 0,
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react/display-name': 'off',
    semi: 'off',
    '@typescript-eslint/semi': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-extra-semi': 'warn',
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/no-array-index-key': 'off',
    'no-prototype-builtins': 1,
    'no-debugger': 'warn',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'index', 'parent', 'sibling', 'unknown', 'object', 'type'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'react-**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'react-**/**',
            group: 'external',
            position: 'before',
          },
          // {
          //   pattern: '@**',
          //   group: 'external',
          //   position: 'after',
          // },
          // {
          //   pattern: '**',
          //   group: 'internal',
          //   position: 'before',
          // },
          {
            pattern: '@@constants/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@@components/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@@containers/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@@ducks/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@@hooks/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@@pages/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@@types/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@@utils/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        alphabetize: {
          order: 'asc' /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
          caseInsensitive: false /* ignore case. Options: [true, false] */,
        },
        warnOnUnassignedImports: false,
      },
    ],
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    // Отключили eslint для правил регулируемых prettier'ом
    'react/jsx-indent': 0,
    'react/jsx-indent-props': 0,
    'react/jsx-curly-newline': 0,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'react/react-in-jsx-scope': 0,
    curly: ['warn', 'all'],
  },
};
