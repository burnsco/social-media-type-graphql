import { Field, ObjectType } from 'type-graphql'
import { Message } from '../../entities/Message'
import { MutationResponse } from './mutation-response'

@ObjectType()
export class MessageMutationResponse extends MutationResponse {
  @Field(() => Message)
  message?: Message
}
