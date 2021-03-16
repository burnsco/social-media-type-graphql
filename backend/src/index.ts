import { MikroORM } from "@mikro-orm/core"
import { PostgreSqlDriver } from "@mikro-orm/postgresql"
import { ApolloServer } from "apollo-server-express"
import "dotenv-safe/config"
import http from "http"
import "reflect-metadata"
import { buildSchema } from "type-graphql"
import {
  initializeDB,
  initializeExpress,
  initializeLogger,
  initializeRedis
} from "./config"
import {
  CategoryResolver,
  CommentResolver,
  PostResolver,
  UserResolver,
  VoteResolver
} from "./resolvers"
import MessageResolver from "./resolvers/message-resolver"
import PrivateMessageResolver from "./resolvers/private-message-res"
import { wipeDatabase } from "./utils"

async function main(): Promise<void> {
  const orms = await MikroORM.init<PostgreSqlDriver>()
  await wipeDatabase(orms.em)

  const { orm } = await initializeDB()

  const { redisClient, pubSub } = initializeRedis()
  const { app } = initializeExpress()

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        PostResolver,
        UserResolver,
        MessageResolver,
        PrivateMessageResolver,
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

  httpServer.listen(process.env.PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
    )
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${process.env.PORT}${server.subscriptionsPath}`
    )
  })
}

const { logger } = initializeLogger()

main().catch((err: any) => {
  logger.log({ level: "error", message: err.message })
})
