// import knexMeta from '@jeash/knex-meta'

import Knex from 'knex'

// constants
import env from '~/constants/env'

// const knex = knexMeta(Knex)

export default Knex({
  client: 'mysql',

  connection: {
    host: env.DB.HOST || '127.0.0.1',
    user: env.DB.USER || 'root',
    password: env.DB.PASS || '',
    database: env.DB.NAME || '',

    dateStrings: true,

    typeCast (field, next) {
      try {
        if (field.type === 'JSON') {
          const string = field.string()

          return string && JSON.parse(string)
        }

        return next()
      } catch (err) {
        console.log(err)
      }
    },
  },
})
