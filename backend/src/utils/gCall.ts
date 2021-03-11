import { graphql } from "graphql"
import { buildSchema } from "type-graphql"
import { CategoryResolver } from "../entities/Category/resolvers/category-resolver"
import { CommentResolver } from "../entities/Comment/resolvers/comment-resolver"
import { PostResolver } from "../entities/Post/resolvers/post-resolver"
import { UserResolver } from "../entities/User/resolvers/user-resolver"
import { VoteResolver } from "../entities/Vote/resolvers/vote-resolver"
import { testConnection } from "../utils/testConn"

interface Options {
  source: string
  variableValues?: any
  userId?: string
}

export const gCall = async ({ source, variableValues, userId }: Options) => {
  const orm = await testConnection()
  return graphql({
    source,
    variableValues,
    contextValue: {
      req: {
        session: {
          userId
        }
      },
      res: {},
      em: orm.em.fork()
    },
    schema: await buildSchema({
      resolvers: [
        PostResolver,
        UserResolver,
        VoteResolver,
        CategoryResolver,
        CommentResolver
      ]
    })
  })
}
