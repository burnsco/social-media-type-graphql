import { Field, Int, ObjectType } from "type-graphql"
import { MutationResponse } from "../resolvers/response"
import { Post, Vote } from "../Base/index"

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
