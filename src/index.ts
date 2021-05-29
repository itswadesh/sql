import session from 'express-session'
import connectRedis from 'connect-redis'
import Redis from 'ioredis'
import { REDIS_OPTIONS, APP_PORT } from './config'
import { createApp } from './app'
;(async () => {
const RedisStore = connectRedis(session)

const client = new Redis(REDIS_OPTIONS)

const store = new RedisStore({ client })

const app = createApp(store)

// @ts-ignore
app.listen(APP_PORT, () => {
    console.log(`App is listening on port ${APP_PORT}`)
})
})()