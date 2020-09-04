import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class MutationResponse {
  @Field()
  code!: string
  @Field()
  message!: string
  @Field()
  success!: boolean
}
