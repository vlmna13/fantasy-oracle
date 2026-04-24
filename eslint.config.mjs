// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import unicorn from 'eslint-plugin-unicorn'
import prettierConfig from 'eslint-config-prettier'

export default withNuxt(
  {
    plugins: {
      unicorn,
    },
    rules: {
      ...unicorn.configs.recommended.rules,
      'unicorn/consistent-function-scoping': 'off',
      ...prettierConfig.rules,
    },
  }
)
