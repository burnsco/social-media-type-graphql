import {
  Cascade,
  Entity,
  LoadStrategy,
  ManyToOne,
  Property
} from "@mikro-orm/core"
import { Field, ObjectType } from "type-graphql"
import { User } from "."
import Base from "./BaseEntity"

@Entity()
@ObjectType()
export default class PrivateMessage extends Base {
  @Field()
  @Property()
  body!: string

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: "cascade", strategy: LoadStrategy.JOINED })
  sentBy!: User

  @Field(() => User)
  @ManyToOne(() => User, {
    cascade: [Cascade.ALL],
    strategy: LoadStrategy.JOINED
  })
  sentTo!: User
}
