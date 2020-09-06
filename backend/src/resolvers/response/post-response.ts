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
  @Field(() => [Post], { nullable: true })
  posts?: Post[]

  @Field(() => Int, { nullable: true })
  offset?: number

  @Field(() => Int, { nullable: true })
  totalPosts?: number
}
