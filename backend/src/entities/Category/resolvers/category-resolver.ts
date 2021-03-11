import { QueryOrder } from "@mikro-orm/core"
import {
  Arg,
  Args,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from "type-graphql"
import { Category } from ".."
import { isAuth } from "../../../lib/isAuth"
import { ContextType } from "../../../types"
import { subRedditNameInUse } from "../../common/constants"
import { CategoryArgs } from "../args/category-args"
import { CategoryInput } from "../inputs/category-input"
import CategoryMutationResponse from "../responses/category-mutation-response"

@Resolver(() => Category)
export class CategoryResolver {
  @Query(() => [Category], { nullable: true })
  async categories(
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
