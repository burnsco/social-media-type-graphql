import { Max, Min } from 'class-validator'
import { ArgsType, Field, Int } from 'type-graphql'
import { PostOrderBy } from '../inputs/posts-order-by'

@ArgsType()
export class PostArgs {
  @Field(() => Int, { nullable: true })
  @Min(0)
  first?: number

  @Field(() => PostOrderBy, { nullable: true })
  orderBy?: PostOrderBy

  @Field(() => String, { nullable: true })
  category?: string

  @Field(() => Int, { nullable: true })
  @Min(1)
  @Max(500)
  skip?: number
}
