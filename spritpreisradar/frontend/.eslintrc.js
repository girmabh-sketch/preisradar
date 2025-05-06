module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [
    '.eslintrc.js',
    '**/*.html'
  ],
  rules: {
    // TypeScript spezifische Regeln
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'semi': ['warn', 'always'], // Semikolons erzwingen
    'quotes': ['warn', 'single'], // Single-Quotes erzwingen
    'comma-dangle': ['warn', 'never'], // Keine abschließenden Kommas
    //'@typescript-eslint/space-in-parens': ['warn', 'always'], // Leerzeichen in Klammern
    'max-len': ['warn', { 'code': 120 }], // Maximale Zeilenlänge 120 Zeichen
    'indent': ['warn', 2], // Einrückung von 2 Leerzeichen
    'brace-style': ['warn', '1tbs'], // 'One True Brace Style' für Klammern
    'object-curly-spacing': ['warn', 'always'], // Leerzeichen innerhalb geschweifter Klammern
    /*'import/order': [
      'warn',
      {
        'groups': ['builtin', 'external', 'internal'],
        'newlines-between': 'always'
      }
    ],*/
    'no-mixed-spaces-and-tabs': 'warn', // Keine Mischung aus Tabs und Leerzeichen
    'prefer-template': 'warn', // Templatestrings bevorzugen
    'curly': ['warn', 'all'] // Immer geschweifte Klammern verwenden
  }
};
