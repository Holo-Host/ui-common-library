const kIndent = 2

const kBaseRules = {
  // error-prevention
  'array-callback-return': [
    'error',
    {
      checkForEach: true
    }
  ],
  camelcase: 'off',
  'consistent-return': 'error',
  'no-array-constructor': 'error',
  'no-await-in-loop': 'error',
  'no-eval': 'error',
  'no-param-reassign': [
    'error',
    {
      props: false
    }
  ],
  'no-unused-vars': [
    'error',
    {
      varsIgnorePattern: 'exhaustiveCheck'
    }
  ],
  'require-await': 'error',

  // style-consistency / readability
  'comma-spacing': [
    'error',
    {
      before: false,
      after: true
    }
  ],
  'import/order': [
    'error',
    {
      alphabetize: {
        order: 'asc',
        caseInsensitive: true
      },
      'newlines-between': 'never'
    }
  ],
  'import/first': 'error',
  indent: ['error', kIndent],
  'max-depth': [
    'error',
    {
      max: 5
    }
  ],
  'no-duplicate-imports': 'error',
  'no-floating-decimal': 'error',
  'no-lone-blocks': 'error',
  'no-magic-numbers': [
    'error',
    {
      ignore: [-1, 0, 1]
    }
  ],
  'no-mixed-operators': 'error',
  'no-multi-assign': 'error',
  'no-multi-spaces': 'error',
  'space-before-function-paren': ['error', 'never'],
  'no-nested-ternary': 'error',
  'no-sequences': 'error',
  'no-unneeded-ternary': 'error',
  'no-use-before-define': 'error',
  'no-var': 'error',
  'prefer-const': 'error',
  'prefer-template': 'error',
  quotes: [
    'error',
    'single',
    {
      avoidEscape: true
    }
  ],
  // good-practice
  'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  'vue/html-indent': [
    'error',
    kIndent
  ]
}

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'standard',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  globals: {
    jest: 'readonly',
    expect: 'readonly',
    it: 'readonly',
    describe: 'readonly',
    before: 'readonly',
    after: 'readonly',
    beforeEach: 'readonly',
    defineProps: true,
    defineEmits: true,
    defineExpose: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: kBaseRules
}
