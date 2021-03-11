import {
  Cascade,
  Collection,
  Entity,
  Enum,
  ManyToMany,
  OneToMany,
  Property,
  Unique
} from "@mikro-orm/core"
import { GraphQLEmail } from "graphql-custom-types"
import { Field, ObjectType } from "type-graphql"
import { Message } from ".."
import { Base } from "../Base"

enum Role {
  USER = "user",
  ADMIN = "admin"
}

enum UserStatus {
  ONLINE = "online",
  OFFLINE = "offline"
}

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

  @Enum({ items: () => Role, array: true, default: [Role.USER] })
  @Field(() => [String])
  roles: Role[] = [Role.USER]

  @Field(() => [String])
  @Enum({ items: () => UserStatus, array: true, default: [UserStatus.OFFLINE] })
  status: UserStatus

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User)
  friends = new Collection<User>(this)

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, message => message.sentBy, {
    cascade: [Cascade.ALL],
    orphanRemoval: true
  })
  messages = new Collection<Message>(this)
}
