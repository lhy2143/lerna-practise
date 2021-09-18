module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    // 使用aribnb-base的eslint规则,优先级比rules中低
    // https://github.com/prettier/eslint-config-prettier
    // 将prettier加在最后-Turns off all rules that are unnecessary or might conflict with Prettier.
    extends: ['airbnb-base', 'prettier'],
    // extends: ['eslint:recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint'],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.ts', '.js', '.tsx', '.jsx', 'json']
            }
        },
        'import/extensions': ['.ts', '.js', '.tsx', '.jsx', 'json'],
        'import/newline-after-import': 'off'
    },
    rules: {
        quotes: ['off', 'any', { avoidEscape: true }],
        'no-unused-vars': [
            'off',
            { vars: 'all', args: 'after-used', ignoreRestSiblings: true }
        ],
        'linebreak-style': ['off', 'windows'],
        // 0 = off, 1 = warn, 2 = error
        'import/prefer-default-export': 'off',
        'import/extensions': [
            'off',
            'ignorePackages',
            {
                ts: 'never',
                js: 'never',
                mjs: 'never',
                jsx: 'never'
            }
        ],
        'import/no-unresolved': [
            'off',
            { commonjs: true, caseSensitive: true }
        ],
        // 最后一行的逗号
        'comma-dangle': ['error', 'never'],
        'max-len': [
            'error',
            100,
            2,
            {
                ignoreUrls: true,
                ignoreComments: true,
                ignoreRegExpLiterals: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true
            }
        ],
        'class-methods-use-this': ['off'],
        'no-tabs': 'off',
        'no-use-before-define': [
            'off',
            { functions: true, classes: true, variables: true }
        ],
        'no-useless-return': 'off',
        'no-empty': 'off',
        'max-classes-per-file': ['off', 5],
        'no-console': 'off',
        'no-shadow': 'off',
        'no-new': 'warn',
        'no-empty-function': 'off',
        'no-underscore-dangle': 'off'
    }
};
