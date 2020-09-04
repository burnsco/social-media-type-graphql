import { ArgsType, Field, Int } from 'type-graphql'

@ArgsType()
export class PaginationArgs {
  @Field(() => Int)
  skip: number = 0

  @Field(() => Int)
  take: number = 5
}
