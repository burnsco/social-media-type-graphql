import { ArgsType, Field, Int } from 'type-graphql'

@ArgsType()
export class MessagesArgs {
  @Field(() => Int)
  messageId?: number
}
