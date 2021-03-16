import { ArgsType, Field, ID } from "type-graphql"

@ArgsType()
export default class ChatRoomArgs {
  @Field(() => ID)
  chatroomId: string
}
