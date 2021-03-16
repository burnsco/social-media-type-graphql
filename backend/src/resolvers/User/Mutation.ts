import argon2 from "argon2"
import {
  Arg,
  Args,
  Ctx,
  Mutation,
  Publisher,
  PubSub,
  Resolver,
  ResolverFilterData,
  Root,
  Subscription,
  UseMiddleware
} from "type-graphql"
import PrivateMessageArgs from "../../args/private-message-args"
import {
  COOKIE_NAME,
  emailInUse,
  emailOrPasswordIsIncorrect,
  usernameInUse
} from "../../common/constants"
import { Topic } from "../../common/topics"
import { initializeLogger } from "../../config"
import { User } from "../../entities"
import PrivateMessage from "../../entities/PrivateMessage"
import { EditUserInput, LoginInput, RegisterInput } from "../../inputs"
import PrivateMessageInput from "../../inputs/private-message-input"
import { isAuth } from "../../lib/isAuth"
import {
  UserLogoutMutationResponse,
  UserMutationResponse
} from "../../responses"
import { ContextType } from "../../types"

const { logger } = initializeLogger()

@Resolver(() => User)
export default class UserMutationResolver {
  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") data: EditUserInput,
    @Ctx() { em }: ContextType
  ): Promise<boolean> {
    const user = await em.findOne(User, { email: data.email })
    if (user) {
      return true
    }
    return false
  }

  @Mutation(() => UserMutationResponse)
  async register(
    @Arg("data") { email, username, password }: RegisterInput,
    @PubSub(Topic.NewUser)
    notifyAboutNewUser: Publisher<Partial<User>>,
    @Ctx() { em, req }: ContextType
  ): Promise<UserMutationResponse | null | boolean> {
    const errors = []
    const isUserTaken = await em.findOne(User, { username: username })
    const isEmailTaken = await em.findOne(User, { email: email })

    if (isUserTaken || isEmailTaken) {
      if (isUserTaken) {
        errors.push(usernameInUse)
      }
      if (isEmailTaken) {
        errors.push(emailInUse)
      }
      return {
        errors
      }
    }

    const user = em.create(User, {
      email,
      username,
      password: await argon2.hash(password)
    })

    em.persist(user)

    await notifyAboutNewUser(user)
    await em.flush()

    req.session.userId = user.id

    return {
      user
    }
  }

  @Mutation(() => UserMutationResponse)
  @UseMiddleware(isAuth)
  async editUser(
    @Arg("data") data: EditUserInput,
    @Ctx() { em, req }: ContextType
  ): Promise<UserMutationResponse> {
    const user = await em.findOneOrFail(User, { id: req.session.userId })

    if (data.username) {
      user.assign({
        username: data.username
      })
    }
    if (data.about) {
      user.assign({
        about: data.about
      })
    }
    if (data.email) {
      user.assign({
        email: data.email
      })
    }
    if (data.password) {
      user.assign({
        password: await argon2.hash(data.password)
      })
    }
    if (data.avatar) {
      user.assign({
        avatar: data.avatar
      })
    }

    await em.persistAndFlush(user)

    return {
      user
    }
  }

  @Mutation(() => UserMutationResponse)
  @UseMiddleware(isAuth)
  async addFriend(
    @Arg("data") data: EditUserInput,
    @Ctx() { em, req }: ContextType
  ): Promise<UserMutationResponse> {
    const me = await em.findOneOrFail(
      User,
      { id: req.session.userId },
      { populate: ["friends"] }
    )
    const user = await em.findOneOrFail(User, { username: data.username })

    if (me && user) {
      me.friends.add(user)
    }

    await em.persistAndFlush(user)

    return {
      user: me
    }
  }

  @Mutation(() => PrivateMessage)
  @UseMiddleware(isAuth)
  async sendPrivateMessage(
    @Arg("data") { body, userId }: PrivateMessageInput,
    @PubSub(Topic.NewPrivateMessage)
    notifyAboutNewMessage: Publisher<Partial<PrivateMessage>>,
    @Ctx() { em, req }: ContextType
  ): Promise<PrivateMessage | null> {
    const user = await em.findOneOrFail(User, req.session.userId, [
      "privateMessages"
    ])
    const receipent = await em.findOneOrFail(User, userId, ["privateMessages"])

    if (user && receipent && req.session.userId) {
      const message = em.create(PrivateMessage, {
        body,
        sentBy: em.getReference(User, user.id),
        sentTo: em.getReference(User, receipent.id)
      })
      user.privateMessages.add(message)
      receipent.privateMessages.add(message)

      await notifyAboutNewMessage({
        id: message.id,
        body: message.body,
        sentBy: message.sentBy,
        sentTo: message.sentTo
      })

      await em.flush()

      return message
    }
    return null
  }

  @Mutation(() => UserMutationResponse)
  async login(
    @Arg("data") { email, password }: LoginInput,
    @Ctx() { em, req }: ContextType
  ): Promise<UserMutationResponse | null> {
    const errors = []

    const user = await em.findOne(User, { email: email })

    if (!user) {
      errors.push(emailOrPasswordIsIncorrect)
      return {
        errors
      }
    }

    const valid = await argon2.verify(user.password, password)

    if (!valid) {
      logger.error(`Email: ${email} - incorrect password attempt`)
      errors.push(emailOrPasswordIsIncorrect)
      return { errors }
    }
    if (valid) {
      req.session.userId = user.id
    }
    return {
      user
    }
  }

  @Mutation(() => UserLogoutMutationResponse)
  @UseMiddleware(isAuth)
  logout(@Ctx() { req, res }: ContextType) {
    return new Promise(resolve =>
      req.session.destroy((err: any) => {
        res.clearCookie(COOKIE_NAME)
        if (err) {
          resolve(false)
          return {
            message: err,
            code: false
          }
        }
        resolve(true)
        return {
          message: "user logged out successfully",
          code: true
        }
      })
    )
  }

  @Subscription(() => PrivateMessage, {
    topics: Topic.NewPrivateMessage,
    filter: ({
      payload,
      args
    }: ResolverFilterData<PrivateMessage, PrivateMessageArgs>) => {
      return payload.sentTo.id === args.userId
    }
  })
  newPrivateMessage(
    @Root() newPrivateMessage: PrivateMessage,
    @Args() { userId }: PrivateMessageArgs
  ): PrivateMessage {
    console.log(userId)
    return newPrivateMessage
  }

  @Subscription(() => User, {
    topics: Topic.NewUser
  })
  newUser(@Root() newUser: User): User {
    return newUser
  }
}
