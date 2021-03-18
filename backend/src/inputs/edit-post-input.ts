import { Field, InputType, Int } from "type-graphql"
import { Post } from "../entities"

@InputType()
export default class EditPostInput implements Partial<Post> {
  @Field(() => Int)
  postId: number

  @Field(() => Int, { nullable: true })
  categoryId?: number

  @Field(() => String, { nullable: true })
  title?: string

  @Field(() => String, { nullable: true })
  text?: string

  @Field(() => String, { nullable: true })
  image?: string

  @Field(() => String, { nullable: true })
  link?: string
}
