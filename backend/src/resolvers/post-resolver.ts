import { Post } from '../entities/Post'
import { ContextType } from '../types'
import {
  Resolver,
  Query,
  Ctx,
  Mutation,
  FieldResolver,
  Root,
  Args
} from 'type-graphql'
import { PostInput } from './inputs/post-input'
import { User } from '../entities/User'
import { VoteInput } from './inputs/vote-input'
import { Vote } from '../entities/Vote'
import { Category } from '../entities/Category'
import { CommentInput } from './inputs/comment-input'
import { Comment } from '../entities/Comment'
import { PostArgs } from './args/post-args'

@Resolver(() => Post)
export class PostResolver {
  @Query(() => Post, { nullable: true })
  post(@Args() postId: number, @Ctx() { em }: ContextType) {
    return em.findOne(Post, postId)
  }

  @Query(() => [Post], { nullable: true })
  async posts(
    @Args() { startIndex, endIndex }: PostArgs,
    @Ctx() { em }: ContextType
  ): Promise<Post[] | null> {
    const posts = await em.find(Post, {})
    return posts.slice(startIndex, endIndex)
  }

  @Mutation(() => Post)
  async createPost(
    @Args() { title, categoryId }: PostInput,
    @Ctx() { em, req }: ContextType
  ): Promise<Post> {
    const post = em.create(Post, {
      title,
      author: em.getReference(User, req.session.userId),
      category: em.getReference(Category, categoryId)
    })
    await em.persistAndFlush(post)
    return post
  }

  @Mutation(() => Post)
  async createComment(
    @Args() { body, postId }: CommentInput,
    @Ctx() { em, req }: ContextType
  ): Promise<Post> {
    const post = await em.findOne(Post, postId, {
      populate: ['comments']
    })
    if (!post) {
      throw new Error('Invalid post ID')
    }
    const newComment = em.create(Comment, {
      post,
      body: body,
      createdBy: em.getReference(User, req.session.userId)
    })
    post.comments.add(newComment)
    await em.persistAndFlush(post)
    return post
  }

  @Mutation(() => Post)
  async vote(
    @Args() { postId, value }: VoteInput,
    @Ctx() { em, req }: ContextType
  ): Promise<Post> {
    const post = await em.findOne(Post, postId, {
      populate: ['votes']
    })
    if (!post) {
      throw new Error('Invalid post ID')
    }
    const newVote = em.create(Vote, {
      post,
      value,
      castBy: em.getReference(User, req.session.userId)
    })
    post.votes.add(newVote)
    await em.persistAndFlush(post)
    return post
  }

  @FieldResolver({ nullable: true })
  comments(@Root() post: Post, @Ctx() { em }: ContextType) {
    return em.find(Comment, { post: { id: post.id } })
  }
  @FieldResolver({ nullable: true })
  votes(@Root() post: Post, @Ctx() { em }: ContextType) {
    return em.find(Vote, { post: { id: post.id } })
  }
  @FieldResolver({ nullable: true })
  author(@Root() post: Post, @Ctx() { em }: ContextType): Promise<User> {
    return em.findOneOrFail(User, post.author.id)
  }
  @FieldResolver({ nullable: true })
  category(@Root() post: Post, @Ctx() { em }: ContextType): Promise<Category> {
    return em.findOneOrFail(Category, post.category.id)
  }
}
