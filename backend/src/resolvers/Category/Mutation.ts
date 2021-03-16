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
import NewMessageArgs from "../../args/message-args"
import { subRedditNameInUse } from "../../common/constants"
import { Topic } from "../../common/topics"
import { Category, Message, User } from "../../entities"
import { CategoryInput } from "../../inputs"
import MessageInput from "../../inputs/message-input"
import { isAuth } from "../../lib/isAuth"
import { CategoryMutationResponse } from "../../responses"
import MessageMutationResponse from "../../responses/mutation/message-mutation-response"
import { ContextType } from "../../types"

@Resolver(() => Category)
export default class CategoryMutationResolver {
  @Mutation(() => CategoryMutationResponse)
  @UseMiddleware(isAuth)
  async createCategory(
    @Arg("data") data: CategoryInput,
    @Ctx() { em }: ContextType
  ): Promise<CategoryMutationResponse> {
    const errors = []
    const isNameInUse = await em.findOne(Category, { name: data.name })
    if (!isNameInUse) {
      const category = em.create(Category, {
        name: data.name
      })
      await em.persistAndFlush(category)
      return { category }
    }
    errors.push(subRedditNameInUse)
    return {
      errors
    }
  }

  @Mutation(() => MessageMutationResponse)
  @UseMiddleware(isAuth)
  async createMessage(
    @Arg("data") { content, categoryId }: MessageInput,
    @PubSub(Topic.NewMessage)
    notifyAboutNewMessage: Publisher<Partial<Message>>,
    @Ctx() { em, req }: ContextType
  ): Promise<MessageMutationResponse | null | boolean> {
    const user = await em.findOneOrFail(User, req.session.userId)
    const category = await em.findOneOrFail(Category, categoryId, {
      populate: ["messages"]
    })
    if (category && req.session.userId) {
      const message = em.create(Message, {
        category,
        content,
        sentBy: user
      })
      em.persist(category)
      category.messages.add(message)
      await em.flush()
      await notifyAboutNewMessage({
        id: message.id,
        category: message.category,
        content: message.content,
        sentBy: message.sentBy
      })
      return {
        message,
        category
      }
    }
    return null
  }

  // *** SUBSCRIPTION *** \\

  @Subscription(() => Message, {
    topics: Topic.NewMessage,
    filter: ({
      payload,
      args
    }: ResolverFilterData<Message, NewMessageArgs>) => {
      return payload.category.id === args.categoryId
    }
  })
  newMessage(
    @Root() newMessage: Message,
    @Args() { categoryId }: NewMessageArgs
  ): Message {
    console.log(categoryId)
    return newMessage
  }
}
