const crudBasic = require('../crudBasic/crudBasicService')

const httpStatus = () => {
  return new Promise((resolve, reject) => {
    resolve('ok')
  })
}

const databaseStatus = (req, res) => {
  return new Promise((resolve, reject) => {
    crudBasic.get(req, res, 'getDatabaseStatus').then(response => {
      resolve('ok')
    }).catch(error => {
      reject(error)
    })
  })
}

module.exports = {
  httpStatus,
  databaseStatus
}
