const path = require('path')
const Mustache = require('mustache')
const config = require('../config')
const fileUtils = require('./file')
const loggerUtils = require('./logger')
const showCompiledTemplateDefault = config.template.showCompiled

const openFile = (templateConfig, name) => {
  return new Promise((resolve, reject) => {
    const filePath = path.resolve(templateConfig.dir, name + templateConfig.ext)
    fileUtils.readFile(filePath).then(response => {
      const fileContent = response.toString()
      resolve(fileContent)
    }).catch(error => reject(error))
  })
}

const getAllIndexes = (arr, val) => {
  let indexes = []
  indexes = []
  let i = -1

  while ((i = arr.indexOf(val, i + 1)) !== -1) {
    indexes.push(i)
  }

  return indexes
}

const getTemplate = (name, params = {}, templateConfig) => {
  return new Promise((resolve, reject) => {
    openFile(templateConfig, name).then(file => {
      let rendered = null
      const arrayParam = []

      try {
        rendered = Mustache.render(file, params)
      } catch (error) {
        reject(error)
      }

      Object.keys(params).forEach(el => {
        const queryParam = `:${el}`
        const indexes = getAllIndexes(rendered, queryParam)
        if (indexes.length) {
          indexes.forEach(() => {
            const atributo = params[el]
            if (atributo.constructor.name === 'Array') {
              const attrArray = atributo.reduce((acc, cur) => {
                acc.push(`$${arrayParam.length + 1}`)
                arrayParam.push(cur)
                return acc
              }, [])

              rendered = rendered.replace(queryParam, attrArray.join(', '))
              return
            }

            rendered = rendered.replace(queryParam, atributo).toString()
            arrayParam.push(atributo)
          })
        }
      })

      if (showCompiledTemplateDefault === true) {
        console.log('Query: ', rendered)
        console.log('Params: ', params)
        console.log('Array params: ', arrayParam)
      }

      const response = {
        rendered,
        arrayParam
      }

      resolve(response)
    }).catch(error => {
      loggerUtils.error(error.stack)
      reject(error)
    })
  })
}

const getTemplateSMTP = (name, params) => {
  return new Promise((resolve, reject) => {
    const templateConfig = config.template.smtp

    getTemplate(name, params, templateConfig)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}

const getTemplateSQL = (name, params) => {
  return new Promise((resolve, reject) => {
    const templateConfig = config.template.sql

    getTemplate(name, params, templateConfig)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}

module.exports = {
  getTemplateSQL,
  getTemplateSMTP
}
