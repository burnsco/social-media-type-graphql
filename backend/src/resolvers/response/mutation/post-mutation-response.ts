import { Field, ObjectType } from "type-graphql"
import { MutationResponse } from ".."
import { Post } from "../../../entities/index"

@ObjectType()
export default class PostMutationResponse extends MutationResponse {
  @Field(() => Post, { nullable: true })
  post?: Post
}
