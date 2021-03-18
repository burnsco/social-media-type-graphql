import { Collection, Entity, ManyToMany, Property } from "@mikro-orm/core"
import { GraphQLEmail } from "graphql-custom-types"
import { Field, ObjectType } from "type-graphql"
import Base from "./BaseEntity"
import PrivateMessage from "./PrivateMessage"

@Entity()
@ObjectType()
export default class User extends Base {
  @Field(() => GraphQLEmail)
  @Property({ unique: true })
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
