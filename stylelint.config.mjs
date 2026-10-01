export default {
  extends: ['stylelint-config-standard-scss'],

  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],

  ignoreFiles: ['dist/**/*', 'coverage/**/*', 'node_modules/**/*'],

  rules: {
    'selector-class-pattern': null,
  },
}
