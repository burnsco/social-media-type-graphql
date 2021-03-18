import { ArgsType, Field, Int } from "type-graphql"

@ArgsType()
export default class ChatRoomArgs {
  @Field(() => Int)
  categoryId: number
}
