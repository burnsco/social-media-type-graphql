import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql"
import { Comment, Post, User } from "../../entities"
import { CommentInput } from "../../inputs"
import { isAuth } from "../../lib/isAuth"
import { CommentMutationResponse } from "../../responses"
import { ContextType } from "../../types"

@Resolver(() => Comment)
export default class CommentMutationResolver {
  @Mutation(() => CommentMutationResponse)
  @UseMiddleware(isAuth)
  async createComment(
    @Arg("data") { body, postId }: CommentInput,

    @Ctx() { em, req }: ContextType
  ): Promise<CommentMutationResponse> {
    const post = await em.findOneOrFail(Post, postId, {
      populate: ["comments"]
    })

    if (!post) {
      return {
        errors: [{ field: "Post", message: "Post Not Found!" }]
      }
    }

    const comment = em.create(Comment, {
      post: em.getReference(Post, post.id),
      body,
      createdBy: em.getReference(User, req.session.userId)
    })

    post.comments.add(comment)

    await em.persistAndFlush(post)

    return {
      post,
      comment
    }
  }

  @Mutation(() => CommentMutationResponse)
  @UseMiddleware(isAuth)
  async editComment(
    @Arg("data") { body, postId }: CommentInput,
    @Ctx() { em }: ContextType
  ): Promise<CommentMutationResponse | null> {
    const post = await em.findOneOrFail(Post, postId)
    const comment = await em.findOneOrFail(Comment, { post: { id: postId } })
    if (!comment) {
      return null
    }
    comment.body = body
    await em.flush()
    return {
      post,
      comment
    }
  }
}
