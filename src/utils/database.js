/*
  How to use the knex lib
  Find more hints: https://devhints.io/knex
*/
const knex = require('knex')
const config = require('../config')
const mustacheUtils = require('./mustache')
const loggerUtils = require('./logger')
const i18nUtils = require('./i18n')

/*
  # Start query builder
  You can use this builder promise to build some queries like:
  - builder('user').whereNull('updated_at')
  - builder('user').groupBy('count')
  - builder('user').orderBy(['email', { column: 'age', order: 'desc' }])
  - builder('user').where('columnName', 'like', '%rowlikeme%').andWhere('id', '>', 30)
  - builder('user').whereNull('updated_at')
  - builder('user').whereNotNull('updated_at')
  - builder('user').whereBetween('updated_at')
*/
const builder = (conn = null) => {
  return new Promise((resolve, reject) => {
    try {
      let databaseConfig = null
      if (conn == null) {
        databaseConfig = config.databases.default
      } else {
        databaseConfig = config.databases[conn]
      }

      const k = databaseConfig ? knex(databaseConfig) : null

      if (databaseConfig && databaseConfig.client === 'pg') {
        resolve(k.withSchema(databaseConfig.connection.schema))
      } else if (databaseConfig && databaseConfig.client === 'mysql') {
        resolve(k)
      }

      const error = new Error('Connection not defined. Please, check config parameters.')
      reject(error)
    } catch (error) {
      loggerUtils.error(error.stack)
      reject(error)
    }
  })
}

const executeQuery = (query, params = [], conn = null) => {
  return new Promise((resolve, reject) => {
    builder(conn).then(builder => {
      builder.raw(query, params)
        .then(rows => {
          const resp = rows && rows.length ? rows[0] : null
          resolve(resp)
        }).catch(error => {
          loggerUtils.error(error.stack)
          reject(error)
        })
    }).catch(error => {
      loggerUtils.error(error.stack)
      reject(error)
    })
  })
}

/*
  Execute a query from a file
  SQL files folder defined in config/app.js
  Params: filename, params: {id: 2}
*/
const namedQuery = (name, params, conn = null) => {
  return new Promise((resolve, reject) => {
    mustacheUtils.getTemplateSQL(name, params).then(query => {
      executeQuery(query.rendered, [], conn).then(response => {
        resolve(response)
      }).catch(error => reject(error))
    }).catch(error => reject(error))
  })
}

/*
  Execute a basic select in a table with conditions and returning count
  Params: tableName, conditions (optional), fields (optional)
  http://knexjs.org/#Builder-count
*/
const basicCount = (tableName, conditions = {}, fields = '*', conn = null) => {
  return new Promise((resolve, reject) => {
    builder(conn).then(builder => {
      builder(tableName)
        .count(fields)
        .where(conditions)
        .then(rows => {
          const resp = rows && rows.length ? rows[0] : null
          resolve(resp)
        }).catch(error => {
          loggerUtils.error(error.stack)
          reject(error)
        })
    }).catch(error => reject(error))
  })
}

/*
  Execute a basic select in a table with conditions and returning fields
  Params: tableName, conditions (optional), fields (optional)
  http://knexjs.org/#Builder-select
*/
const basicSelect = (tableName, conditions = {}, fields = '*', conn = null) => {
  return new Promise((resolve, reject) => {
    builder(conn).then(builder => {
      builder(tableName)
        .select(fields)
        .from(tableName)
        .where(conditions)
        .then(rows => {
          const resp = rows && rows.length ? rows : null
          resolve(resp)
        }).catch(error => {
          loggerUtils.error(error.stack)
          reject(error)
        })
    }).catch(error => reject(error))
  })
}

/*
  Execute a basic select in a table paginating results
  Params: tableName, limit, offset, conditions (optional), fields (optional)
  http://knexjs.org/#Builder-offset
*/
const basicPaginate = (tableName, conditions = {}, fields = '*', limit = 15, offset = 60, conn = null) => {
  return new Promise((resolve, reject) => {
    basicCount(tableName, conditions, fields).then(count => {
      const countResults = count ? count['count(*)'] : 0
      const lastPage = (limit > 0 ? Math.floor(countResults / limit) : 0)
      const currentPage = limit > 0 && lastPage > 0 ? ((lastPage * (offset * 100)) / (limit * lastPage)) / 100 : 1
      const paginateResults = {
        from: offset,
        to: (offset + limit),
        per_page: limit,
        total_results: countResults,
        last_page: lastPage,
        current_page: currentPage === 0 ? 1 : currentPage,
        results: []
      }

      builder(conn).then(builder => {
        builder(tableName)
          .select(fields)
          .from(tableName)
          .where(conditions)
          .limit(limit)
          .offset(offset)
          .then(rows => {
            paginateResults.results = (rows && rows.length ? rows : null)
            resolve(paginateResults)
          }).catch(error => {
            loggerUtils.error(error.stack)
            reject(error)
          })
      }).catch(error => reject(error))
    }).catch(error => reject(error))
  })
}

