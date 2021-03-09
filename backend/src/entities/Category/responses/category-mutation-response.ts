import { Field, ObjectType } from "type-graphql"
import MutationResponse from "../../common/mutation-response"
import Category from "../Category"

@ObjectType()
export default class CategoryMutationResponse extends MutationResponse {
  @Field(() => Category, { nullable: true })
  category?: Category
}
