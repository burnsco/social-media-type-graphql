import { Entity, Property } from "@mikro-orm/core"
import { Field, ObjectType } from "type-graphql"
import { BaseEntity } from "./BaseEntity"

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => String)
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
