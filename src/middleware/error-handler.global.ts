import Logger from '~/config/logger'

const logger = Logger()

export default () => {
  return async (ctx, next) => {
    try {
      await next()
    } catch (error) {
      console.log(error.stack)

      logger.error(error)

      ctx.status = error.name === 'ValidationError'
        ? 400
        : error.status || 500

      ctx.body = {
        status: ctx.status,
        name: ctx.status === 500 ? 'Internal Server Error' : error.name,
        message: ctx.status === 500 ? 'Internal Server Error' : error.message,
        errors: error.body,
      }
    }
  }
}
