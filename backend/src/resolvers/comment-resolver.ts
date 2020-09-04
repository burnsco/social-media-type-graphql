import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql'
import { Comment } from '../entities/Comment'
import { User } from '../entities/User'
import { ContextType } from '../types'

@Resolver(() => Comment)
export class CommentResolver {
  @FieldResolver()
  async createdBy(
    @Root() comment: Comment,
    @Ctx() { em }: ContextType
  ): Promise<User> {
    return em.findOneOrFail(User, comment.createdBy.id)
  }
}
