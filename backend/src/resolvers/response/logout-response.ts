import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class LogoutMutationResponse {
  @Field()
  message!: string
  @Field()
  success!: boolean
}
