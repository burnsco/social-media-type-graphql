import { Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql"
import { User } from "../entities"
import PrivateMessage from "../entities/PrivateMessage"
import { ContextType } from "../types"

@Resolver(() => PrivateMessage)
export default class PrivateMessageResolver {
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
