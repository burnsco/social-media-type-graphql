import {
  Cascade,
  Entity,
  LoadStrategy,
  ManyToOne,
  Property
} from "@mikro-orm/core"
import { Field, Int, ObjectType } from "type-graphql"
import { Post, User } from "."
import Base from "./BaseEntity"

@Entity()
@ObjectType()
export default class Vote extends Base {
  @Field(() => Int)
  @Property()
  value!: number

  @Field(() => User)
  @ManyToOne(() => User)
  castBy!: User

  @ManyToOne(() => Post, {
    cascade: [Cascade.ALL],
    strategy: LoadStrategy.JOINED
  })
  post!: Post
}
