const jwt = require('jsonwebtoken')
const config = require('../config')

const validateToken = (req) => {
  return new Promise((resolve, reject) => {
    const token = req.headers['x-access-token'] || req.headers.authorization

    if (token === null || token === undefined) {
      const error = {
        status: 401,
        message: 'Access denied. No token provided.'
      }

      reject(error)
    }

    try {
      const decoded = jwt.verify(token, config.privateKey)
      resolve(decoded)
    } catch (ex) {
      const error = {
        status: 400,
        message: 'Invalid token.'
      }

      reject(error)
    }
  })
}

const generateAuthToken = function (user) {
  return new Promise((resolve, reject) => {
    const token = jwt.sign(user, config.privateKey, {
      expiresIn: config.jwt.expiresIn
    })

    if (token === null || token === undefined) {
      const error = 'Error generating token'
      reject(error)
    }

    resolve({
      token,
      expiresIn: config.jwt.expiresIn
    })
  })
}

module.exports = {
  generateAuthToken,
  validateToken
}