/*
  Execute a basic update in a table
  Params: tableName, conditions, fields, returning (only for Postgres)
  Returns: num of updated lines
  http://knexjs.org/#Builder-update
*/
const basicUpdate = (tableName, conditions, fields, returning, conn = null) => {
  return new Promise((resolve, reject) => {
    let validationError = null

    if (!fields || Object.keys(fields).length === 0) {
      validationError = i18nUtils.translate('field_required %s', 'fields')
      reject(validationError)
    }

    if (!conditions || Object.keys(conditions).length === 0) {
      validationError = i18nUtils.translate('field_required %s', 'conditions')
      reject(validationError)
    }

    builder(conn).then(builder => {
      builder(tableName)
        .where(conditions)
        .update(fields, returning)
        .then(rowsUpdated => {
          resolve(rowsUpdated)
        }).catch(error => {
          loggerUtils.error(error.stack)
          reject(error)
        })
    }).catch(error => reject(error))
  })
}

/*
  Execute a basic delete in a table
  Params: tableName, fields, conditions
  Returns: num of deleted lines
  http://knexjs.org/#Builder-del%20/%20delete
*/
const basicDelete = (tableName, conditions, conn = null) => {
  return new Promise((resolve, reject) => {
    let validationError = null

    if (!conditions || Object.keys(conditions).length === 0) {
      validationError = i18nUtils.translate('field_required %s', 'conditions')
      reject(validationError)
    }

    builder(conn).then(builder => {
      builder(tableName)
        .where(conditions)
        .del()
        .then(rowsUpdated => {
          resolve(rowsUpdated)
        }).catch(error => {
          loggerUtils.error(error.stack)
          reject(error)
        })
    }).catch(error => reject(error))
  })
}

/*
  Execute a basic insert in a table
  Params: tableName, fields, returning (optional, only for postgres, mysql return updated rows)
  http://knexjs.org/#Builder-insert
*/
const basicInsert = (tableName, fields, returning = [], conn = null) => {
  return new Promise((resolve, reject) => {
    let validationError = null

    if (!fields || Object.keys(fields).length === 0) {
      validationError = i18nUtils.translate('field_required %s', 'fields')
      reject(validationError)
    }

    builder(conn).then(builder => {
      builder(tableName)
        .returning(returning)
        .insert(fields)
        .then(rowsInserted => {
          resolve(rowsInserted)
        }).catch(error => {
          loggerUtils.error(error.stack)
          reject(error)
        })
    }).catch(error => reject(error))
  })
}

/*
  Insert in batch
  Params:
    - rows: array
    - tableName: string
    - returning (fields): array
    - chunkSize (maximum lines per execution): integer
  http://knexjs.org/#Utility-BatchInsert
*/
const basicBatchInsert = (tableName, rows, returning = [], chunkSize, conn = null) => {
  return new Promise((resolve, reject) => {
    const defaultChunkSize = conn != null ? config.databases[conn].maxChunkSize : config.databases.default.maxChunkSize
    builder(conn).then(builder => {
      builder.transaction((tr) => {
        builder.batchInsert(tableName, rows, chunkSize || defaultChunkSize)
          .returning(returning)
          .then(response => {
            resolve(response)
          })
          .then(tr.commit)
          .catch(tr.rollback)
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    }).catch(error => reject(error))
  })
}

/*
  Update in batch
  Params:
    - rows: array
    - tableName: string
    - returning (fields): array
    - chunkSize (maximum lines per execution): integer
  http://knexjs.org
*/
const basicBatchUpdate = (tableName, column, rows, conn = null) => {
  return new Promise((resolve, reject) => {
    if (rows === null || rows.length === 0) {
      const error = new Error('Can\'t update. No rows to update.')
      reject(error)
    }

    builder(conn).then(builder => {
      builder.transaction((trx) => {
        const queries = rows.map(tuple => {
          return builder(tableName)
            .where(column, tuple[column])
            .update(tuple)
            .transacting(trx)
        })

        return Promise.all(queries)
          .then(trx.commit)
          .then(response => resolve(response))
          .catch(trx.rollback)
      }).catch(error => reject(error))
    }).catch(error => reject(error))
  })
}

/*
  Run code inside transaction
  Params:
    - rows: array
    - tableName
    - returning (fields): array
    - chunkSize (maximum lines per execution): integer
*/
const basicTransation = (conn = null) => {
  return new Promise((resolve, reject) => {
    builder(conn).then(builder => {
      builder.transaction((tr) => {
        resolve(tr)
      }).catch(error => reject(error))
    }).catch(error => reject(error))
  })
}

module.exports = {
  basicCount,
  basicDelete,
  basicInsert,
  basicPaginate,
  basicSelect,
  basicUpdate,
  basicBatchInsert,
  basicBatchUpdate,
  builder,
  namedQuery,
  basicTransation
}
