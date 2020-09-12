import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql'
import { User } from '../entities/User'
import { Vote } from '../entities/Vote'
import { ContextType } from '../types'

@Resolver(() => Vote)
export class VoteResolver {
  @FieldResolver()
  async castBy(@Root() vote: Vote, @Ctx() { em }: ContextType): Promise<User> {
    return em.findOneOrFail(User, vote.castBy.id)
  }
}
