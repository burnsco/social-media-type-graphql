import { ObjectType, Field } from 'type-graphql'
import { User } from '../../entities/User'
import { MutationResponse } from './mutation-response'

@ObjectType()
export class UserMutationResponse extends MutationResponse {
  @Field(() => User, { nullable: true })
  user?: User
}
