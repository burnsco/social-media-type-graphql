import { Field, ID, InputType } from "type-graphql"

@InputType()
export default class MessageInput {
  @Field(() => ID)
  userId?: string

  @Field()
  content?: string
}
