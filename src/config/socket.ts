// libs
import { Server } from 'socket.io'
import _ from 'lodash'

// config
import redis from '~/config/redis'

// constants
import env from '~/constants/env'

class Socket {
  client = null

  get namespaces () {
    return new Set()
  }

  async start () {
    this.client = new Server(env.SOCKET.PORT, {
      transports: ['websocket', 'polling'],
      rejectUnauthorized: false,
    })

    this.namespaces.forEach(namespace => {
      this[`ns${_.capitalize(namespace)}`] = this.client.of(namespace)
    })

    await this.listenToRedis()
  }

  async listenToRedis () {
    const sub = await redis.duplicate()

    sub.pSubscribe('socket:*', (message, channel) => {
      const channelArray = channel.split(':')

      if (channelArray.length < 3) {
        return
      }

      const namespace = channelArray[1]
      const event = channelArray[2]

      if (this.namespaces.has(namespace)) {
        this[`ns${_.capitalize(namespace)}`].emit(event, message)
      }
    })
  }
}

export default new Socket()
