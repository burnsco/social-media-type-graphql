import { graphql } from "graphql"
import { buildSchema } from "type-graphql"
import { CategoryResolver } from "../Entities/Category/category-resolver"
import { CommentResolver } from "../Entities/Comment/comment-resolver"
import { PostResolver } from "../Entities/Post/post-resolver"
import { UserResolver } from "../Entities/User/user-resolver"
import { VoteResolver } from "../Entities/Vote/vote-resolver"
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
