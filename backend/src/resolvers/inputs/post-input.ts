import { Field, ID, InputType } from "type-graphql"
import { Post } from "../../entities/Post"

@InputType()
export class PostInput implements Partial<Post> {
  @Field(() => ID)
  categoryId: number

  @Field(() => String, { nullable: true })
  title?: string

  @Field({ nullable: true })
  text?: string

  @Field({ nullable: true })
  image?: string

  @Field({ nullable: true })
  video?: string

  @Field({ nullable: true })
  link?: string
}

@InputType()
export class PostIdInput {
  @Field(() => ID)
  postId: number
}
