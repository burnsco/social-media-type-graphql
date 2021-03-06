import { Field, ObjectType } from "type-graphql"
import { Message, User } from "../../../entities/index"
import MutationResponse from "../mutation/mutation-response"

@ObjectType()
export class UserMutationResponse extends MutationResponse {
  @Field(() => User, { nullable: true })
  user?: User

  @Field(() => Message, { nullable: true })
  message?: Message
}
