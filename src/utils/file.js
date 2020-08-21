const Multer = require('multer')
const fs = require('fs')
const config = require('../config')

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: config.upload.maxSize // 5 * 1024 * 1024 = no larger than 5mb, you can change as needed.
  }
})

const readFile = (path, opts = 'utf8') => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, opts, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

const writeFile = (path, data, opts = 'utf8') => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, opts, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

module.exports = {
  multer,
  readFile,
  writeFile
}
