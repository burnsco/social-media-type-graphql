import { Field, ID, InputType } from "type-graphql"

@InputType()
export default class PrivateMessageInput {
  @Field()
  body!: string

  @Field(() => ID)
  userId!: string
}
