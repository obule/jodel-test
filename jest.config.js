module.exports = {
  clearMocks: true,
  collectCoverage: false,

  moduleFileExtensions: ['js', 'ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^types/(.*)$': '<rootDir>/@types/$1',
    '^~tests/(.*)$': '<rootDir>/tests/$1',
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/tests/**/*.test.ts|'],
  testURL: 'http://localhost/',
};
