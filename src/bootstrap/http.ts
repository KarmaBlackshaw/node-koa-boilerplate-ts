
import Koa from 'koa'
import koaRouter from 'koa-router'
import cors from '@koa/cors'
import morgan from 'koa-morgan'

// middlewares
import koaStatic from '~/middleware/koa-static'

// utilities
import bulkImport from '~/utilities/bulkImport'

import env from '~/constants/env'

async function getRoutes () {
  const router = koaRouter()

  const routes = await bulkImport('src/resources/**/route.js')

  routes.forEach(Router => {
    const route = Router({
      router: koaRouter(),
    })

    router.use(route.routes())
  })

  return router
}

export default async () => {
  const router = await getRoutes()
  const middlewares = await bulkImport('src/middleware/*.global.js')

  const app = new Koa()

  app.proxy = true

  /**
   * Middlewares
   */
  app.use(cors())
  app.use(morgan(':date :method :url :status :response-time ms'))
  app.use(router.allowedMethods())
  middlewares.forEach(middleware => app.use(middleware()))
  app.use(koaStatic('/public', './src/storage/app/public'))

  /**
   * Routes
   */
  app.use(router.routes())

  app.listen(env.APP.PORT)

  return app
}
