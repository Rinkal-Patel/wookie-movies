module.exports = {
  extends: ['airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
    'react-hooks',
    'class-prefer-methods',
    'simple-import-sort',
  ],
  overrides: [
    {
      files: [
        '**/*.test.ts',
        '**/*.test.tsx',
        '__tests__/**',
        'e2e/**',
        '**/*.driver.tsx',
      ],
      rules: { 'import/no-extraneous-dependencies': 'off' },
      env: { jest: true },
    },
    {
      files: ['src/data/**/*.ts'],
      rules: { 'no-param-reassign': 'off' },
    },
  ],
  globals: {
    window: true,
    React: true,
    const: true,
    fetch: true,
    fetchMock: true,
    jasmine: true,
    document: true,
  },
  rules: {
    'jsx-a11y/label-has-associated-control': [2, {}],
    'prettier/prettier': ['error'],
    'react/forbid-prop-types': ['error'],
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.tsx'] }],
    'react/static-property-placement': ['error', 'static public field'],
    'react/jsx-no-bind': ['error', {}],
    'class-prefer-methods/prefer-methods': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          [
            '^react', // Ensure that import from 'react' is at the top
            '^next',
            '^(?!(api|components|hooks|screens|services|styles|types|[.]+)(/|$))',
          ],
          // Everything else
          ['^(api|hooks|services|types|utils)(/|$)'],
          // UI modules
          ['^(screens|components|styles)(/|$)'],
          // Relative imports
          ['^[.]'],
        ],
      },
    ],
    'camelcase': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-fragments': ['error', 'syntax'],
    'no-plusplus': ['off'],
    'react/no-danger': ['off'],
    'react/require-default-props': ['off'],
    'import/prefer-default-export': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    'react/react-in-jsx-scope': ['off'], // nextjs provide global react
    'no-unused-vars': ['off'], // works badly with typescript
    'import/extensions': ['off'], // works badly with typescript
    'react/prop-types': ['off'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    // note you must disable the base rule as it can report incorrect errors
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"]
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
      typescript: {},
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    react: {
      version: 'detect',
    },
  },
};