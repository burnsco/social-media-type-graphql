import { Field, ObjectType } from "type-graphql"
import { Comment, Post } from "../../"
import MutationResponse from "../../common/mutation-response"

@ObjectType()
export default class CommentMutationResponse extends MutationResponse {
  @Field(() => Comment, { nullable: true })
  comment?: Comment

  @Field(() => Post, { nullable: true })
  post?: Post
}
