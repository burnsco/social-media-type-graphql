import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root
} from 'type-graphql'
import { Category } from '../entities/Category'
import { Comment } from '../entities/Comment'
import { Post } from '../entities/Post'
import { User } from '../entities/User'
import { Vote } from '../entities/Vote'
import { ContextType } from '../types'
import { capitalizeFirstLetter } from '../utils/capitalize'
import { CommentInput } from './inputs/comment-input'
import { PostInput } from './inputs/post-input'
import { VoteInput } from './inputs/vote-input'
import { CommentMutationResponse } from './response/comment-response'
import { PostMutationResponse } from './response/post-response'
import { VoteMutationResponse } from './response/vote-response'

@Resolver(() => Post)
export class PostResolver {
  @Query(() => Post, { nullable: true })
  post(
    @Arg('postId') postId: number,
    @Ctx() { em }: ContextType
  ): Promise<Post | null> {
    return em.findOne(Post, postId)
  }

  @Query(() => [Post], { nullable: true })
  async posts(@Ctx() { em }: ContextType): Promise<Post[] | null> {
    const posts = await em.find(Post, {})
    return posts
  }

  @Query(() => [Post], { nullable: true })
  async postsByCategory(
    @Ctx() { em }: ContextType,
    @Arg('category') category: string
  ): Promise<Post[] | null> {
    const posts = await em.find(Post, {
      category: { name: capitalizeFirstLetter(category) }
    })
    return posts
  }

  @Mutation(() => PostMutationResponse)
  async createPost(
    @Arg('data') { title, categoryId }: PostInput,
    @Ctx() { em, req }: ContextType
  ): Promise<PostMutationResponse> {
    const post = em.create(Post, {
      title,
      author: em.getReference(User, req.session.userId),
      category: em.getReference(Category, categoryId)
    })

    await em.persistAndFlush(post)

    return {
      post
    }
  }

  @Mutation(() => CommentMutationResponse)
  async createComment(
    @Arg('data') { body, postId }: CommentInput,
    @Ctx() { em, req }: ContextType
  ): Promise<CommentMutationResponse> {
    const post = await em.findOne(Post, postId, {
      populate: ['comments']
    })

    if (!post) {
      throw new Error('Invalid post ID')
    }

    const comment = em.create(Comment, {
      post,
      body: body,
      createdBy: em.getReference(User, req.session.userId)
    })
    post.comments.add(comment)

    await em.persistAndFlush(post)

    return {
      comment
    }
  }

  @Mutation(() => VoteMutationResponse)
  async vote(
    @Arg('data') { postId, value }: VoteInput,
    @Ctx() { em, req }: ContextType
  ): Promise<VoteMutationResponse> {
    const post = await em.findOne(Post, postId, {
      populate: ['votes']
    })

    if (!post) {
      throw new Error('Invalid post ID')
    }

    const vote = em.create(Vote, {
      post,
      value,
      castBy: em.getReference(User, req.session.userId)
    })

    post.votes.add(vote)

    await em.persistAndFlush(post)

    return {
      vote
    }
  }

  @FieldResolver({ nullable: true })
  async comments(@Root() post: Post, @Ctx() { em }: ContextType) {
    return await em.find(Comment, { post: { id: post.id } })
  }
  @FieldResolver({ nullable: true })
  async votes(@Root() post: Post, @Ctx() { em }: ContextType) {
    return await em.find(Vote, { post: { id: post.id } })
  }
  @FieldResolver({ nullable: true })
  async author(
    @Root() post: Post,
    @Ctx() { em }: ContextType
  ): Promise<User | null> {
    return await em.findOneOrFail(User, post.author.id)
  }
  @FieldResolver({ nullable: true })
  async category(
    @Root() post: Post,
    @Ctx() { em }: ContextType
  ): Promise<Category | null> {
    return await em.findOneOrFail(Category, post.category.id)
  }
}
