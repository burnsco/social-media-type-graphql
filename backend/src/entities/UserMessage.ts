import { Entity, ManyToOne, OneToMany, Property } from '@mikro-orm/core'
import { Field, ObjectType } from 'type-graphql'
import { BaseEntity } from './BaseEntity'
import { User } from './User'

@Entity()
@ObjectType({ implements: BaseEntity })
export class UserMessage extends BaseEntity {
  @Field(() => String)
  @Property()
  title!: string

  @Field(() => String)
  @Property()
  body!: string

  @Field(() => User)
  @ManyToOne(() => User)
  sentBy!: User

  @Field(() => User)
  @OneToMany(() => User)
  sentTo!: User
}
