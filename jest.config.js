module.exports = {
  testEnvironment: 'node',
  verbose: true,
  testMatch: ['**/?(*.)+(spec).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^test/(.*)$': '<rootDir>/test/$1'
  },
  moduleFileExtensions: ['ts', 'js', 'json']
}
