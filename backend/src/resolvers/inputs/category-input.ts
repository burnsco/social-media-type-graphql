import { MaxLength } from "class-validator"
import { Field, InputType } from "type-graphql"
import { Category } from "../../entities/Category"

@InputType()
export class CategoryInput implements Partial<Category> {
  @Field(() => String)
  @MaxLength(15)
  name: string
}
