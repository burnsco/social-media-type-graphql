import { Cascade, Entity, ManyToOne, Property } from "@mikro-orm/core"
import { Field, ObjectType } from "type-graphql"
import { Base, Category, User } from "."

@Entity()
@ObjectType()
export default class Message extends Base<Message> {
  @Field(() => String)
  @Property()
  content!: string

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: "cascade" })
  sentBy!: User

  @Field(() => Category)
  @ManyToOne(() => Category, { cascade: [Cascade.ALL] })
  category!: Category
}
