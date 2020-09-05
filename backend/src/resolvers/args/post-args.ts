import { Max, Min } from 'class-validator'
import { ArgsType, Field, Int } from 'type-graphql'

@ArgsType()
export class PostArgs {
  @Field(() => Int, { defaultValue: 0 })
  @Min(0)
  offset: number

  @Field(() => Int, { defaultValue: 5 })
  @Min(1)
  @Max(50)
  limit: number

  // helpers - index calculations
  get startIndex(): number {
    return this.offset
  }
  get endIndex(): number {
    return this.offset + this.limit
  }
}
