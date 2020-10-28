import { Max, Min } from "class-validator"
import { ArgsType, Field, ID, Int } from "type-graphql"
import { PostOrderBy } from "../inputs/posts-order-by"

@ArgsType()
export class PostArgs {
  @Field(() => Int, { nullable: true })
  first?: number

  @Field(() => ID, { nullable: true })
  postId?: string

  @Field(() => PostOrderBy, { nullable: true })
  orderBy?: PostOrderBy

  @Field(() => String, { nullable: true })
  category?: string

  @Field(() => Int, { nullable: true })
  @Min(1)
  @Max(500)
  skip?: number

  @Field(() => String, { nullable: true })
  name?: string
}
