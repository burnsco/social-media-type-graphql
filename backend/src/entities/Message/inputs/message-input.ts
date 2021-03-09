import { Field, ID, InputType } from "type-graphql"

@InputType()
export class MessageInput {
  @Field(() => ID)
  userId?: string

  @Field()
  content?: string
}
