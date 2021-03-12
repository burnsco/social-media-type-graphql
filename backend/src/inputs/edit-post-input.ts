import { Field, ID, InputType } from "type-graphql"
import { Post } from "../entities"

@InputType()
export default class EditPostInput implements Partial<Post> {
  @Field(() => ID)
  postId: string

  @Field(() => ID, { nullable: true })
  categoryId?: string

  @Field(() => String, { nullable: true })
  title?: string

  @Field(() => String, { nullable: true })
  text?: string

  @Field(() => String, { nullable: true })
  image?: string

  @Field(() => String, { nullable: true })
  link?: string
}
