import { ArgsType, Field, ID } from "type-graphql"

@ArgsType()
export class NewMessageArgs {
  @Field(() => ID, { nullable: true })
  userId: string | undefined
}
