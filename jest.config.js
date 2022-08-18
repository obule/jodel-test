module.exports = {
  clearMocks: true,
  collectCoverage: false,

  moduleFileExtensions: ['js', 'ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^types/(.*)$': '<rootDir>/@types/$1',
    '^~tests/(.*)$': '<rootDir>/tests/$1',
  },
  // globalSetup: '<rootDir>/tests/setup/setup.ts',
  // globalTeardown: '<rootDir>/tests/setup/teardown.ts', // TODO Relook
  setupFilesAfterEnv: ['dotenv/config', '<rootDir>/tests/setup/beforeEachTestFile.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/tests/**/*.test.ts|'],
  testURL: 'http://localhost/',
};
