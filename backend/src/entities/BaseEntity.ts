import { Entity, PrimaryKey, Property } from "@mikro-orm/core"
import { Field, ID, ObjectType } from "type-graphql"

@Entity()
@ObjectType({ isAbstract: true })
export default abstract class Base {
  @Field(() => ID)
  @PrimaryKey()
  readonly id: number

  @Field(() => String)
  @Property()
  createdAt: string = new Date().toISOString()

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date().toISOString() })
  updatedAt: string = new Date().toISOString()
}
