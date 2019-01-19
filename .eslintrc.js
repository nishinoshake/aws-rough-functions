module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    jest: true,
    describe: true,
    expect: true,
    test: true,
    beforeAll: true,
    beforeEach: true,
    afterAll: true,
    afterEach: true
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
      'semi': false
    }]
  }
}
