import { Field, InputType, Int } from "type-graphql"
import { Comment } from "../../entities/Comment"

@InputType()
export class CommentInput implements Partial<Comment> {
  @Field()
  body: string

  @Field(() => Int)
  postId: number
}
