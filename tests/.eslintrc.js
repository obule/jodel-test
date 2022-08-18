module.exports = {
  plugins: ['jest'],
  env: {
    jest: true,
  },
  extends: ['plugin:jest/recommended', 'plugin:jest/style'],
  rules: {
    'no-console': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'jest/consistent-test-it': ['error', { fn: 'it' }],
    'jest/require-top-level-describe': 'error',
    'jest/valid-title': 'error',
    'jest/expect-expect': [
      'error',
      { assertFunctionNames: ['expect*', '*Test', '*test', '*TestCase'] },
    ],
    'jest/no-export': 'off',
    'jest/no-test-callback': 'off',
    'jest/no-done-callback': 'off', // only off because we sometimes hack it
    'no-underscore-dangle': 'off', // happens because of __typename in GQL tests
    'jest/no-standalone-expect': 'off', // complains about expect in functions
  },
};
