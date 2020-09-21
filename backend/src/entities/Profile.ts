import { Entity, Property } from "@mikro-orm/core"
import { Field, ObjectType } from "type-graphql"

@Entity()
@ObjectType()
export class UserProfile {
  @Field()
  @Property()
  firstName?: string

  @Field()
  @Property()
  lastName?: string

  @Field()
  @Property()
  avatar?: string

  @Field()
  @Property()
  sex?: string

  @Field()
  @Property()
  country?: string

  @Field()
  @Property()
  about?: string

  @Field()
  @Property()
  joined?: string

  @Field()
  @Property()
  subscribed?: string

  @Field()
  @Property()
  friends?: string

  @Field()
  @Property()
  status?: string
}
