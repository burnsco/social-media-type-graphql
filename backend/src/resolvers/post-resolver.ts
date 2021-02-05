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
import { Category } from "../entities/Category"
import { Comment } from "../entities/Comment"
import { Post } from "../entities/Post"
import { User } from "../entities/User"
import { ContextType } from "../types"
import { isAuth } from "../utils/isAuth"
import { Vote } from "./../entities/Vote"
import { PostArgs } from "./args/post-args"
import { _QueryMeta } from "./args/_QueryMeta"
import { CommentInput } from "./inputs/comment-input"
import { CreatePostInput, EditPostInput } from "./inputs/post-input"
import { VoteInput } from "./inputs/vote-input"
import { CommentMutationResponse } from "./response/comment-response"
import { PostMutationResponse } from "./response/post-response"
import { VoteMutationResponse } from "./response/vote-response"

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
    return await em.findOne(Post, { id: postId })
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
    { title, text, image, video, link, categoryId }: CreatePostInput,
    @Ctx() { em, req }: ContextType
  ): Promise<PostMutationResponse | null> {
    if (req.session.userId) {
      const post = em.create(Post, {
        title,
        text,
        image,
        video,
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
    { title, text, image, video, link, postId, categoryId }: EditPostInput,
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
      if (video) {
        wrap(post).assign({
          video
        })
      }
      if (link) {
        wrap(post).assign({
          link
        })
      }

      await em.persistAndFlush(post)

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
    @Ctx() { em, req }: ContextType
  ): Promise<CommentMutationResponse | null> {
    const post = await em.findOne(Post, postId, {
      populate: ["comments"]
    })

    if (post && req.session.userId) {
      const comment = em.create(Comment, {
        post,
        body: body,
        createdBy: em.getReference(User, req.session.userId)
      })

      post.comments.add(comment)

      await em.persistAndFlush(post)

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
    @Ctx() { em, req }: ContextType
  ): Promise<VoteMutationResponse | null> {
    const post = await em.findOne(Post, postId, {
      populate: ["votes"]
    })

    if (!post) {
      return null
    }

    if (req.session.userId) {
      const vote = em.create(Vote, {
        post,
        value,
        castBy: em.getReference(User, req.session.userId)
      })

      post.votes.add(vote)

      await em.persistAndFlush(post)

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
