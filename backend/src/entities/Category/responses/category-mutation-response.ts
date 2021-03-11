import { Field, ObjectType } from "type-graphql"
import { Category } from ".."
import MutationResponse from "../../common/mutation-response"

@ObjectType()
export default class CategoryMutationResponse extends MutationResponse {
  @Field(() => Category, { nullable: true })
  category?: Category
}
