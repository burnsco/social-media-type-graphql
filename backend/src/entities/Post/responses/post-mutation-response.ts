import { Field, ObjectType } from "type-graphql"
import { Post } from "../../"
import MutationResponse from "../../common/mutation-response"

@ObjectType()
export default class PostMutationResponse extends MutationResponse {
  @Field(() => Post, { nullable: true })
  post?: Post
}
