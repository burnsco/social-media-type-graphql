import { Entity, PrimaryKey, Property } from '@mikro-orm/core'
import { Field, Float, ObjectType } from 'type-graphql'

@Entity()
@ObjectType()
export abstract class BaseEntity {
  @Field(() => Float, { nullable: true })
  @PrimaryKey()
  id: number

  @Field(() => String, { nullable: true })
  @Property({ type: 'date' })
  createdAt = new Date()

  @Field(() => String, { nullable: true })
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date()
}
