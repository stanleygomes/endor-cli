const config = require('../config')
const nodemailer = require('nodemailer')
const mustacheUtils = require('./mustache')
const loggerUtils = require('./logger')

const validateParameters = (to, subject, template, params) => {
  let errorMessage = null

  if (to == null) {
    errorMessage = 'Invalid mail to'
  }

  if (to != null && to.length > 0 && Array.isArray(to) === true) {
    to = to.join()
  }

  if (subject == null) {
    errorMessage = 'Invalid mail subject'
  }

  if (template == null) {
    errorMessage = 'Invalid mail template'
  }

  const emailData = {
    to,
    subject,
    template,
    params,
    templateContainer: 'container'
  }

  if (errorMessage) {
    return {
      error: true,
      message: errorMessage
    }
  } else {
    return emailData
  }
}

const transpile = (emailData, transporter) => {
  return new Promise((resolve, reject) => {
    mustacheUtils.getTemplateSMTP(emailData.templateContainer, emailData.params).then(template => {
      mustacheUtils.getTemplateSMTP(emailData.template, emailData.params).then(templateChild => {
        const templateContainerRendered = template.rendered.replace('@childTemplate', templateChild.rendered)
        emailData.html = templateContainerRendered
        send(emailData, transporter).then(response => resolve(response))
      }).catch(error => reject(error))
      send(emailData, transporter).then(response => resolve(response))
    }).catch(error => reject(error))
  })
}

const send = (emailData, transporter) => {
  return new Promise((resolve, reject) => {
    emailData = Object.assign(emailData, config.smtp.send)

    transporter.sendMail(emailData).then((info) => {
      const response = {
        response: info,
        messageUrl: nodemailer.getTestMessageUrl(info)
      }
      resolve(response)
    }).catch(error => reject(error))
  })
}

const sendMail = (to, subject, template, params) => {
  return new Promise((resolve, reject) => {
    const emailData = validateParameters(to, subject, template, params)

    if (emailData && emailData.error) {
      const errorMessage = new Error(emailData.error)
      reject(errorMessage)
    }

    const transporter = nodemailer.createTransport(config.smtp)

    transpile(emailData, transporter).then((resolved) => {
      const response = {
        emailData: emailData,
        response: resolved
      }

      resolve(response)
    }).catch((error) => {
      loggerUtils.error(error.stack)
      reject(error)
    })
  })
}

module.exports = {
  sendMail
}
