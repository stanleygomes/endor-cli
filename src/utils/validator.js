const Joi = require('@hapi/joi')
const i18nUtils = require('./i18n')

const getMessage = (message, field) => {
  return i18nUtils.translate(`${message} %s`, field)
}

const validate = (schema, data) => {
  const response = Joi.object(schema)
    .validate(data)

  if (response.error != null) {
    return {
      error: true,
      messages: response.error.details.map(item => getMessage(item.type, item.context.key))
    }
  } else {
    return {
      error: false,
      data: data
    }
  }
}

module.exports = {
  validate
}
