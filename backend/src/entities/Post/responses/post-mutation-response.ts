import { Field, ObjectType } from "type-graphql"
import { MutationResponse } from "../resolvers/response"
import { Post } from "../Base/index"

@ObjectType()
export default class PostMutationResponse extends MutationResponse {
  @Field(() => Post, { nullable: true })
  post?: Post
}
