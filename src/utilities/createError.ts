/**
 * Usage

import createError from '~/utilities/createError'

createError({ name: 'VALIDATION_ERROR', message: 'hello world' })
 */

export default properties => {
  const error = new Error()
  for (const key in properties) {
    error[key] = properties[key]
  }
  throw error
}
