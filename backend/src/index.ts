import { ApolloServer } from "apollo-server-express"
import "dotenv-safe/config"
import http from "http"
import "reflect-metadata"
import { buildSchema } from "type-graphql"
import { CategoryResolver } from "./resolvers/category-resolver"
import { CommentResolver } from "./resolvers/comment-resolver"
import { PostResolver } from "./resolvers/post-resolver"
import { UserResolver } from "./resolvers/user-resolver"
import { VoteResolver } from "./resolvers/vote-resolver"
import initializeDB from "./utils/initializeDB"
import initializeExpress from "./utils/initializeExpress"
import initializeLogger from "./utils/initializeLogger"
import initializeRedis from "./utils/redisConfig"

const main = async (): Promise<void> => {
  const { logger } = initializeLogger()
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
        logger.log({
          level: "info",
          message: `User connected`
        })
        console.log(
          `Subscription client connected using Apollo server's built-in SubscriptionServer.`
        )
      },
      onDisconnect: async () => {
        logger.log({
          level: "info",
          message: `User disconnected`
        })
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

main().catch(err => {
  console.log(err)
})
