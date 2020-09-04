import { Min, Max } from 'class-validator'
import { Field, Int, ArgsType } from 'type-graphql'

@ArgsType()
export class PostArgs {
  @Field(() => Int, { nullable: true })
  postId?: number

  @Field(() => Int, { defaultValue: 0 })
  @Min(0)
  skip: number

  @Field(() => Int)
  @Min(1)
  @Max(50)
  take = 3

  // helpers - index calculations
  get startIndex(): number {
    return this.skip
  }
  get endIndex(): number {
    return this.skip + this.take
  }
}
