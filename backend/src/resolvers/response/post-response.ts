import { ObjectType, Field } from 'type-graphql'
import { Post } from '../../entities/Post'
import { MutationResponse } from './mutation-response'

@ObjectType()
export class PostMutationResponse extends MutationResponse {
  @Field(() => Post, { nullable: true })
  post?: Post
}
