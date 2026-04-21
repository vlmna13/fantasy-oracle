// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import unicorn from 'eslint-plugin-unicorn'

export default withNuxt(
  {
    plugins: {
      unicorn,
    },
    rules: {
      ...unicorn.configs.recommended.rules,
    },
  }
)
