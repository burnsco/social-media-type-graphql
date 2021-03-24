import { LoadStrategy, QueryOrder } from "@mikro-orm/core"
import { Args, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql"
import CategoryArgs from "../../args/category-args"
import NewMessageArgs from "../../args/message-args"
import { Category, Message } from "../../entities"
import { ContextType } from "../../types"

@Resolver(() => Category)
export default class CategoryQueryResolver {
  @Query(() => Category)
  async category(
    @Args() { categoryId }: NewMessageArgs,
    @Ctx() { em }: ContextType
  ) {
    return await em.findOneOrFail(
      Category,
      { id: categoryId },
      {
        populate: { messages: LoadStrategy.JOINED }
      }
    )
  }

  // *** Split Query, with pagination and without *** \\
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

  @FieldResolver(() => [Message], { nullable: true })
  async messages(@Root() category: Category, @Ctx() { em }: ContextType) {
    return await em.find(Message, { category: { id: category.id } })
  }
}
