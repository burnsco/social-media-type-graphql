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
      const newmessage = em.create(PrivateMessage, {
        body,
        sentBy: em.getReference(User, user.id),
        sentTo: em.getReference(User, receipent.id)
      })
      console.log(newmessage)
      em.persist(user)
      em.persist(receipent)
      user.privateMessages.add(newmessage)
      em.persist(newmessage)
      receipent.privateMessages.add(newmessage)
      await em.flush()
      await notifyAboutNewMessage({
        createdAt: newmessage.createdAt,
        body: newmessage.body,
        sentBy: user
      })

      return newmessage
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
