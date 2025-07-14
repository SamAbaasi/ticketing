module.exports = {
    '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
    '*.{scss,css}': ['stylelint --fix'],
    '*.{js,ts,tsx,json,md}': ['prettier --write']
  }