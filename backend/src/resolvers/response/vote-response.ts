import { ObjectType, Field } from 'type-graphql'
import { Vote } from '../../entities/Vote'
import { MutationResponse } from './mutation-response'

@ObjectType()
export class VoteMutationResponse extends MutationResponse {
  @Field(() => Vote, { nullable: true })
  vote?: Vote
}
