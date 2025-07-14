module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'prettier',
      'airbnb',
      'airbnb-typescript'
    ],
    plugins: ['react', '@typescript-eslint', 'react-hooks', 'jsx-a11y'],
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      },
      project: './tsconfig.json'
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      'import/prefer-default-export': 'off',
      'react/prop-types': 'off',
      'no-console': 'warn'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }