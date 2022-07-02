module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    /**
     * The reactivity system in Vuex is built around mutating
     * properties in function parameters, so we ignore those
     * https://stackoverflow.com/a/44658727
     */
    'no-param-reassign': ['error', {
      ignorePropertyModificationsFor: [
        'state',
      ],
    }],
    /**
     * Our Vue-specific styleguide says that we should use 4 spaces for
     * indentation in Vue-templates. The default value is 2, so we have
     * to override it.
     */
    'vue/html-indent': ['error', 4],
  },
};
