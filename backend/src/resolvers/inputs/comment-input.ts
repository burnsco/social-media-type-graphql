import { Field, ID, InputType } from "type-graphql"
import { Comment } from "../../entities/Comment"

@InputType()
export class CommentInput implements Partial<Comment> {
  @Field(() => String)
  body: string

  @Field(() => ID)
  postId: string
}
