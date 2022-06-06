module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/base',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    // kopiert von Ana Maria Garlau
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-multiple-empty-lines': [0,{ max: 0 }],
    'object-curly-spacing': [0, 'always'],
    'comma-spacing': [0, 'always'],
    'space-before-blocks': [0, 'always'],
    indent: 'off',
    quotes: 0,
    'keyword-spacing': 0,
    'no-trailing-spaces': 0,
    'padded-blocks': 0,
    'arrow-spacing': 0
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
