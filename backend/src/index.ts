import { ApolloServer } from "apollo-server-express"
import "dotenv-safe/config"
import http from "http"
import "reflect-metadata"
import { buildSchema } from "type-graphql"
import initializeDB from "./config/initializeDB"
import { CategoryResolver } from "./entities/Category/resolvers/category-resolver"
import { CommentResolver } from "./entities/Comment/resolvers/comment-resolver"
import { PostResolver } from "./entities/Post/resolvers/post-resolver"
import { UserResolver } from "./entities/User/resolvers/user-resolver"
import { VoteResolver } from "./entities/Vote/resolvers/vote-resolver"
import initializeExpress from "./server/initializeExpress"
import initializeRedis from "./server/redisConfig"

const main = async (): Promise<void> => {
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

main().catch(err => {
  console.log(err)
})
