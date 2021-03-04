import { QueryOrder, wrap } from "@mikro-orm/core"
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
  ResolverFilterData,
  Root,
  Subscription,
  UseMiddleware
} from "type-graphql"
import { Category, Comment, Post, User, Vote } from "../entities/index"
import { ContextType } from "../types"
import { isAuth } from "../utils/isAuth"
import { PostArgs } from "./args/post-args"
import { _QueryMeta } from "./args/_QueryMeta"
import { Topic } from "./enums/topics"
import { CommentInput } from "./inputs/comment-input"
import { CreatePostInput, EditPostInput } from "./inputs/post-input"
import { VoteInput } from "./inputs/vote-input"
import CommentMutationResponse from "./response/mutation/comment-mutation-response"
import PostMutationResponse from "./response/mutation/post-mutation-response"
import { VoteMutationResponse } from "./response/query/vote-response"

@Resolver(() => Post)
export class PostResolver {
  @Query(() => _QueryMeta)
  async _allPostsMeta(@Root() @Ctx() { em }: ContextType) {
    const [, count] = await em.findAndCount(Post, {})
    return { count }
  }

  @Query(() => _QueryMeta)
  async _categoryPostsMeta(
    @Root() posts: Post,
    @Args() { name }: PostArgs,
    @Ctx()
    { em }: ContextType
  ) {
    console.log(posts)
    const [, count] = await em.findAndCount(Post, {
      category: { name: name }
    })
    return { count }
  }

  @Query(() => Post, { nullable: true })
  async post(
    @Args() { postId }: PostArgs,
    @Ctx() { em }: ContextType
  ): Promise<Post | null> {
    return await em.findOne(Post, { id: postId }, ["comments"])
  }

  @Query(() => [Post], { nullable: true })
  async posts(
    @Args() { first, skip, category, orderBy }: PostArgs,
    @Ctx() { em }: ContextType
  ): Promise<Post[] | null> {
    if (category) {
      const [posts] = await em.findAndCount(
        Post,
        { category: { name: category } },
        {
          limit: first,
          offset: skip,
          orderBy: {
            createdAt: orderBy === "asc" ? QueryOrder.ASC : QueryOrder.DESC
          }
        }
      )
      return posts
    }

    const [posts] = await em.findAndCount(
      Post,
      {},
      {
        limit: first,
        offset: skip,
        orderBy: {
          createdAt: orderBy === "asc" ? QueryOrder.ASC : QueryOrder.DESC
        }
      }
    )
    return posts
  }

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
      await em.flush()
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
    const errors = []
    const post = await em.findOne(Post, { id: postId })

    if (post) {
      if (categoryId) {
        wrap(post).assign({
          category: em.getReference(Category, categoryId)
        })
      }
      if (title) {
        wrap(post).assign({
          title
        })
      }
      if (text) {
        wrap(post).assign({
          text
        })
      }
      if (image) {
        wrap(post).assign({
          image
        })
      }

      if (link) {
        wrap(post).assign({
          link
        })
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
    const post = await em.findOne(Post, postId, {
      populate: ["comments", "votes"]
    })

    if (post?.author.id === req.session.userId) {
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

  @FieldResolver(() => _QueryMeta, { nullable: true })
  async totalComments(@Root() post: Post, @Ctx() { em }: ContextType) {
    const [, count] = await em.findAndCount(Comment, { post: { id: post.id } })
    return { count }
  }

  @FieldResolver(() => _QueryMeta, { nullable: true })
  async totalVotes(@Root() post: Post, @Ctx() { em }: ContextType) {
    const [votes, count] = await em.findAndCount(Vote, {
      post: { id: post.id }
    })
    if (count > 0) {
      const score = votes.map(item => item.value).reduce((a, b) => a + b)

      return { count, score }
    }
    return { count }
  }

  // SUBSCRIPTION STUFF
  // *********************

  // ---------COMMENTS--------------
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  @Subscription(() => Comment, {
    topics: Topic.NewComment,
    filter: ({ payload, args }: ResolverFilterData<Comment, PostArgs>) => {
      return payload.post.id === args.postId
    }
  })
  newComments(
    @Root() newComment: Comment,
    @Args() { postId }: PostArgs
  ): Comment {
    console.log(postId)
    return newComment
  }

  // ---------VOTES--------------
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  @Subscription(() => Vote, {
    topics: Topic.NewVote
  })
  newVotes(@Root() newVote: Vote): Vote {
    return newVote
  }

  @FieldResolver({ nullable: true })
  async comments(@Root() post: Post, @Ctx() { em }: ContextType) {
    return await em.find(Comment, { post: { id: post.id } })
  }

  @FieldResolver({ nullable: true })
  async votes(@Root() post: Post, @Ctx() { em }: ContextType) {
    return await em.find(Vote, { post: { id: post.id } })
  }

  @FieldResolver()
  async author(@Root() post: Post, @Ctx() { em }: ContextType): Promise<User> {
    return await em.findOneOrFail(User, post.author.id)
  }

  @FieldResolver()
  async category(
    @Root() post: Post,
    @Ctx() { em }: ContextType
  ): Promise<Category> {
    return await em.findOneOrFail(Category, post.category.id)
  }
}
