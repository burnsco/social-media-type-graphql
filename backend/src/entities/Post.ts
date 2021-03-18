import {
  Cascade,
  Collection,
  Entity,
  LoadStrategy,
  ManyToOne,
  OneToMany,
  Property
} from "@mikro-orm/core"
import { ObjectType } from "type-graphql"
import { Field } from "type-graphql/dist/decorators/Field"
import { Category, Comment, User, Vote } from "."
import Base from "./BaseEntity"

@Entity()
@ObjectType()
export default class Post extends Base {
  @Field(() => String)
  @Property()
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
  imageH?: string

  @Field(() => String, { nullable: true })
  @Property({ nullable: true })
  imageW?: string

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: "cascade", strategy: LoadStrategy.JOINED })
  author: User

  @Field(() => Category)
  @ManyToOne(() => Category, {
    onDelete: "cascade",
    strategy: LoadStrategy.JOINED
  })
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
    orphanRemoval: true,
    lazy: true
  })
  comments = new Collection<Comment>(this)
}
