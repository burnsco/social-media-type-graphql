import { ContextType } from '../types'
import { Resolver, Query, Arg, Ctx, Mutation } from 'type-graphql'
import { Category } from '../entities/Category'
import { CategoryInput } from './inputs/category-input'

@Resolver(() => Category)
export class CategoryResolver {
  @Query(() => [Category], { nullable: true })
  categories(@Ctx() { em }: ContextType): Promise<Category[] | null> {
    return em.find(Category, {})
  }
  @Mutation(() => Category)
  async createCategory(
    @Arg('data') data: CategoryInput,
    @Ctx() { em }: ContextType
  ): Promise<Category> {
    const category = em.create(Category, {
      name: data.name
    })
    await em.persistAndFlush(category)
    return category
  }
}
