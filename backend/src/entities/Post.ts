import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property
} from '@mikro-orm/core'
import { ObjectType } from 'type-graphql'
import { Field } from 'type-graphql/dist/decorators/Field'
import { User } from './User'
import { BaseEntity } from './BaseEntity'
import { Vote } from './Vote'
import { Category } from './Category'
import { Comment } from './Comment'

@Entity()
@ObjectType()
export class Post extends BaseEntity {
  @Field(() => String, { nullable: true })
  @Property()
  title: string

  @Field(() => User)
  @ManyToOne(() => User)
  author: User

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category)
  category: Category

  @Field(() => [Vote], { nullable: true })
  @OneToMany(() => Vote, vote => vote.post)
  votes = new Collection<Vote>(this)

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, comment => comment.post)
  comments = new Collection<Comment>(this)
}
