module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'standard',
    'plugin:prettier/recommended'
  ],
  plugins: [
    'prettier',
  ],
  rules: {
    'no-new': 'off',
    'prettier/prettier': ['error', {
      'singleQuote': true,
      'semi': false,
      'printWidth': 120
    }]
  }
}
