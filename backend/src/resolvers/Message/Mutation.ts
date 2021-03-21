import {
  Arg,
  Ctx,
  Mutation,
  Publisher,
  PubSub,
  Resolver,
  Root,
  Subscription,
  UseMiddleware
} from "type-graphql"
import { Topic } from "../../common/topics"
import { Category, Message, User } from "../../entities"
import MessageInput from "../../inputs/message-input"
import { isAuth } from "../../lib/isAuth"
import MessageMutationResponse from "../../responses/mutation/message-mutation-response"
import { ContextType } from "../../types"

@Resolver(() => Message)
export default class MessageMutationResolver {
  @Mutation(() => MessageMutationResponse)
  @UseMiddleware(isAuth)
  async createMessage(
    @Arg("data") { content, categoryId }: MessageInput,
    @PubSub(Topic.NewMessage)
    notifyAboutNewMessage: Publisher<Partial<Message>>,
    @Ctx() { em, req }: ContextType
  ): Promise<MessageMutationResponse | null | boolean> {
    const category = await em.findOneOrFail(Category, categoryId, {
      populate: ["messages"]
    })
    if (category && req.session.userId) {
      const message = em.create(Message, {
        category: em.getReference(Category, category.id),
        content,
        sentBy: em.getReference(User, req.session.userId)
      })
      em.persist(category)
      category.messages.add(message)
      await em.flush()
      await notifyAboutNewMessage(message)
      return {
        message,
        category
      }
    }
    return null
  }

  // *** SUBSCRIPTION *** \\

  @Subscription(() => Message, {
    topics: Topic.NewMessage
  })
  newMessage(@Root() newMessage: Message): Message {
    return newMessage
  }
}