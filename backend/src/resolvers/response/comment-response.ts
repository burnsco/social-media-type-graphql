import { Field, Int, ObjectType } from "type-graphql"
import { Comment } from "../../entities/Comment"
import { Post } from "../../entities/Post"
import { MutationResponse } from "./mutation-response"

@ObjectType()
export class CommentMutationResponse extends MutationResponse {
  @Field(() => Comment, { nullable: true })
  comment?: Comment

  @Field(() => Post, { nullable: true })
  post?: Post
}

@ObjectType()
export class CommentsQueryResponse extends MutationResponse {
  @Field(() => [Comment], { nullable: true })
  comments?: Comment[]

  @Field(() => Int, { nullable: true })
  count?: number
}
