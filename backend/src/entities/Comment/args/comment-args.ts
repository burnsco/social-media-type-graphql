import { ArgsType, Field, ID } from "type-graphql"

@ArgsType()
export class NewCommentsArgs {
  @Field(() => ID)
  postId: string
}
