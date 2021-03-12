import { Args, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql"
import { NewMessageArgs } from "../args"
import { Message, User } from "../entities"
import { ContextType } from "../types"

@Resolver(() => Message)
export default class MessageResolver {
  @Query(() => Message, { nullable: true })
  async message(
    @Args() { userId }: NewMessageArgs,
    @Ctx() { em }: ContextType
  ): Promise<Message> {
    return await em.findOneOrFail(Message, { sentBy: { id: userId } })
  }

  @Query(() => [Message], { nullable: true })
  async messages(@Ctx() { em }: ContextType): Promise<Message[] | null> {
    return await em.find(Message, {})
  }

  @FieldResolver()
  async sentTo(
    @Root() message: Message,
    @Ctx() { em }: ContextType
  ): Promise<User> {
    return await em.findOneOrFail(User, message.sentTo.id)
  }

  @FieldResolver()
  async sentBy(
    @Root() message: Message,
    @Ctx() { em }: ContextType
  ): Promise<User> {
    return await em.findOneOrFail(User, message.sentBy.id)
  }
}
