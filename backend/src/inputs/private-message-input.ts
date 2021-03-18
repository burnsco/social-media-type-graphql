import { Field, InputType, Int } from "type-graphql"

@InputType()
export default class PrivateMessageInput {
  @Field()
  body!: string

  @Field(() => Int)
  userId!: number
}
