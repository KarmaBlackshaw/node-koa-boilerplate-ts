/**
 * Application starting point
 * Boostrap services here
 */

// libs
import chalk from 'chalk'

import knex from '~/config/knex'
import redis from '~/config/redis'
import socket from '~/config/socket'
import jobs from '~/bootstrap/jobs'
import http from '~/bootstrap/http'

import bcrypt from '~/utilities/bcrypt'

// constants
import env from '~/constants/env'

console.log(bcrypt)

// config
import('~/config/console')
import('~/config/redis')

async function bootstrap () {
  try {
    await redis.start()
    await socket.start()

    knex.raw('SELECT 1').then(() => {
      console.log('Database connected')
    })

    await jobs()
    await http()

    console.log(`App running at: \t\t${chalk.cyan(`http://localhost:${env.APP.PORT}`)}`)
    console.log(`Socket running at: \t${chalk.cyan(`http://localhost:${env.SOCKET.PORT}`)}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

bootstrap()
