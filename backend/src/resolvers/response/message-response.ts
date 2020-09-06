import { Field, ObjectType } from 'type-graphql'
import { UserMessage } from '../../entities/UserMessage'
import { MutationResponse } from './mutation-response'

@ObjectType()
export class UserMessageMutationResponse extends MutationResponse {
  @Field(() => UserMessage)
  userMessage?: UserMessage
}
