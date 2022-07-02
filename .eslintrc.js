module.exports = {
  env: {
    'browser': true,
    'es6': true,
    'node': true
  },
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      },
      rules: {
        'no-unused-vars': 'off',
        'no-undef': 'off',
        '@typescript-eslint/no-unused-vars': 'off'
      }
    }
  ],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript'
  ],
  parserOptions: {
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  rules: {
    'object-curly-spacing': [2, 'always'],
    'no-trailing-spaces': 'error',
    'vue/max-attributes-per-line': ['error', {
      'singleline': {
        'max': 1
      },
      'multiline': {
        'max': 1
      }
    }],
    'vue/no-v-html': 'off',
    'vue/require-prop-types': 'off',
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'comma-dangle': ['error', 'never'],
    'indent': [
      'error',
      2,
      { 'SwitchCase': 1 }
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ]
  }
}
