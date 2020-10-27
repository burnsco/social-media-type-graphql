import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property
} from "@mikro-orm/core"
import { ObjectType } from "type-graphql"
import { Field } from "type-graphql/dist/decorators/Field"
import { BaseEntity } from "./BaseEntity"
import { Category } from "./Category"
import { Comment } from "./Comment"
import { User } from "./User"
import { Vote } from "./Vote"

@Entity()
@ObjectType()
export class Post extends BaseEntity {
  @Field(() => String, { nullable: true })
  @Property({ nullable: true })
  title: string

  @Field(() => String, { nullable: true })
  @Property({ nullable: true })
  text?: string

  @Field(() => String, { nullable: true })
  @Property({ nullable: true })
  link?: string

  @Field(() => String, { nullable: true })
  @Property({ nullable: true })
  image?: string

  @Field(() => String, { nullable: true })
  @Property({ nullable: true })
  video?: string

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: "cascade" })
  author: User

  @Field(() => Category)
  @ManyToOne(() => Category, { onDelete: "cascade" })
  category: Category

  @Field(() => [Vote], { nullable: true })
  @OneToMany(() => Vote, vote => vote.post, {
    cascade: [Cascade.ALL],
    orphanRemoval: true
  })
  votes = new Collection<Vote>(this)

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, comment => comment.post, {
    cascade: [Cascade.ALL],
    orphanRemoval: true
  })
  comments = new Collection<Comment>(this)
}
