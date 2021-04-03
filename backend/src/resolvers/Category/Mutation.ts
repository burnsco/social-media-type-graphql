import { LoadStrategy } from "@mikro-orm/core"
import {
  Arg,
  Args,
  Ctx,
  Mutation,
  Publisher,
  PubSub,
  Resolver,
  Root,
  Subscription,
  UseMiddleware
} from "type-graphql"
import NewMessageArgs from "../../args/message-args"
import { subRedditNameInUse } from "../../common/constants"
import { Topic } from "../../common/topics"
import { Category, User } from "../../entities"
import { CategoryInput } from "../../inputs"
import { isAuth } from "../../lib/isAuth"
import { CategoryMutationResponse } from "../../responses"
import { ContextType } from "../../types"

@Resolver(() => Category)
export default class CategoryMutationResolver {
  @Mutation(() => CategoryMutationResponse)
  @UseMiddleware(isAuth)
  async createCategory(
    @Arg("data") data: CategoryInput,
    @PubSub(Topic.NewCategory)
    notifyAboutNewCategory: Publisher<Category>,
    @Ctx() { em }: ContextType
  ): Promise<CategoryMutationResponse> {
    const errors = []
    const isNameInUse = await em.findOne(Category, { name: data.name })
    if (!isNameInUse) {
      const category = em.create(Category, {
        name: data.name
      })
      await em.persistAndFlush(category)
      await notifyAboutNewCategory(category)
      return { category }
    }
    errors.push(subRedditNameInUse)
    return {
      errors
    }
  }

  @Mutation(() => CategoryMutationResponse)
  @UseMiddleware(isAuth)
  async joinChatRoom(
    @Arg("data") data: CategoryInput,
    @PubSub(Topic.NewCategory)
    notifyAboutNewUserInChatRoom: Publisher<User>,
    @Ctx() { em, req }: ContextType
  ): Promise<CategoryMutationResponse | null> {
    const user = await em.findOne(
      User,
      { id: req.session.userId },
      { populate: ["chatRooms"], strategy: LoadStrategy.JOINED }
    )
    const category = await em.findOne(
      Category,
      { name: data.name },
      { populate: ["chatUsers"], strategy: LoadStrategy.JOINED }
    )

    if (category && user && category.chatUsers.contains(user)) {
      return null
    }

    if (category && user) {
      category.chatUsers.add(user)
      user.chatRooms.add(category)
      await em.flush()
      await notifyAboutNewUserInChatRoom(user)
      return { category }
    } else {
      return null
    }
  }

  @Mutation(() => CategoryMutationResponse)
  @UseMiddleware(isAuth)
  async leaveChatRoom(
    @Arg("data") data: CategoryInput,
    @PubSub(Topic.NewCategory)
    notifyAboutUserLeavingChatRoom: Publisher<User>,
    @Ctx() { em, req }: ContextType
  ): Promise<CategoryMutationResponse | null> {
    const user = await em.findOne(User, { id: req.session.userId })
    const category = await em.findOne(
      Category,
      { name: data.name },
      { populate: ["chatUsers"], strategy: LoadStrategy.JOINED }
    )
    if (category && user && category.chatUsers.contains(user)) {
      category.chatUsers.remove(user)
      await em.persistAndFlush(category)
      await notifyAboutUserLeavingChatRoom(user)
      return { category }
    } else {
      return null
    }
  }

  @Subscription(() => Category, {
    topics: Topic.NewCategory
  })
  newCategory(@Root() newCategory: Category): Category {
    return newCategory
  }
  @Subscription(() => User, {
    topics: Topic.UserJoinedChannel,
    filter: ({ payload, args }) => {
      return payload.category === args.categoryId
    }
  })
  userJoinedChannel(
    @Root() user: User,
    @Args() { categoryId }: NewMessageArgs
  ): User {
    return user
  }
  @Subscription(() => User, {
    topics: Topic.UserLeftChannel,
    filter: ({ payload, args }) => {
      return payload.category === args.categoryId
    }
  })
  userLeftChannel(
    @Root() user: User,
    @Args() { categoryId }: NewMessageArgs
  ): User {
    return user
  }
}
