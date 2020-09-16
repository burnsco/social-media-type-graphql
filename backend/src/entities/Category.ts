import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core"
import { Field, ObjectType } from "type-graphql"
import { BaseEntity } from "./BaseEntity"
import { ChatMessage } from "./ChatMessage"

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @Field(() => String)
  @Property({ unique: true })
  name!: string

  @Field(() => [ChatMessage], { nullable: true })
  @OneToMany(() => ChatMessage, chatmessage => chatmessage.category)
  chatMessages = new Collection<ChatMessage>(this)
}
