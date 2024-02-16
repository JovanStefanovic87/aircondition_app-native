module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    '@react-native-community',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', 'react-native', '@typescript-eslint', 'sql'],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2022,
  },
  rules: {
    'sql/format': ['error', { type: 'sql' }],
  },
};
