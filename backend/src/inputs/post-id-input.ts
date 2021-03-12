import { InputType, Field, ID } from "type-graphql"

@InputType()
export default class PostIdInput {
  @Field(() => ID)
  postId: string
}
