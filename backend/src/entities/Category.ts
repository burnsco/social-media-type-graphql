import {
  Cascade,
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  Property
} from "@mikro-orm/core"
import { Field, ObjectType } from "type-graphql"
import { Base, Message, User } from "."

@Entity()
@ObjectType()
export default class Category extends Base<Category> {
  @Field()
  @Property({ unique: true })
  name: string

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User)
  users: [User]

  @Field(() => [Message], { nullable: true})
  @OneToMany(() => Message, message => message.category, {
    cascade: [Cascade.ALL],
    orphanRemoval: true
  })
  messages = new Collection<Message>(this)
}
