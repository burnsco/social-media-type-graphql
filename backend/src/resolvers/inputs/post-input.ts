import { Field, InputType, Int, registerEnumType } from "type-graphql"
import { Post } from "../../entities/Post"

export enum PostType {
  LINK = "link",
  NORMAL = "normal",
  MEDIA = "media",
}

registerEnumType(PostType, {
  name: "PostType",
})

@InputType()
export class PostInput implements Partial<Post> {
  @Field(() => PostType)
  type!: PostType

  @Field(() => Int)
  categoryId!: number

  @Field(() => String)
  title!: string
}

@InputType()
export class NormalPostInput extends PostInput {
  @Field(() => String, { nullable: true })
  text?: string
}

@InputType()
export class MediaPostInput extends PostInput {
  @Field(() => String, { nullable: true })
  image?: string

  @Field(() => String, { nullable: true })
  video?: string
}

@InputType()
export class LinkPostInput extends PostInput {
  @Field(() => String)
  link!: string
}
