import { Field, ObjectType } from 'type-graphql'
import { Category } from '../../entities/Category'
import { MutationResponse } from './mutation-response'

@ObjectType()
export class CategoryMutationResponse extends MutationResponse {
  @Field(() => Category, { nullable: true })
  category?: Category
}
