import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property
} from "@mikro-orm/core"
import { GraphQLEmail } from "graphql-custom-types"
import { Field, ID, ObjectType } from "type-graphql"
import PrivateMessage from "./PrivateMessage"

@Entity()
@ObjectType()
export default class User {
  @Field(() => ID)
  @PrimaryKey()
  readonly id: number

  @Field(() => String)
  @Property()
  createdAt: string = new Date().toISOString()

  @Field(() => String)
  @Property({ onUpdate: () => new Date().toISOString() })
  updatedAt: string = new Date().toISOString()

  @Field(() => Boolean, { defaultValue: false })
  @Property()
  online!: boolean

  @Field(() => GraphQLEmail)
  @Property()
  email!: string

  @Field(() => String)
  @Property({ unique: true })
  username!: string

  @Property()
  password!: string

  @Field(() => String, { nullable: true })
  @Property({ nullable: true })
  avatar?: string

  @Field(() => String, { nullable: true })
  @Property({ nullable: true })
  about?: string

  @Field(() => [User])
  @ManyToMany(() => User)
  friends = new Collection<User>(this)

  @Field(() => [PrivateMessage])
  @ManyToMany(() => PrivateMessage)
  privateMessages = new Collection<PrivateMessage>(this)
}

export enum UserRole {
  ADMIN = "admin",
  USER = "user"
}

export const enum UserStatus {
  ONLINE,
  OFFLINE
}
