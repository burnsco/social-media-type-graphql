import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql"
import { User } from "../../entities"
import PrivateMessage from "../../entities/PrivateMessage"
import PrivateMessageInput from "../../inputs/private-message-input"
import { isAuth } from "../../lib/isAuth"
import { ContextType } from "../../types"

@Resolver(() => PrivateMessage)
export default class PrivateMessageMutationResolver {
  @Mutation(() => PrivateMessage)
  @UseMiddleware(isAuth)
  async sendPrivateMessage(
    @Arg("data") { body, userId }: PrivateMessageInput,
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

      em.persist(user)
      em.persist(receipent)
      em.persist(newmessage)

      user.privateMessages.add(newmessage)
      receipent.privateMessages.add(newmessage)

      await em.flush()

      return newmessage
    }
    return null
  }
}
