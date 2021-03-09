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
import { subRedditNameInUse } from "../../constants"
import { Category } from "../Base/index"
import { ContextType } from "../../types"
import { isAuth } from "../../utils/isAuth"
import { CategoryArgs } from "./category-args"
import { CategoryInput } from "./category-input"
import CategoryMutationResponse from "./category-mutation-response"

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