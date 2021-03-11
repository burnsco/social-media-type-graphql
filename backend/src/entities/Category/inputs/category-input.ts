import { MaxLength } from "class-validator"
import { Field, InputType } from "type-graphql"
import { Category } from "../"

@InputType()
export class CategoryInput implements Partial<Category> {
  @Field(() => String)
  @MaxLength(15)
  name: string
}
