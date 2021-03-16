import { QueryOrder } from "@mikro-orm/core"
import {
  Arg,
  Args,
  Ctx,
  FieldResolver,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from "type-graphql"
import { PostArgs } from "../args"
import { Topic } from "../common/topics"
import { Comment, Post, User } from "../entities"
import { CommentInput } from "../inputs"
import { isAuth } from "../lib/isAuth"
import { CommentMutationResponse } from "../responses"
import { ContextType } from "../types"

@Resolver(() => Comment)
export default class CommentResolver {
  @Mutation(() => CommentMutationResponse)
  @UseMiddleware(isAuth)
  async createComment(
    @Arg("data") { body, postId }: CommentInput,
    @PubSub(Topic.NewComment)
    notifyAboutNewComment: Publisher<Partial<Comment>>,
    @Ctx() { em, req }: ContextType
  ): Promise<CommentMutationResponse | null | boolean> {
    const post = await em.findOneOrFail(Post, postId)

    if (post && req.session.userId) {
      const comment = em.create(Comment, {
        post,
        body,
        createdBy: em.getReference(User, req.session.userId)
      })
      post.comments.add(comment)
      await notifyAboutNewComment({
        id: comment.id,
        post: comment.post,
        body: comment.body,
        createdBy: comment.createdBy
      })
      await em.flush()

      return {
        post,
        comment
      }
    }
    return null
  }

  @Mutation(() => CommentMutationResponse)
  @UseMiddleware(isAuth)
  async editComment(
    @Arg("data") { body, postId }: CommentInput,
    @Ctx() { em }: ContextType
  ): Promise<CommentMutationResponse> {
    const comment = await em.findOne(Comment, { post: { id: postId } })
    if (comment) {
      comment.assign({
        body
      })
      await em.flush()
      return {
        comment
      }
    }

    return {
      comment: undefined
    }
  }

  @Query(() => Comment)
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
