import { Cascade, Entity, ManyToOne, Property } from "@mikro-orm/core"
import { Field, Int, ObjectType } from "type-graphql"
import { Base, Post, User } from "."

@Entity()
@ObjectType()
export default class Vote extends Base<Vote> {
  @Field(() => Int)
  @Property()
  value!: number

  @Field(() => User)
  @ManyToOne(() => User)
  castBy!: User

  @ManyToOne(() => Post, {
    cascade: [Cascade.ALL]
  })
  post!: Post
}
