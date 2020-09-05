import { Entity, Property, ManyToOne } from '@mikro-orm/core'
import { ObjectType, Field } from 'type-graphql'
import { BaseEntity } from './BaseEntity'
import { User } from './User'
import { Post } from './Post'

@Entity()
@ObjectType()
export class Comment extends BaseEntity {
  @Field(() => String)
  @Property()
  body!: string

  @Field(() => User)
  @ManyToOne(() => User)
  createdBy!: User

  @ManyToOne(() => Post)
  post!: Post
}
