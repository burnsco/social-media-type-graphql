import { Property } from '@mikro-orm/core'
import { UserMessage } from 'src/entities/UserMessage'
import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class UserMessageInput implements Partial<UserMessage> {
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
