import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Category } from '../entities/Category'
import { ContextType } from '../types'
import { CategoryInput } from './inputs/category-input'
import { CategoryMutationResponse } from './response/category-response'

@Resolver(() => Category)
export class CategoryResolver {
  @Query(() => [Category], { nullable: true })
  categories(@Ctx() { em }: ContextType): Promise<Category[] | null> {
    return em.find(Category, {})
  }

  @Mutation(() => CategoryMutationResponse)
  async createCategory(
    @Arg('data') data: CategoryInput,
    @Ctx() { em }: ContextType
  ): Promise<CategoryMutationResponse> {
    const category = em.create(Category, {
      name: data.name
    })
    await em.persistAndFlush(category)
    return { category }
  }
}
