import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class QueryResponse {
  @Field()
  code!: string
  @Field()
  message!: string
  @Field()
  success!: boolean
}
