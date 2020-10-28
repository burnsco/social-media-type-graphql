import { BaseEntity, Entity, PrimaryKey, Property } from "@mikro-orm/core"
import { Field, ID, ObjectType } from "type-graphql"
import { v4 } from "uuid"

@Entity()
@ObjectType({ isAbstract: true })
export abstract class Base<T extends { id: string }> extends BaseEntity<
  T,
  "id"
> {
  @Field(() => ID)
  @PrimaryKey({ type: "uuid" })
  id: string = v4()

  @Field(() => String)
  @Property({ type: "date" })
  createdAt: Date = new Date()

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date()
}
