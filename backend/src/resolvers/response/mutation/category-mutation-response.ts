import { Field, ObjectType } from "type-graphql"
import { Category } from "../../../entities/index"
import MutationResponse from "./mutation-response"

@ObjectType()
export default class CategoryMutationResponse extends MutationResponse {
  @Field(() => Category, { nullable: true })
  category?: Category
}
