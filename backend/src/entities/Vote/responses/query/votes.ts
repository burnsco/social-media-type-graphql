import { Field, Int, ObjectType } from "type-graphql"
import { Vote } from "../.."
import MutationResponse from "../../../common/mutation-response"

@ObjectType()
export default class VotesQueryResponse extends MutationResponse {
  @Field(() => [Vote], { nullable: true })
  votes?: Vote[]

  @Field(() => Int, { nullable: true })
  count?: number
}
