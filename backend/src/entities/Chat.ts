import { Entity, ManyToOne, OneToMany, Property } from '@mikro-orm/core'
import { Field, ObjectType } from 'type-graphql'
import { BaseEntity } from './BaseEntity'
import { Category } from './Category'
import { User } from './User'

@Entity()
@ObjectType()
export class Chat extends BaseEntity {
  @Field(() => String)
  @Property()
  text!: string

  @Field(() => User)
  @ManyToOne(() => User)
  sentBy!: User

  @Field(() => Category)
  @OneToMany(() => Category)
  Category!: Category
}
