import { Property } from '@mikro-orm/core'
import { PrivateMessage } from 'src/entities/PrivateMessage'
import { Field, InputType, Int } from 'type-graphql'

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
