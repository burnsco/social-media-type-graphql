import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property
} from "@mikro-orm/core"
import { Field, ObjectType } from "type-graphql"
import { Base, Message } from "."

@Entity()
@ObjectType()
export default class Category extends Base<Category> {
  @Field()
  @Property({ unique: true })
  name: string

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, message => message.category, {
    cascade: [Cascade.ALL],
    orphanRemoval: true,
    lazy: true
  })
  messages = new Collection<Message>(this)
}
