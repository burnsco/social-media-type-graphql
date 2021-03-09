import { Args, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql"
import { Message, User } from "../Base/index"
import { ContextType } from "../../types"
import { NewMessageArgs } from "./message-args"

@Resolver(() => Message)
export class MessageResolver {
  @Query(() => Message, { nullable: true })
  async message(
    @Args() { userId }: NewMessageArgs,
    @Ctx() { em }: ContextType
  ): Promise<Message | null> {
    return await em.findOneOrFail(Message, { sentBy: { id: userId } })
  }

  @Query(() => [Message], { nullable: true })
  messages(@Ctx() { em }: ContextType): Promise<Message[] | null> {
    return em.find(Message, {})
  }

  @FieldResolver()
  async sentTo(
    @Root() message: Message,
    @Ctx() { em }: ContextType
  ): Promise<User | null> {
    const user = await em.findOne(User, { id: message.sentTo.id })
    if (!user) {
      return null
    }
    return user
  }

  @FieldResolver()
  async sentBy(
    @Root() message: Message,
    @Ctx() { em }: ContextType
  ): Promise<User | null> {
    return await em.findOne(User, message.sentBy.id)
  }
}
