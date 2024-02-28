/**

import { USER } from '~/constants/index'

import authentication from '~/middleware/authentication'

.use(authentication())

 */

import JWT from '~/utilities/jwt'

export default (roles = []) => {
  return async (ctx, next) => {
    try {
      const bearerHeader = ctx.request.headers.authorization
      const token = String(bearerHeader).split(' ')[1]
      const verifiedToken = await JWT.verify(token)

      if (roles.length && !roles.includes(verifiedToken.data.role)) {
        ctx.throw(401)
      }

      ctx.user = verifiedToken.data || verifiedToken
      return next()
    } catch (error) {
      ctx.throw(401)
    }
  }
}
