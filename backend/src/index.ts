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

async function main(): Promise<void> {
  const { orm } = await initializeDB()

  const { redisClient, pubSub } = initializeRedis()
  const { app } = initializeExpress()

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
