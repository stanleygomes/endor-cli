const Joi = require('@hapi/joi')

const User = {
  table: 'user',
  primaryKey: 'id',
  fields: ['name', 'email'],
  hidden: ['password'],
  dates: ['created_at', 'updated_at', 'deleted_at'],
  validations: {
    auth: {
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required()
    }
  }
}

module.exports = User
