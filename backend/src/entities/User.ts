import { Entity, Property } from "@mikro-orm/core"
import { GraphQLEmail } from "graphql-custom-types"
import { Field, ObjectType } from "type-graphql"
import { Base } from "./Base"

@Entity()
@ObjectType()
export class User extends Base<User> {
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
}
