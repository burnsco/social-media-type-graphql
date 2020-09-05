import { Entity, Property } from '@mikro-orm/core'
import { Field, ObjectType } from 'type-graphql'
import { BaseEntity } from './BaseEntity'

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field()
  @Property({ unique: true })
  email!: string

  @Field()
  @Property({ unique: true })
  username!: string

  @Property()
  password!: string
}
