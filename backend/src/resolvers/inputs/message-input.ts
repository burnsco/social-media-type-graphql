import { Property } from "@mikro-orm/core"
import { Message } from "src/entities/Message"
import { InputType, Field, Int } from "type-graphql"

@InputType()
export class MessageInput implements Partial<Message> {
  @Field(() => String)
  @Property()
  title!: string

  @Field(() => String)
  @Property()
  body!: string

  @Field(() => Int)
  @Property()
  targetUserId!: number
}
