const express = require('express')
const router = express.Router()
const welcomeRest = require('../api/welcome/welcomeRest')
const authRest = require('../api/auth/authRest')
const healthcheckRest = require('../api/healthcheck/healthcheckRest')
const protectedRoutesRest = require('../api/auth/protectedRoutesRest')
const i18nUtils = require('../utils/i18n')
const loggerUtils = require('../utils/logger')
const config = require('../config')

/* non auth routes */
router.use('/auth', authRest)
router.use('/welcome', welcomeRest)
router.use('/healthcheck', healthcheckRest)

/* static route for website */
router.use('/static', express.static(config.server.static))
router.use('/protected', protectedRoutesRest)

router.use((req, res, next) => {
  return res
    .status(404)
    .send({ message: i18nUtils.translate('route_not_found %s', req.url) })
})

router.use((err, req, res, next) => {
  if (err) {
    loggerUtils.error(err)
    return res
      .status(500)
      .send({ message: i18nUtils.translate('system_error') })
  }
})

module.exports = router
