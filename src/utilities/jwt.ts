import Promise from 'bluebird'
import _jwt from 'jsonwebtoken'
import env from '~/constants/env'

const jwt = Promise.promisifyAll(_jwt)

function sign (payload) {
  const options = Object.assign({
    expiresIn: env.JWT.EXPIRES_IN,
  })

  return jwt.signAsync(
    { data: payload },
    env.JWT.SECRET_KEY,
    options
  )
}

function verify (token) {
  return jwt.verifyAsync(token, env.JWT.SECRET_KEY)
}

export default {
  sign,
  verify,
}
