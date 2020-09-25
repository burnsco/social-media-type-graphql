import { Entity, Property } from "@mikro-orm/core"
import { ObjectType, Field } from "type-graphql"
import { BaseEntity } from "./BaseEntity"

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @Field(() => String)
  @Property({ unique: true })
  name: string
}
