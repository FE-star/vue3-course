/* eslint-disable prettier/prettier */
/* eslint-env node */

module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier'
  ],
  rules: {
    // 单引号限制
    quotes: ['error', 'single'],
    // 禁用console
    'no-console': 'error',
    'vue/multi-word-component-names': 'off'
  }
};
