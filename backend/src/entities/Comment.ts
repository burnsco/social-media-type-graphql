import { Entity, ManyToOne, Property } from "@mikro-orm/core"
import { Field, ObjectType } from "type-graphql"
import { BaseEntity } from "./BaseEntity"
import { Post } from "./Post"
import { User } from "./User"

@Entity()
@ObjectType()
export class Comment extends BaseEntity {
  @Field(() => String)
  @Property()
  body: string;

  @Field(() => User)
  @ManyToOne(() => User)
  createdBy: User;

  @Field(() => Post)
  @ManyToOne(() => Post)
  post: Post;
}
