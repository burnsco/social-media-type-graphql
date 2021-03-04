import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
  Unique
} from "@mikro-orm/core"
import { GraphQLEmail } from "graphql-custom-types"
import { Field, ObjectType } from "type-graphql"
import { Base, Message } from "./index"

@Entity()
@Unique({ properties: ["email", "username"] })
@ObjectType()
export default class User extends Base<User> {
  @Field(() => GraphQLEmail)
  @Property({ unique: true })
  email: string

  @Field(() => String)
  @Property({ unique: true })
  username: string

  @Property()
  password: string

  @Field(() => String, { nullable: true })
  @Property({ nullable: true })
  avatar?: string

  @Field(() => String, { nullable: true })
  @Property({ nullable: true })
  about?: string

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, message => message.sentBy, {
    cascade: [Cascade.ALL],
    orphanRemoval: true,
    lazy: true
  })
  messages = new Collection<Message>(this)
}
