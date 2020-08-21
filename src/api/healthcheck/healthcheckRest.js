const express = require('express')
const healthcheckRest = express.Router()
const httpUtils = require('../../utils/http')
const healthcheckService = require('./healthcheckService')
const i18nUtil = require('../../utils/i18n')

healthcheckRest.get('/httpStatus', (req, res) => {
  healthcheckService.httpStatus(req, res).then(response => {
    httpUtils.json(res, response)
  }).catch(error => {
    console.log(error)
    const errorMessage = i18nUtil.translate('system_error')
    httpUtils.error(res, errorMessage)
  })
})

healthcheckRest.get('/databaseStatus', (req, res) => {
  healthcheckService.databaseStatus(req, res).then(response => {
    httpUtils.json(res, response)
  }).catch(error => {
    console.log(error)
    const errorMessage = i18nUtil.translate('system_error')
    httpUtils.error(res, errorMessage)
  })
})

module.exports = healthcheckRest
