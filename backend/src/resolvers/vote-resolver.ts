import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql'
import { User } from '../entities/User'
import { Vote } from '../entities/Vote'
import { ContextType } from '../types'

@Resolver(() => Vote)
export class VoteResolver {
  @FieldResolver({ nullable: true })
  async castBy(
    @Root() vote: Vote,
    @Ctx() { em }: ContextType
  ): Promise<User | null> {
    return em.findOneOrFail(User, vote.castBy.id)
  }
}
