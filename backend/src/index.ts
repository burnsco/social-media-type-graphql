import { MikroORM } from "@mikro-orm/core"
import { ApolloServer } from "apollo-server-express"
import connectRedis from "connect-redis"
import cors from "cors"
import express from "express"
import session from "express-session"
import Redis from "ioredis"
import path from "path"
import "reflect-metadata"
import { buildSchema } from "type-graphql"
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
  await orm.getMigrator().up()

  const app = express()

  const redisStore = connectRedis(session)
  const redisClient = new Redis(options)

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true
    })
  )
  app.use(
    session({
      name: "rdt",
      store: new redisStore({
        client: redisClient,
        disableTouch: true
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax",
        secure: false
      },
      saveUninitialized: false,
      secret: "qowiueojwojfalksdjoqiwueo",
      resave: false
    })
  )

  const generator = orm.getSchemaGenerator()
  await generator.dropSchema()
  await generator.createSchema()
  await generator.updateSchema()

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        PostResolver,
        UserResolver,
        VoteResolver,
        CategoryResolver,
        CommentResolver
      ],
      emitSchemaFile: path.resolve(__dirname, "./schema.gql"),
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
