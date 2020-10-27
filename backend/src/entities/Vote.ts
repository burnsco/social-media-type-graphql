import { Cascade, Entity, ManyToOne, Property } from "@mikro-orm/core"
import { Field, Int, ObjectType } from "type-graphql"
import { BaseEntity } from "./BaseEntity"
import { Post } from "./Post"
import { User } from "./User"

@Entity()
@ObjectType()
export class Vote extends BaseEntity {
  @Field(() => Int)
  @Property()
  value: number

  @Field(() => User)
  @ManyToOne(() => User)
  castBy: User

  @ManyToOne(() => Post, {
    cascade: [Cascade.ALL]
  })
  post: Post
}
