import { Property } from '@mikro-orm/core'
import { Field, InputType, Int } from 'type-graphql'
import { PrivateMessage } from '../../entities/PrivateMessage'

@InputType()
export class PrivateMessageInput implements Partial<PrivateMessage> {
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
