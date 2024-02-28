
import serve from 'koa-static'
import mount from 'koa-mount'
import path from 'path'

export default (endpoint, dir) => {
  const publicPath = path.join(process.cwd(), dir)

  return mount(endpoint, serve(publicPath))
}
