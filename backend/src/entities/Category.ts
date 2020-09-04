import { Entity, Property } from '@mikro-orm/core'
import { Field, ObjectType } from 'type-graphql'
import { BaseEntity } from './BaseEntity'

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @Field(() => String, { nullable: true})
  @Property({ unique: true })
  name: string
}
