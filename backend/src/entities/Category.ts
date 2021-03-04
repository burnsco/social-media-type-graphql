import { Entity, Filter, Property } from "@mikro-orm/core"
import { Field, ObjectType } from "type-graphql"
import { Base } from "./index"

@Entity()
@Filter({
  name: "filterBy",
  cond: async (args, type) => {
    if (type === "update") {
      return {} // do not apply when updating
    }

    return { name: args.name }
  }
})
@ObjectType()
export default class Category extends Base<Category> {
  @Field()
  @Property({ unique: true })
  name: string
}
