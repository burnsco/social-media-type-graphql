import { Field, ObjectType } from "type-graphql"
import { Post } from "../../"

@ObjectType()
export default class PostQueryResponse {
  @Field(() => Post, { nullable: true })
  post: Post
}
