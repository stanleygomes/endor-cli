const i18n = require('i18n')
const config = require('../config')
const i18nConfig = config.i18n

i18n.configure(i18nConfig)
i18n.translate = (text, ...parameters) => i18n.__(text, ...parameters)

module.exports = i18n
