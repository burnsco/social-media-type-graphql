import { QueryOrder, wrap } from "@mikro-orm/core"
import {
  Arg,
  Args,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from "type-graphql"
import Comment from "../entities/Comment"
import Post from "../entities/Post"
import User from "../entities/User"
import { ContextType } from "../types"
import { isAuth } from "../utils/isAuth"
import { PostArgs } from "./args/post-args"
import { CommentInput } from "./inputs/comment-input"
import CommentMutationResponse from "./response/mutation/comment-mutation-response"

@Resolver(() => Comment)
export class CommentResolver {
  @Mutation(() => CommentMutationResponse)
  @UseMiddleware(isAuth)
  async editComment(
    @Arg("data") { body, postId }: CommentInput,
    @Ctx() { em }: ContextType
  ): Promise<CommentMutationResponse> {
    const comment = await em.findOne(Comment, { post: { id: postId } })
    if (comment) {
      wrap(comment).assign({
        body
      })

      await em.persistAndFlush(comment)

      return {
        comment
      }
    }
    return {
      comment: undefined
    }
  }

  @Query(() => Comment, { nullable: true })
  async comment(
    @Args() { postId }: PostArgs,
    @Ctx() { em }: ContextType
  ): Promise<Comment | null> {
    return await em.findOneOrFail(Comment, { post: { id: postId } })
  }

  @Query(() => [Comment], { nullable: true })
  async comments(
    @Args() { first, skip, postId }: PostArgs,
    @Ctx() { em }: ContextType
  ): Promise<Comment[] | null> {
    const [comments] = await em.findAndCount(
      Comment,
      { post: { id: postId } },
      {
        limit: first,
        offset: skip,
        orderBy: {
          createdAt: QueryOrder.DESC
        }
      }
    )
    return comments
  }

  @FieldResolver()
  async createdBy(
    @Root() comment: Comment,
    @Ctx() { em }: ContextType
  ): Promise<User | null> {
    return await em.findOne(User, comment.createdBy.id)
  }

  @FieldResolver()
  async post(
    @Root() comment: Comment,
    @Ctx() { em }: ContextType
  ): Promise<Post | null> {
    return await em.findOne(Post, comment.post.id)
  }
}
