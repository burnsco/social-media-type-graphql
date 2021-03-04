import { Field, ID, InputType } from "type-graphql"
import { Post } from "../../entities/index"

@InputType()
export class CreatePostInput implements Partial<Post> {
  @Field(() => ID)
  categoryId: string

  @Field(() => String)
  title: string

  @Field(() => String, { nullable: true })
  text?: string

  @Field(() => String, { nullable: true })
  image?: string

  @Field(() => String, { nullable: true })
  link?: string
}

@InputType()
export class CreateRegularPost implements Partial<Post> {
  @Field(() => ID)
  categoryId: string

  @Field(() => String)
  title: string
}

@InputType()
export class CreateLinkPost implements Partial<Post> {
  @Field(() => ID)
  categoryId: string

  @Field(() => String)
  title: string

  @Field(() => String)
  link: string
}

@InputType()
export class CreateMediaPost implements Partial<Post> {
  @Field(() => ID)
  categoryId: string

  @Field(() => String)
  title: string

  @Field(() => String)
  image?: string
}

@InputType()
export class EditPostInput implements Partial<Post> {
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

@InputType()
export class PostIdInput {
  @Field(() => ID)
  postId: string
}
