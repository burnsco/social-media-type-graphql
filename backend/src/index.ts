import { MikroORM } from "@mikro-orm/core"
import { ApolloServer } from "apollo-server-express"
import connectRedis from "connect-redis"
import cors from "cors"
import "dotenv-safe/config"
import express from "express"
import session from "express-session"
import Redis from "ioredis"
import "reflect-metadata"
import { buildSchema } from "type-graphql"
import { COOKIE_NAME, __prod__ } from "./constants"
import MikroConfig from "./mikro-orm.config"
import { CategoryResolver } from "./resolvers/category-resolver"
import { CommentResolver } from "./resolvers/comment-resolver"
import { PostResolver } from "./resolvers/post-resolver"
import { UserResolver } from "./resolvers/user-resolver"
import { VoteResolver } from "./resolvers/vote-resolver"

const REDIS_HOST = "127.0.0.1"
const REDIS_PORT = 6379
const PORT = process.env.PORT || 4000

const main = async () => {
  const options: Redis.RedisOptions = {
    host: REDIS_HOST,
    port: REDIS_PORT,
    retryStrategy: times => Math.max(times * 100, 3000)
  }

  const orm = await MikroORM.init(MikroConfig)

  const app = express()

  const redisStore = connectRedis(session)
  const redisClient = new Redis(options)

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true
    })
  )
  app.use(
    session({
      name: COOKIE_NAME,
      store: new redisStore({
        client: redisClient,
        disableTouch: true
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
        domain: __prod__ ? ".reddit-clone.com" : undefined
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false
    })
  )

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        PostResolver,
        UserResolver,
        VoteResolver,
        CategoryResolver,
        CommentResolver
      ],
      validate: false
    }),
    context: ({ req, res }) => ({
      em: orm.em.fork(),
      req,
      res,
      redis: redisClient
    })
  })

  server.applyMiddleware({ app, cors: false })

  app.listen(PORT, () => {
    console.log(
      `🚀🚀  Server ready at https://localhost:${PORT}${server.graphqlPath} 🚀 🚀 `
    )
  })
}

main().catch(err => {
  console.log(err)
})
