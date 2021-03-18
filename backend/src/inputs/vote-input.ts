import { Field, ID, InputType } from "type-graphql"

@InputType()
export default class VoteInput {
  @Field(() => ID)
  postId: number

  @Field(() => ID)
  value: number
}
