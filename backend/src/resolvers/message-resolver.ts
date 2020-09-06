import { PrivateMessage } from 'src/entities/PrivateMessage'
import { User } from 'src/entities/User'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { ContextType } from '../types'
import { PrivateMessageInput } from './inputs/message-input'
import { PrivateMessageMutationResponse } from './response/message-response'
import { UserMutationResponse } from './response/user-response'

@Resolver(() => PrivateMessage)
export class UserMessageResolver {
  @Query(() => [PrivateMessage], { nullable: true })
  async messages(@Ctx() { em, req }: ContextType): Promise<PrivateMessage[]> {
    return await em.find(PrivateMessage, { sentBy: { id: req.session.userId } })
  }

  @Mutation(() => UserMutationResponse)
  async sendMessage(
    @Arg('data') data: PrivateMessageInput,
    @Ctx() { em, req }: ContextType
  ): Promise<PrivateMessageMutationResponse> {
    const privateMessage = em.create(PrivateMessage, {
      title: data.title,
      body: data.body,
      sentBy: em.getReference(User, req.session.userId),
      sentTo: data.targetUserId
    })

    await em.persistAndFlush(privateMessage)

    return {
      privateMessage
    }
  }
}
