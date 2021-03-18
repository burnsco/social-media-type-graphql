import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property
} from "@mikro-orm/core"
import { Field, ObjectType } from "type-graphql"
import { Message } from "."
import Base from "./BaseEntity"

@Entity()
@ObjectType()
export default class Category extends Base {
  @Field()
  @Property({ unique: true, length: 20 })
  name: string

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, message => message.category, {
    cascade: [Cascade.ALL],
    orphanRemoval: true,
    lazy: true
  })
  messages = new Collection<Message>(this)
}
