import { Field, ID, InputType } from "type-graphql"
import { Comment } from "../Base/index"

@InputType()
export class CommentInput implements Partial<Comment> {
  @Field(() => String)
  body: string

  @Field(() => ID)
  postId: string
}
