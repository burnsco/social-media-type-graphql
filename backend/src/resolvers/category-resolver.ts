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
import { CategoryArgs } from "../args/"
import { subRedditNameInUse } from "../common/constants"
import { Category } from "../entities"
import { CategoryInput } from "../inputs"
import { isAuth } from "../lib/isAuth"
import { CategoryMutationResponse } from "../responses/"
import { ContextType } from "../types"

@Resolver(() => Category)
export default class CategoryResolver {
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
