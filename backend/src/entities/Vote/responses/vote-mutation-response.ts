import MutationResponse from "src/entities/common/mutation-response"
import { Field, ObjectType } from "type-graphql"
import { Post, Vote } from "../../"

@ObjectType()
export default class VoteMutationResponse extends MutationResponse {
  @Field(() => Vote, { nullable: true })
  vote?: Vote

  @Field(() => Post, { nullable: true })
  post?: Post
}
