import { MikroORM } from "@mikro-orm/core"
import { ApolloServer } from "apollo-server-express"
import connectRedis from "connect-redis"
import cors from "cors"
import "dotenv-safe/config"
import express from "express"
import session from "express-session"
import { RedisPubSub } from "graphql-redis-subscriptions"
import http from "http"
import Redis from "ioredis"
import "reflect-metadata"
import { buildSchema } from "type-graphql"
import { COOKIE_NAME, __prod__ } from "./constants"
import { CategoryResolver } from "./resolvers/category-resolver"
import { CommentResolver } from "./resolvers/comment-resolver"
import { PostResolver } from "./resolvers/post-resolver"
import { UserResolver } from "./resolvers/user-resolver"
import { VoteResolver } from "./resolvers/vote-resolver"

const REDIS_PORT = 6379

const options: Redis.RedisOptions = {
  host: process.env.REDIS_HOST,
  port: REDIS_PORT,
  retryStrategy: times => Math.max(times * 100, 3000)
}

const main = async (): Promise<void> => {
  const orm = await MikroORM.init()
  const migrator = orm.getMigrator()
  const migrations = await migrator.getPendingMigrations()

  if (migrations && migrations.length > 0) {
    await migrator.up()
  }

  const app = express()

  const redisStore = connectRedis(session)
  const redisClient = new Redis(process.env.REDIS_URL)

  const pubSub = new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options)
  })

  app.set("trust proxy", 1)
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
        domain: __prod__ ? "reddit-clone.com" || ".vercel.app" : undefined
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
      validate: false,
      pubSub
    }),
    context: ({ req, res }) => ({
      em: orm.em.fork(),
      req,
      res,
      redis: redisClient
    }),
    subscriptions: {
      path: "/subscriptions",
      onConnect: async () => {
        console.log(
          `Subscription client connected using Apollo server's built-in SubscriptionServer.`
        )
      },
      onDisconnect: async () => {
        console.log(`Subscription client disconnected.`)
      }
    }
  })

  server.applyMiddleware({ app, cors: false })

  const httpServer = http.createServer(app)
  server.installSubscriptionHandlers(httpServer)

  // Make sure to call listen on httpServer, NOT on app.
  httpServer.listen(process.env.PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
    )
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${process.env.PORT}${server.subscriptionsPath}`
    )
  })
}

main().catch(err => {
  console.log(err)
})
