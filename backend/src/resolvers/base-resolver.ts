import { Arg, ClassType, Int, Query, Resolver } from 'type-graphql'

function createBaseResolver<T extends ClassType>(
  suffix: string,
  objectTypeCls: T
) {
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    protected items: T[] = []

    @Query(() => [objectTypeCls], { name: `getAll${suffix}` })
    async getAll(@Arg('first', () => Int) first: number): Promise<T[]> {
      return this.items.slice(0, first)
    }
  }

  return BaseResolver
}

export default createBaseResolver
