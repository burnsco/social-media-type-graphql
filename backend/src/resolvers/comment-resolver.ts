import { QueryOrder } from "@mikro-orm/core"
import {
  Arg,
  Args,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root
} from "type-graphql"
import { Comment } from "../entities/Comment"
import { Post } from "../entities/Post"
import { User } from "../entities/User"
import { ContextType } from "../types"
import { PostArgs } from "./args/post-args"
import { CommentInput } from "./inputs/comment-input"
import { CommentMutationResponse } from "./response/comment-response"

@Resolver(() => Comment)
export class CommentResolver {
  @Mutation(() => CommentMutationResponse)
  async editComment(
    @Arg("data") { body, postId }: CommentInput,
    @Ctx() { em }: ContextType
  ): Promise<CommentMutationResponse> {
    const comment = await em.findOne(Comment, { post: { id: postId } })
    if (comment) {
      comment.body = body

      await em.flush()

      return {
        comment
      }
    }
    return {
      comment: undefined
    }
  }

  @Mutation(() => CommentMutationResponse)
  async deleteComment(
    @Arg("data") { postId }: CommentInput,
    @Ctx() { em }: ContextType
  ): Promise<CommentMutationResponse> {
    const comment = await em.findOne(Comment, { post: { id: postId } })
    if (comment) {
      em.removeAndFlush

      return {
        comment
      }
    }
    return {
      comment: undefined
    }
  }

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
