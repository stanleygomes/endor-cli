const express = require('express')
const authRest = express.Router()
const authMiddleware = require('../../middlewares/authMiddleware')
const authService = require('./authService')

authRest.get('/user', authMiddleware, (req, res) => {
  authService.getSessionData(req, res).then(response => {
    res.json(response)
  }).catch(error => {
    res.send(error)
  })
})

authRest.post('/login', (req, res) => {
  authService.login(req, res).then(response => {
    res.header('x-auth-token', response.token).send(response)
  }).catch(error => {
    res.send(error)
  })
})

module.exports = authRest
