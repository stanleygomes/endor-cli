const express = require('express')
const welcomeRest = express.Router()
const welcomeService = require('./welcomeService')

welcomeRest.get('/', (req, res) => {
  welcomeService.welcome(req, res).then(response => {
    res.json(response)
  }).catch(error => {
    res.send(error)
  })
})

module.exports = welcomeRest
