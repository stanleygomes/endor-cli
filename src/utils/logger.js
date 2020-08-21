const winston = require('winston')

const createLogger = (loggerConfig) => {
  return new Promise((resolve, reject) => {
    const logger = winston.createLogger(loggerConfig)

    if (!logger) {
      console.log('error creating logger')
      reject(reject)
    }

    resolve(logger)
  })
}

const error = (message, level) => {
  log(message.toString(), 'error')
}

const info = (message, level) => {
  log(message.toString(), 'info')
}

const log = (message, level) => {
  const date = new Date()
  const today = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
  const errorLoggerConfig = {
    level: level || 'info',
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        level: 'info',
        filename: 'logs/nodevader-' + (level || 'info') + '-' + today + '.log',
        maxsize: 100000,
        maxFiles: 10
      })
    ]
  }

  createLogger(errorLoggerConfig).then((logger) => {
    logger.log({
      level: 'error',
      date: new Date(),
      message: message
    })
  }).catch((error) => {
    console.log(error)
  })
}

module.exports = {
  error,
  info
}
