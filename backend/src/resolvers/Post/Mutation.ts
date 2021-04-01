import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql"
import { Category, Post, User, Vote } from "../../entities"
import { CreatePostInput, EditPostInput, VoteInput } from "../../inputs"
import { isAuth } from "../../lib/isAuth"
import { PostMutationResponse, VoteMutationResponse } from "../../responses"
import { ContextType } from "../../types"

@Resolver(() => Post)
export default class PostMutationResolver {
  @Mutation(() => PostMutationResponse)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("data")
    { title, text, image, link, categoryId, imageH, imageW }: CreatePostInput,
    @Ctx() { em, req }: ContextType
  ): Promise<PostMutationResponse> {
    const category = await em.findOne(Category, { id: categoryId })
    if (!category) {
      return {
        errors: [
          {
            field: "title",
            message: "there was an error finding that category"
          }
        ]
      }
    }
    const post = em.create(Post, {
      title,
      text,
      image,
      imageH,
      imageW,
      link,
      author: em.getReference(User, req.session.userId),
      category: em.getReference(Category, category.id)
    })
    await em.persistAndFlush(post)
    return { post }
  }

  @Mutation(() => PostMutationResponse)
  @UseMiddleware(isAuth)
  async editPost(
    @Arg("data")
    { title, text, image, link, postId, categoryId }: EditPostInput,
    @Ctx() { em }: ContextType
  ): Promise<PostMutationResponse> {
    // #TODO optimize this later
    const errors = []
    const post = await em.findOneOrFail(Post, { id: postId })
    if (post) {
      if (categoryId) {
        post.category = em.getReference(Category, categoryId)
      }
      if (title) {
        post.title = title
      }
      if (text) {
        post.text = text
      }
      if (image) {
        post.image = image
      }
      if (link) {
        post.link = link
      }
      await em.flush()

      return {
        post
      }
    }
    errors.push({
      field: "title",
      message: "post not found"
    })
    return {
      errors
    }
  }

  @Mutation(() => PostMutationResponse)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg("data") { postId }: EditPostInput,
    @Ctx() { em, req }: ContextType
  ): Promise<PostMutationResponse | boolean> {
    const post = await em.findOneOrFail(
      Post,
      { id: postId },
      {
        populate: ["comments", "votes"]
      }
    )
    if (post && post.author.id === req.session.userId) {
      if (post && post.comments) {
        post.comments.removeAll()
        if (post.votes) {
          post.votes.removeAll()
        }
        em.removeAndFlush(post)
        return {
          post
        }
      }
      return false
    }
    return false
  }

  @Mutation(() => VoteMutationResponse)
  @UseMiddleware(isAuth)
  async vote(
    @Arg("data") { postId, value }: VoteInput,

    @Ctx() { em, req }: ContextType
  ): Promise<VoteMutationResponse | null> {
    const post = await em.findOne(Post, postId, {
      populate: ["votes"]
    })
    if (post && req.session.userId) {
      const vote = em.create(Vote, {
        post,
        value,
        castBy: em.getReference(User, req.session.userId)
      })
      post.votes.add(vote)

      await em.flush()

      return {
        vote,
        post
      }
    }
    return null
  }
}
