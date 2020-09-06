import { User } from 'src/entities/User'
import { UserMessage } from 'src/entities/UserMessage'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { ContextType } from '../types'
import { MessageInput } from './inputs/message-input'
import { UserMessageMutationResponse } from './response/message-response'
import { UserMutationResponse } from './response/user-response'

@Resolver(() => UserMessage)
export class UserMessageResolver {
  @Query(() => [UserMessage], { nullable: true })
  async messages(@Ctx() { em, req }: ContextType): Promise<UserMessage[]> {
    return await em.find(UserMessage, { sentBy: { id: req.session.userId } })
  }

  @Mutation(() => UserMutationResponse)
  async sendMessage(
    @Arg('data') data: MessageInput,
    @Ctx() { em, req }: ContextType
  ): Promise<UserMessageMutationResponse> {
    const userMessage = em.create(UserMessage, {
      title: data.title,
      body: data.body,
      sentBy: em.getReference(User, req.session.userId),
      sentTo: data.targetUserId
    })

    await em.persistAndFlush(userMessage)

    return {
      userMessage
    }
  }
}
