import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql"
import { subRedditNameInUse } from "../../common/constants"
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
}
