import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from "type-graphql"
import { Category } from "../entities/Category"
import { ContextType } from "../types"
import { isAuth } from "../utils/isAuth"
import { CategoryInput } from "./inputs/category-input"
import { CategoryMutationResponse } from "./response/category-response"

@Resolver(() => Category)
export class CategoryResolver {
  @Query(() => [Category])
  categories(@Ctx() { em }: ContextType): Promise<Category[]> {
    return em.find(Category, {})
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

    errors.push({
      field: "name",
      message: "title/name is already in use."
    })

    return {
      errors
    }
  }
}
