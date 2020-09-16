import { Entity, PrimaryKey, Property } from "@mikro-orm/core"
import { Field, Int, ObjectType } from "type-graphql"

@Entity()
@ObjectType()
export abstract class BaseEntity {
  @Field(() => Int)
  @PrimaryKey()
  id!: number

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date()

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date()
}
