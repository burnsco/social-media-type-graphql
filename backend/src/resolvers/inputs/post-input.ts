import { InputType, Field, Int } from 'type-graphql'
import { Post } from '../../entities/Post'

@InputType()
export class PostInput implements Partial<Post> {
  @Field()
  title: string

  @Field(() => Int)
  categoryId: number
}
