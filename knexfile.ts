/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

import env from '~/constants/env'

export default {
  client: 'mysql',
  connection: {
    host: env.DB.HOST,
    user: env.DB.USER,
    password: env.DB.PASS,
    database: env.DB.NAME,

    dateStrings: true,
  },
  migrations: {
    tableName: 'migrations',
    stub: 'src/database/templates/migration.js',
    directory: 'src/database/migrations',
  },
  seeds: {
    tableName: 'seeds',
    directory: 'src/database/seeds',
  },
}
