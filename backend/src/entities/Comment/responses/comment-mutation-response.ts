import { Field, ObjectType } from "type-graphql"
import { Comment, Post } from "../Base/index"
import MutationResponse from "../mutation-response"

@ObjectType()
export default class CommentMutationResponse extends MutationResponse {
  @Field(() => Comment, { nullable: true })
  comment?: Comment

  @Field(() => Post, { nullable: true })
  post?: Post
}
