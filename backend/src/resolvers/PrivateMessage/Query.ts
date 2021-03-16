import { Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql"
import { PrivateMessage, User } from "../../entities"
import { ContextType } from "../../types"

@Resolver(() => PrivateMessage)
export default class PrivateMessageQueryResolver {
  @Query(() => PrivateMessage, { nullable: true })
  async privateMessage(
    @Ctx() { em, req }: ContextType
  ): Promise<PrivateMessage> {
    return await em.findOneOrFail(PrivateMessage, {
      sentBy: { id: req.session.userId }
    })
  }

  @Query(() => [PrivateMessage], { nullable: true })
  async privateMessages(
    @Ctx() { em, req }: ContextType
  ): Promise<PrivateMessage[] | null> {
    return await em.find(PrivateMessage, { sentBy: { id: req.session.userId } })
  }

  @FieldResolver()
  async sentBy(
    @Root() privateMessage: PrivateMessage,
    @Ctx() { em }: ContextType
  ): Promise<User> {
    return await em.findOneOrFail(User, privateMessage.sentBy.id)
  }

  @FieldResolver()
  async sentTo(
    @Root() message: PrivateMessage,
    @Ctx() { em }: ContextType
  ): Promise<User> {
    return await em.findOneOrFail(User, message.sentTo.id)
  }
}
