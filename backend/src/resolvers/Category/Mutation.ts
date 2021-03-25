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
import { subRedditNameInUse } from "../../common/constants"
import { Topic } from "../../common/topics"
import { Category } from "../../entities"
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

  @Subscription(() => Category, {
    topics: Topic.NewCategory
  })
  newCategory(@Root() newCategory: Category): Category {
    return newCategory
  }
}
