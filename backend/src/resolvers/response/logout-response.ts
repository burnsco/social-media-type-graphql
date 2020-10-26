import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class LogoutMutationResponse {
  @Field(() => String, { nullable: true })
  message?: string
  @Field(() => String, { nullable: true })
  success?: boolean
}
