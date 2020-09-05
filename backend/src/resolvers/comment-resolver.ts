import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql'
import { Comment } from '../entities/Comment'
import { User } from '../entities/User'
import { ContextType } from '../types'

@Resolver(() => Comment)
export class CommentResolver {
  @FieldResolver({ nullable: true })
  async createdBy(
    @Root() comment: Comment,
    @Ctx() { em }: ContextType
  ): Promise<User | null> {
    return await em.findOneOrFail(User, comment.createdBy.id)
  }
}
