import {
  Cascade,
  Entity,
  LoadStrategy,
  ManyToOne,
  Property
} from "@mikro-orm/core"
import { Field, ObjectType } from "type-graphql"
import { Category, User } from "."
import Base from "./BaseEntity"

@Entity()
@ObjectType()
export default class Message extends Base {
  @Field()
  @Property()
  content: string

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: "cascade", strategy: LoadStrategy.JOINED })
  sentBy: User

  @Field(() => Category)
  @ManyToOne(() => Category, {
    cascade: [Cascade.ALL],
    strategy: LoadStrategy.JOINED
  })
  category: Category
}
