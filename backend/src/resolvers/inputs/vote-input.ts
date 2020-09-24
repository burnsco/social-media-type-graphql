import { Field, ID, InputType, Int } from "type-graphql"

@InputType()
export class VoteInput {
  @Field(() => ID)
  postId: number

  @Field(() => Int)
  value: number
}
