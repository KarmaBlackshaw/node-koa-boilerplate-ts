// services
import authService from '~/resources/auth/service'

// libraries
import Joi from 'joi'
import _ from 'lodash'

export default {
  async login (ctx) {
    const schema = Joi.object({
      username: Joi.string()
        .required(),
      password: Joi.string()
        .required(),
    })

    const request = await schema.validateAsync(ctx.request.body)

    ctx.body = await authService.login({
      username: request.username,
      password: request.password,
    })
  },

  async get (ctx) {
    const response = await userService.list({
      is_first: true,
      query: {
        filter: {
          $and: [
            {
              field: 'id',
              value: ctx.user.id,
            },
          ],
        },
      },
    })

    ctx.body = _.omit(response, ['password'])
  },
}
