const express = require('express')
const protectedRoutesRest = express.Router()
const authMiddleware = require('../../middlewares/authMiddleware')
const httpUtils = require('../../utils/http')
const i18nUtils = require('../../utils/i18n')
const message = i18nUtils.translate('Hello')

protectedRoutesRest.get('/logger', authMiddleware, (req, res) => {
  httpUtils.json(res, message)
})

module.exports = protectedRoutesRest
