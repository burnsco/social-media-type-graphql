import { QueryOrder } from "@mikro-orm/core"
import {
  Arg,
  Args,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql"
import { invalidPostOrId } from "../constants"
import { Category } from "../entities/Category"
import { Comment } from "../entities/Comment"
import { Post } from "../entities/Post"
import { User } from "../entities/User"
import { Vote } from "../entities/Vote"
import { ContextType } from "../types"
import { PostArgs } from "./args/post-args"
import { _QueryMeta } from "./args/_QueryMeta"
import { CommentInput } from "./inputs/comment-input"
import { PostInput } from "./inputs/post-input"
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
    @Args() data: PostArgs,
    @Ctx()
    { em }: ContextType
  ) {
    console.log(posts)
    const [, count] = await em.findAndCount(Post, {
      category: { name: data.name },
    })
    return { count }
  }

  @Query(() => Post, { nullable: true })
  post(@Args() data: PostArgs, @Ctx() { em }: ContextType) {
    if (data.postId) {
      return em.findOne(Post, data.postId)
    }
    return null
  }

  @Query(() => [Post], { nullable: false })
  async posts(
    @Args() data: PostArgs,
    @Ctx() { em }: ContextType
  ): Promise<Post[] | null> {
    if (data.category) {
      const [posts] = await em.findAndCount(
        Post,
        { category: { name: data.category } },
        {
          limit: data.first,
          offset: data.skip,
          orderBy: {
            createdAt:
              data.orderBy === "asc" ? QueryOrder.ASC : QueryOrder.DESC,
          },
        }
      )
      return posts
    }
    const [posts] = await em.findAndCount(
      Post,
      {},
      {
        limit: data.first,
        offset: data.skip,
        orderBy: {
          createdAt: data.orderBy === "asc" ? QueryOrder.ASC : QueryOrder.DESC,
        },
      }
    )
    return posts
  }

  @Query(() => [Post], { nullable: false })
  async postsByCategory(
    @Args() data: PostArgs,
    @Ctx() { em }: ContextType
  ): Promise<Post[] | null> {
    const [posts] = await em.findAndCount(
      Post,
      { category: { name: data.category } },
      {
        limit: data.first,
        offset: data.skip,
        orderBy: {
          createdAt: data.orderBy === "asc" ? QueryOrder.ASC : QueryOrder.DESC,
        },
      }
    )
    return posts
  }

  @Mutation(() => PostMutationResponse)
  async createPost(
    @Arg("data") data: PostInput,
    @Ctx() { em, req }: ContextType
  ): Promise<PostMutationResponse> {
    console.log(data)
    const post = em.create(Post, {
      title: data.title,
      text: data.text,
      image: data.image,
      video: data.video,
      link: data.link,
      author: em.getReference(User, req.session.userId),
      category: em.getReference(Category, data.categoryId),
    })

    await em.persistAndFlush(post)

    return {
      post,
    }
  }

  @Mutation(() => CommentMutationResponse)
  async createComment(
    @Arg("data") { body, postId }: CommentInput,
    @Ctx() { em, req }: ContextType
  ): Promise<CommentMutationResponse> {
    const post = await em.findOne(Post, postId, {
      populate: ["comments"],
    })

    if (!post) {
      return invalidPostOrId
    }

    const comment = em.create(Comment, {
      post,
      body: body,
      createdBy: em.getReference(User, req.session.userId),
    })
    post.comments.add(comment)

    await em.persistAndFlush(post)

    return {
      comment,
    }
  }

  @Mutation(() => VoteMutationResponse)
  async vote(
    @Arg("data") { postId, value }: VoteInput,
    @Ctx() { em, req }: ContextType
  ): Promise<VoteMutationResponse> {
    const post = await em.findOne(Post, postId, {
      populate: ["votes"],
    })

    if (!post) {
      return invalidPostOrId
    }

    const vote = em.create(Vote, {
      post,
      value,
      castBy: em.getReference(User, req.session.userId),
    })

    post.votes.add(vote)

    await em.persistAndFlush(post)

    return {
      vote,
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
