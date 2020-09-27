import { graphql } from "graphql"
import { buildSchema } from "type-graphql"
import { CategoryResolver } from "../resolvers/category-resolver"
import { CommentResolver } from "../resolvers/comment-resolver"
import { PostResolver } from "../resolvers/post-resolver"
import { UserResolver } from "../resolvers/user-resolver"
import { VoteResolver } from "../resolvers/vote-resolver"
import { testConnection } from "./testConn"

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
