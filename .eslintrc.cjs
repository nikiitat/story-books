module.exports = {
    'env': {
        'es2021': true,
        'node': true,
    },
    'extends': [
        'google',
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
    },
    'rules': {
        'semi': ['error', 'never'],
        'quotes': ['error', 'single'],
        'indent': ['error', 4],
        'object-curly-spacing': [2, 'always'],
        'max-len': [2, 80, 4, { 'ignoreUrls': true }],
    },
}
