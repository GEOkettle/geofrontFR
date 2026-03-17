import { createClient } from 'redis'

import { serverEnv } from '#/server/config/env'

let redisClient: ReturnType<typeof createClient> | null = null
let redisConnectionPromise: Promise<ReturnType<typeof createClient>> | null =
  null

function createRedisClient() {
  const client = createClient({
    socket: {
      host: serverEnv.REDIS_HOST,
      port: serverEnv.REDIS_PORT,
    },
    username: serverEnv.REDIS_USERNAME || undefined,
    password: serverEnv.REDIS_PASSWORD || undefined,
    database: serverEnv.REDIS_DATABASE,
  })

  client.on('error', (error) => {
    console.error('[server/redis] client error', error)
  })

  return client
}

export async function getRedisClient() {
  if (!redisClient) {
    redisClient = createRedisClient()
  }

  if (redisClient.isOpen) {
    return redisClient
  }

  if (!redisConnectionPromise) {
    redisConnectionPromise = redisClient
      .connect()
      .then(() => redisClient as ReturnType<typeof createClient>)
      .finally(() => {
        redisConnectionPromise = null
      })
  }

  return redisConnectionPromise
}
