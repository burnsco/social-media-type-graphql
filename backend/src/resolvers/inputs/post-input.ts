import { Field, InputType, Int } from "type-graphql"
import { Post } from "../../entities/Post"

@InputType()
export class PostInput implements Partial<Post> {
  @Field(() => Int)
  categoryId!: number

  @Field()
  title: string

  @Field({ nullable: true })
  text?: string

  @Field({ nullable: true })
  image?: string

  @Field({ nullable: true })
  video?: string

  @Field({ nullable: true })
  link?: string
}
