import { Cascade, Entity, ManyToOne, Property } from "@mikro-orm/core"
import { Field, ObjectType } from "type-graphql"
import { Base, User } from "."

@Entity()
@ObjectType()
export default class PrivateMessage extends Base<PrivateMessage> {
  @Field(() => String)
  @Property()
  body: string

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: "cascade" })
  sentBy: User

  @Field(() => User)
  @ManyToOne(() => User, { cascade: [Cascade.ALL] })
  sentTo: User
}
