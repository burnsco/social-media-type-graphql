import { QueryOrder } from "@mikro-orm/core"
import {
  Arg,
  Args,
  Ctx,
  FieldResolver,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  ResolverFilterData,
  Root,
  Subscription,
  UseMiddleware
} from "type-graphql"
import CategoryArgs from "../args/category-args"
import NewMessageArgs from "../args/message-args"
import { subRedditNameInUse } from "../common/constants"
import { Topic } from "../common/topics"
import { Category, Message, User } from "../entities"
import { CategoryInput } from "../inputs"
import MessageInput from "../inputs/message-input"
import { isAuth } from "../lib/isAuth"
import { CategoryMutationResponse } from "../responses/"
import MessageMutationResponse from "../responses/mutation/message-mutation-response"
import { ContextType } from "../types"

@Resolver(() => Category)
export default class CategoryResolver {
  @Query(() => [Category], { nullable: true })
  async categories(@Ctx() { em }: ContextType): Promise<Category[] | null> {
    return await em.find(Category, {})
  }

  @Query(() => [Category], { nullable: true })
  async paginatedCategories(
    @Args() { first, skip, name, orderBy }: CategoryArgs,
    @Ctx() { em }: ContextType
  ): Promise<Category[] | null> {
    if (name) {
      const [categories] = await em.findAndCount(
        Category,
        {},
        {
          limit: first,
          offset: skip,
          orderBy: {
            createdAt: orderBy === "asc" ? QueryOrder.ASC : QueryOrder.DESC
          }
        }
      )
      if (categories) {
        return categories.filter(cat => cat.name.includes(name))
      }
      return categories
    }

    const [categories] = await em.findAndCount(
      Category,
      {},
      {
        limit: first,
        offset: skip,
        orderBy: {
          createdAt: orderBy === "asc" ? QueryOrder.ASC : QueryOrder.DESC
        }
      }
    )
    return categories
  }

  @Query(() => Category)
  async category(
    @Args() { categoryId }: NewMessageArgs,
    @Ctx() { em }: ContextType
  ) {
    return await em.findOneOrFail(Category, categoryId)
  }

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

  @FieldResolver(() => [Message], { nullable: true })
  async messages(@Root() category: Category, @Ctx() { em }: ContextType) {
    return await em.find(Message, { category: { id: category.id } })
  }

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
