import {
  Cascade,
  Entity,
  IdentifiedReference,
  ManyToOne,
  Property
} from "@mikro-orm/core"
import { Field, ObjectType } from "type-graphql"
import { Base, User } from "./index"

@Entity()
@ObjectType()
export default class Message extends Base<Message> {
  @Field(() => String)
  @Property()
  content: string

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: "cascade" })
  sentBy: User

  @Field(() => User)
  @ManyToOne(() => User, { cascade: [Cascade.ALL] })
  sentTo: IdentifiedReference<User>
}
