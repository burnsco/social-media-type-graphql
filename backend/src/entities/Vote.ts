import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { Field, ObjectType } from 'type-graphql'
import { BaseEntity } from './BaseEntity'
import { Post } from './Post'
import { User } from './User'

@Entity()
@ObjectType({ implements: BaseEntity })
export class Vote extends BaseEntity {
  @Field()
  @Property({ type: 'smallint' })
  value!: number

  @Field(() => User)
  @ManyToOne(() => User)
  castBy!: User

  @ManyToOne(() => Post)
  post!: Post
}
