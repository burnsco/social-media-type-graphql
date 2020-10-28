import { MikroORM } from "@mikro-orm/core"
import { ApolloServer } from "apollo-server-express"
import chalk from "chalk"
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

const main = async () => {
  const orm = await MikroORM.init(MikroConfig)

  const migrator = orm.getMigrator()
  const migrations = await migrator.getPendingMigrations()
  if (migrations && migrations.length > 0) {
    await migrator.up()
  }

  console.log(chalk.blueBright("Starting DB..."))

  const app = express()

  console.log(chalk.green("Initializing Redis..."))
  const redisStore = connectRedis(session)
  const redisClient = new Redis(process.env.REDIS_URL)

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
        domain: __prod__ ? ".reddit-clone.com" || ".vercel.app" : undefined
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false
    })
  )

  console.log(chalk.yellow("Starting ApolloServer..."))
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

  app.listen(process.env.PORT, () => {
    console.log(
      chalk.red(
        `Server ready at ` +
          chalk.blue.underline.bold(
            `http://localhost:${process.env.PORT}${server.graphqlPath}`
          ) +
          ` `
      )
    )
  })
}

main().catch(err => {
  console.log(err)
})
