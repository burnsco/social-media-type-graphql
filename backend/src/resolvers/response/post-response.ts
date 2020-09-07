import { Field, Int, ObjectType } from 'type-graphql'
import { Post } from '../../entities/Post'
import { MutationResponse } from './mutation-response'

@ObjectType()
export class PostMutationResponse extends MutationResponse {
  @Field(() => Post, { nullable: true })
  post?: Post
}

@ObjectType()
export class PostsQueryResponse {
  @Field(() => [Post])
  posts: Post[]

  @Field(() => Int)
  offset: number

  @Field(() => Int)
  totalPosts: number
}
