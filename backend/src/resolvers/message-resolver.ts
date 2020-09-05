import { Message } from 'src/entities/Message'
import { User } from 'src/entities/User'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { ContextType } from '../types'
import { MessageInput } from './inputs/message-input'
import { MessageMutationResponse } from './response/message-response'
import { UserMutationResponse } from './response/user-response'

@Resolver(() => Message)
export class MessageResolver {
  @Query(() => [Message], { nullable: true })
  async messages(@Ctx() { em, req }: ContextType): Promise<Message[]> {
    return await em.find(Message, { sentBy: { id: req.session.userId } })
  }

  @Mutation(() => UserMutationResponse)
  async sendMessage(
    @Arg('data') data: MessageInput,
    @Ctx() { em, req }: ContextType
  ): Promise<MessageMutationResponse> {
    const message = em.create(Message, {
      title: data.title,
      body: data.body,
      sentBy: em.getReference(User, req.session.userId),
      sentTo: data.targetUserId
    })

    await em.persistAndFlush(message)

    return {
      message
    }
  }
}
