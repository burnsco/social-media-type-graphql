import { QueryOrder } from "@mikro-orm/core"
import { Args, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql"
import { Comment } from "../entities/Comment"
import { Post } from "../entities/Post"
import { User } from "../entities/User"
import { ContextType } from "../types"
import { PostArgs } from "./args/post-args"

@Resolver(() => Comment)
export class CommentResolver {
  @Query(() => [Comment], { nullable: true })
  async comments(
    @Args() { first, skip, orderBy, postId }: PostArgs,
    @Ctx() { em }: ContextType
  ): Promise<Comment[] | null> {
    // TODO pagination
    const [comments] = await em.findAndCount(
      Comment,
      { post: { id: postId } },
      {
        limit: first,
        offset: skip,
        orderBy: {
          createdAt: orderBy === "asc" ? QueryOrder.ASC : QueryOrder.DESC
        }
      }
    )
    return comments
  }

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
