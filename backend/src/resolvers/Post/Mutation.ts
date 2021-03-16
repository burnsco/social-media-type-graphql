import {
  Arg,
  Ctx,
  Mutation,
  Publisher,
  PubSub,
  Resolver,
  Root,
  Subscription,
  UseMiddleware
} from "type-graphql"
import { Topic } from "../../common/topics"
import { Category, Comment, Post, User, Vote } from "../../entities"
import {
  CommentInput,
  CreatePostInput,
  EditPostInput,
  VoteInput
} from "../../inputs"
import { isAuth } from "../../lib/isAuth"
import {
  CommentMutationResponse,
  PostMutationResponse,
  VoteMutationResponse
} from "../../responses"
import { ContextType } from "../../types"

@Resolver(() => Post)
export default class PostMutationResolver {
  @Mutation(() => PostMutationResponse)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("data")
    { title, text, image, link, categoryId }: CreatePostInput,
    @Ctx() { em, req }: ContextType
  ): Promise<PostMutationResponse | null> {
    if (req.session.userId) {
      const post = em.create(Post, {
        title,
        text,
        image,
        link,
        author: em.getReference(User, req.session.userId),
        category: em.getReference(Category, categoryId)
      })
      await em.persistAndFlush(post)
      return { post }
    }
    return null
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
    const post = await em.findOneOrFail(Post, postId, {
      populate: ["comments", "votes"]
    })
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

  @Mutation(() => CommentMutationResponse)
  @UseMiddleware(isAuth)
  async createComment(
    @Arg("data") { body, postId }: CommentInput,
    @PubSub(Topic.NewComment)
    notifyAboutNewComment: Publisher<Partial<Comment>>,
    @Ctx() { em, req }: ContextType
  ): Promise<CommentMutationResponse | null | boolean> {
    const post = await em.findOne(Post, postId, {
      populate: ["comments"]
    })

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

  @Mutation(() => VoteMutationResponse)
  @UseMiddleware(isAuth)
  async vote(
    @Arg("data") { postId, value }: VoteInput,
    @PubSub(Topic.NewVote)
    notifyAboutNewVote: Publisher<Partial<Vote>>,
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

      await notifyAboutNewVote({
        id: vote.id,
        post: vote.post,
        value: vote.value,
        castBy: vote.castBy
      })

      await em.flush()

      return {
        vote,
        post
      }
    }
    return null
  }

  //******************* \\
  // SUBSCRIPTION STUFF \\
  // ****************** \\

  @Subscription(() => Comment, {
    topics: Topic.NewComment
  })
  newComments(@Root() newComment: Comment): Comment {
    return newComment
  }

  @Subscription(() => Vote, {
    topics: Topic.NewVote
  })
  newVotes(@Root() newVote: Vote): Vote {
    return newVote
  }
}
