const defaultConfig = require('tailwindcss/defaultConfig')
const formsPlugin = require('@tailwindcss/forms')

/** @type {import('tailwindcss/types').Config} */
const config = {
  content: ['index.html', 'src/**/*.tsx'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fill-400': 'repeat(auto-fill, minmax(400px, 1fr))',
      },
    }
  },
  experimental: { optimizeUniversalDefaults: true },
  plugins: [formsPlugin]
}
module.exports = config
