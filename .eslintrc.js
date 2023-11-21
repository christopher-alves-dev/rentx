// eslint-disable-next-line no-undef
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'prettier',
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-extra-semi': 'off',
      '@typescript-eslint/no-var-requires': 0,
      '@typescript-eslint/no-empty-function': ['off'],
      '@typescript-eslint/no-empty-interface': [
        'warn',
        {
          allowSingleExtends: true,
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react-native/no-inline-styles': 0,
      'space-before-function-paren': 'off',
      'react/prop-types': 'off',
      'multiline-ternary': 'off',
      'quote-props': 'off',
      'no-sequences': 0,
      'no-useless-escape': 'warn',
      camelcase: 'off',
    },
  };
  