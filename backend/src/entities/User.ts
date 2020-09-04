import { Entity, Property } from '@mikro-orm/core'
import { Field, ObjectType } from 'type-graphql'
import { BaseEntity } from './BaseEntity'

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field({ nullable: true })
  @Property({ unique: true })
  email: string

  @Field({ nullable: true })
  @Property({ unique: true })
  username: string

  @Property()
  password: string
}
