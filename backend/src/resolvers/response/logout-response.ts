import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class LogoutMutationResponse {
  @Field()
  message!: string
  @Field()
  success!: boolean
}
