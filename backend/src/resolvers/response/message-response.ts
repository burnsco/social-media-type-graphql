import { Field, ObjectType } from 'type-graphql'
import { PrivateMessage } from '../../entities/PrivateMessage'
import { MutationResponse } from './mutation-response'

@ObjectType()
export class PrivateMessageMutationResponse extends MutationResponse {
  @Field(() => PrivateMessage)
  privateMessage?: PrivateMessage
}
