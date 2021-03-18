import { ArgsType, Field, Int } from "type-graphql"

@ArgsType()
export default class PrivateMessageArgs {
  @Field(() => Int)
  userId: number
}
