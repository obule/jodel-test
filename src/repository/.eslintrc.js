const OFF = 'off';

module.exports = {
  rules: {
    // Because of imports from TypeORM
    '@typescript-eslint/explicit-member-accessibility': [OFF],
    'import/no-cycle': OFF,
    '@typescript-eslint/member-ordering': OFF,
  },
};
