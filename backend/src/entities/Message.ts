import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { Field, ObjectType } from 'type-graphql'
import { BaseEntity } from './BaseEntity'
import { User } from './User'

@Entity()
@ObjectType()
export class Message extends BaseEntity {
  @Field(() => String)
  @Property()
  title!: string

  @Field(() => String)
  @Property()
  body!: string

  @Field(() => String)
  @Property()
  status!: string

  @Field(() => User)
  @ManyToOne(() => User)
  sentBy!: User

  @Field(() => User)
  @ManyToOne(() => User)
  sentTo!: User
}
