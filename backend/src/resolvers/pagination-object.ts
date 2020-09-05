import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class PageInfo {
  @Field()
  startCursor?: number

  @Field()
  endCursor?: number

  @Field()
  hasNextPage?: boolean
}
