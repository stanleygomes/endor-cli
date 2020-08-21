const Postgrator = require('postgrator')
const dotenv = require('dotenv')
dotenv.config()

const postgrator = new Postgrator({
  // Directory containing migration files
  migrationDirectory: `${__dirname}/migrations/`,
  // or a glob pattern to files
  // migrationPattern: __dirname + '/migrations/*',
  // Driver: must be pg, mysql, mysql2 or mssql
  driver: process.env.DB_CLIENT,
  // Database connection config
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  // Schema table name. Optional. Default is schemaversion
  // If using Postgres, schema may be specified using . separator
  // For example, { schemaTable: 'schema_name.table_name' }
  schemaTable: 'schema_version'
})

// Migrate to max version (optionally can provide 'max')
postgrator
  .migrate()
  .then((appliedMigrations) => console.log(appliedMigrations))
  .catch((error) => console.log(error))
