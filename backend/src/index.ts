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
import { resolversArray } from "./resolvers/resolvers"
import { wipeDatabase } from "./utils"
import { seedDatabase } from "./utils/seedDatabase"

async function main(): Promise<void> {
  const { orm } = await initializeDB()
  await wipeDatabase(orm.em)
  await seedDatabase(orm.em)
  const { app } = initializeExpress()
  const { redisClient, pubSub } = initializeRedis()

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: resolversArray,
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
