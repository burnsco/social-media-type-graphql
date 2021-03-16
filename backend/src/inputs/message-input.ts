import { Field, ID, InputType } from "type-graphql"

@InputType()
export default class MessageInput {
  @Field()
  content: string

  @Field(() => ID)
  categoryId: string
}
