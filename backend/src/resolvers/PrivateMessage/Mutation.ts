import {
  Arg,
  Args,
  Ctx,
  Mutation,
  Publisher,
  PubSub,
  Resolver,
  ResolverFilterData,
  Root,
  Subscription,
  UseMiddleware
} from "type-graphql"
import PrivateMessageArgs from "../../args/private-message-args"
import { Topic } from "../../common/topics"
import { User } from "../../entities"
import PrivateMessage from "../../entities/PrivateMessage"
import PrivateMessageInput from "../../inputs/private-message-input"
import { isAuth } from "../../lib/isAuth"
import { ContextType } from "../../types"

@Resolver(() => User)
export default class PrivatMessageMutationResolver {
  @Mutation(() => PrivateMessage)
  @UseMiddleware(isAuth)
  async sendPrivateMessage(
    @Arg("data") { body, userId }: PrivateMessageInput,
    @PubSub(Topic.NewPrivateMessage)
    notifyAboutNewMessage: Publisher<Partial<PrivateMessage>>,
    @Ctx() { em, req }: ContextType
  ): Promise<PrivateMessage | null> {
    const user = await em.findOneOrFail(User, req.session.userId, [
      "privateMessages"
    ])
    const receipent = await em.findOneOrFail(User, userId, ["privateMessages"])

    if (user && receipent && req.session.userId) {
      const message = em.create(PrivateMessage, {
        body,
        sentBy: em.getReference(User, req.session.userId),
        sentTo: em.getReference(User, receipent.id)
      })
      user.privateMessages.add(message)
      receipent.privateMessages.add(message)

      await notifyAboutNewMessage(message)

      await em.flush()

      return message
    }
    return null
  }

  @Subscription(() => PrivateMessage, {
    topics: Topic.NewPrivateMessage,
    filter: ({
      payload,
      args
    }: ResolverFilterData<PrivateMessage, PrivateMessageArgs>) => {
      return payload.sentTo.id === args.userId
    }
  })
  newPrivateMessage(
    @Root() newPrivateMessage: PrivateMessage,
    @Args() { userId }: PrivateMessageArgs
  ): PrivateMessage {
    console.log(userId)
    return newPrivateMessage
  }

  @Subscription(() => User, {
    topics: Topic.NewUser
  })
  newUser(@Root() newUser: User): User {
    console.log(newUser)
    return newUser
  }
}
