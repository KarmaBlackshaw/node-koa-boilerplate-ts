import Promise from 'bluebird'
import _bcrypt from 'bcryptjs'
const bcrypt = Promise.promisifyAll(_bcrypt)

function verify ({ password, hash }) {
  return bcrypt.compareAsync(password, hash)
}

async function hash (password, rounds = 2) {
  const salt = await bcrypt.genSaltAsync(rounds, 2)
  return bcrypt.hashAsync(password, salt)
}

export default {
  verify,
  hash,
}
