import { Field, ObjectType } from "type-graphql"
import { Post } from "../../"

@ObjectType()
export default class PostsQueryResponse {
  @Field(() => [Post], { nullable: true })
  posts: Post[]
}
