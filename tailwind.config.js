const defaultConfig = require('tailwindcss/defaultConfig')
const formsPlugin = require('@tailwindcss/forms')
const gridAreasPlugin = require('@savvywombat/tailwindcss-grid-areas')

/** @type {import('tailwindcss/types').Config} */
const config = {
  content: [
    'index.html',
    'src/**/*.tsx',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    extend: {
      gridTemplateAreas: {
        image: [
          'image'
        ]
      },
      gridTemplateColumns: {
        'auto-fill-400': 'repeat(auto-fill, minmax(min(100%, 400px), 1fr))',
      },
      height: {
        '44': '44rem'
      }
    }
  },
  experimental: { optimizeUniversalDefaults: true },
  plugins: [formsPlugin, gridAreasPlugin]
}
module.exports = config
