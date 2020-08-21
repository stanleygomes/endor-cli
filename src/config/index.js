const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

const appConfig = {
  i18n: {
    locales: [
      'pt-BR',
      'en'
    ],
    defaultLocale: 'pt-BR',
    directory: path.join(__dirname, '/i18n-locales'),
    autoReload: true
  }
}

module.exports = appConfig
