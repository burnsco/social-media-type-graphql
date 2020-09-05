import { ObjectType, Field } from 'type-graphql'
import { Comment } from '../../entities/Comment'
import { MutationResponse } from './mutation-response'

@ObjectType()
export class CommentMutationResponse extends MutationResponse {
  @Field(() => Comment, { nullable: true })
  comment?: Comment
}
