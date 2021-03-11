import { Field, Int, ObjectType } from "type-graphql"
import { Post, Vote } from "../../.."
import MutationResponse from "../../../common/mutation-response"

@ObjectType()
export class VoteMutationResponse extends MutationResponse {
  @Field(() => Vote, { nullable: true })
  vote?: Vote

  @Field(() => Post, { nullable: true })
  post?: Post
}

@ObjectType()
export class VotesQueryResponse extends MutationResponse {
  @Field(() => [Vote], { nullable: true })
  votes?: Vote[]

  @Field(() => Int, { nullable: true })
  count?: number
}
