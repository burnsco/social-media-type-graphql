import { InputType, Field } from 'type-graphql'
import { Category } from '../../entities/Category'

@InputType()
export class CategoryInput implements Partial<Category> {
  @Field()
  name: string
}
