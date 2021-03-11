import { Entity, Property } from "@mikro-orm/core"
import { Field, ObjectType } from "type-graphql"
import { Base } from "../Base"

@Entity()
@ObjectType()
export default class Category extends Base<Category> {
  @Field()
  @Property({ unique: true })
  name: string
}
