import { Entity, Property, ManyToOne } from '@mikro-orm/core'
import { ObjectType, Field } from 'type-graphql'
import { BaseEntity } from './BaseEntity'
import { User } from './User'
import { Post } from './Post'

@Entity()
@ObjectType()
export class Vote extends BaseEntity {
  @Field({ nullable: true })
  @Property({ type: 'smallint' })
  value!: number

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  castBy!: User

  @ManyToOne(() => Post)
  post!: Post
}
