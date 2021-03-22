import { Field, ID, InputType } from "type-graphql"
import { Post } from "../entities"

@InputType()
export default class CreatePostInput implements Partial<Post> {
  @Field(() => ID)
  categoryId: number

  @Field(() => String)
  title: string

  @Field(() => String, { nullable: true })
  text?: string

  @Field(() => String, { nullable: true })
  image?: string

  @Field(() => String, { nullable: true })
  link?: string

  @Field(() => String, { nullable: true })
  imageH?: string

  @Field(() => String, { nullable: true })
  imageW?: string
}
