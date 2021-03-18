import {
  Cascade,
  Entity,
  LoadStrategy,
  ManyToOne,
  Property
} from "@mikro-orm/core"
import { Field, ObjectType } from "type-graphql"
import { Post, User } from "."
import Base from "./BaseEntity"

@Entity()
@ObjectType()
export default class Comment extends Base {
  @Field(() => String)
  @Property()
  body: string

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: "cascade", strategy: LoadStrategy.JOINED })
  createdBy: User

  @Field(() => Post)
  @ManyToOne(() => Post, {
    cascade: [Cascade.ALL],
    strategy: LoadStrategy.JOINED
  })
  post: Post
}
