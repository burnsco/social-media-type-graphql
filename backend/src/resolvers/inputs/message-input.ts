import { Property } from '@mikro-orm/core'
import { Field, InputType, Int } from 'type-graphql'
import { Message } from '../../entities/Message'

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
