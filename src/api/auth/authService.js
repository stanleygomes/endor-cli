const bcrypt = require('bcrypt')
const jwtUtil = require('../../utils/jwt')
const validatorUtil = require('../../utils/validator')
const User = require('../../model/userModel')

const getSessionData = (req, res) => {
  return new Promise((resolve, reject) => {
    const user = {
      id: 1,
      name: 'Fulano',
      email: 'fulano@gmail.com'
    }

    resolve(user)
  })
}

const login = (req, res) => {
  return new Promise((resolve, reject) => {
    const schema = User.validations.auth
    const validate = validatorUtil.validate(schema, req.body)

    if (validate.error === true) {
      resolve(validate.messages)
    }

    const user = {
      id: 1,
      name: 'Fulano',
      email: 'fulano@gmail.com',
      password: bcrypt.hash('123456', 10)
    }

    delete user.password

    jwtUtil.generateAuthToken(user).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

module.exports = {
  login,
  getSessionData
}
