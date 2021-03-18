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

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createMessage(
    @Arg("data") { content, categoryId }: MessageInput,
    @PubSub(Topic.NewMessage)
    notifyAboutNewMessage: Publisher<Message>,
    @Ctx() { em, req }: ContextType
  ): Promise<boolean> {
    const user = await em.findOneOrFail(User, req.session.userId)
    const category = await em.findOne(Category, categoryId, {
      populate: ["messages"]
    })
    if (!category) {
      console.log("category not found")
      return false
    }
    if (category && req.session.userId) {
      const message = em.create(Message, {
        createdAt: new Date().toISOString(),
        category,
        content,
        sentBy: user
      })
      em.persist(category)
      em.persist(message)
      category.messages.add(message)
      await em.flush()
      await notifyAboutNewMessage(message)
    }
    return true
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
