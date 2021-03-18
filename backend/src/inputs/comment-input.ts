import { Field, ID, InputType } from "type-graphql"
import { Comment } from "../entities"

@InputType()
export default class CommentInput implements Partial<Comment> {
  @Field(() => String)
  body: string

  @Field(() => ID)
  postId: number
}
