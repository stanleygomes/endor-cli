const jwt = require('../utils/jwt')
const express = require('express')
const authMiddleware = express.Router()

authMiddleware.use((req, res, next) => {
  jwt.validateToken(req).then(response => {
    req.user = response
    next()
  }).catch(error => {
    res.status(error.status).send(error.message)
  })
})

module.exports = authMiddleware
