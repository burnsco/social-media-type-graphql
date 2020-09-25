import { Ctx, FieldResolver, Resolver, Root } from "type-graphql"
import { Comment } from "../entities/Comment"
import { Post } from "../entities/Post"
import { User } from "../entities/User"
import { ContextType } from "../types"

@Resolver(() => Comment)
export class CommentResolver {
  @FieldResolver()
  async createdBy(
    @Root() comment: Comment,
    @Ctx() { em }: ContextType
  ): Promise<User> {
    return await em.findOneOrFail(User, comment.createdBy.id)
  }
  @FieldResolver()
  async post(
    @Root() comment: Comment,
    @Ctx() { em }: ContextType
  ): Promise<Post> {
    return await em.findOneOrFail(Post, comment.post.id)
  }
}
