import { Field, ObjectType } from 'type-graphql'
import { Post } from '../../entities/Post'
import { PageInfo } from '../pagination-object'
import { MutationResponse } from './mutation-response'

@ObjectType()
export class PostMutationResponse extends MutationResponse {
  @Field(() => Post, { nullable: true })
  post?: Post

  pageInfo?: PageInfo
}
