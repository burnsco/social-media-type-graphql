import argon2 from "argon2"
import {
  Arg,
  Args,
  Ctx,
  FieldResolver,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  ResolverFilterData,
  Root,
  Subscription,
  UseMiddleware
} from "type-graphql"
import NewMessageArgs from "../args/message-args"
import {
  COOKIE_NAME,
  emailInUse,
  emailOrPasswordIsIncorrect,
  usernameInUse
} from "../common/constants"
import { Topic } from "../common/topics"
import { initializeLogger } from "../config"
import { Message, User } from "../entities"
import {
  EditUserInput,
  LoginInput,
  MessageInput,
  RegisterInput
} from "../inputs"
import { isAuth } from "../lib/isAuth"
import { UserLogoutMutationResponse, UserMutationResponse } from "../responses"
import { ContextType } from "../types"

const { logger } = initializeLogger()

@Resolver(() => User)
export default class UserResolver {
  @Query(() => User)
  async user(
    @Arg("data") data: EditUserInput,
    @Ctx() { em }: ContextType
  ): Promise<User> {
    return await em.findOneOrFail(User, { username: data.username })
  }

  @Query(() => [User])
  async users(@Ctx() { em }: ContextType): Promise<User[] | null> {
    return await em.find(User, {}, { populate: ["friends"] })
  }

  @Query(() => User)
  async me(@Ctx() { req, em }: ContextType) {
    return await em.findOneOrFail(User, req.session.userId)
  }

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

  @Mutation(() => UserMutationResponse)
  @UseMiddleware(isAuth)
  async sendMessage(
    @Arg("data") data: MessageInput,
    @PubSub(Topic.NewMessage)
    notifyAboutNewMessage: Publisher<Partial<Message>>,
    @Ctx() { em, req }: ContextType
  ): Promise<UserMutationResponse | null | boolean> {
    const user = await em.findOne(User, req.session.userId, {
      populate: ["messages"]
    })
    let receipent
    if (data.userId) {
      receipent = await em.findOne(User, data.userId)
    }

    if (user && receipent && req.session.userId) {
      const message = em.create(Message, {
        replyId: receipent.id,
        sentBy: user,
        sentTo: receipent,
        content: data.content
      })
      user.messages.add(message)

      em.persist(user)

      await notifyAboutNewMessage(message)

      await em.flush()

      return {
        user,
        message
      }
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

  @FieldResolver({ nullable: true })
  async messages(@Root() user: User, @Ctx() { em }: ContextType) {
    return await em.find(Message, { sentBy: { id: user.id } })
  }

  @Subscription(() => User, {
    topics: Topic.NewUser
  })
  newUser(@Root() newUser: User): User {
    return newUser
  }

  @Subscription(() => Message, {
    topics: Topic.NewMessage,
    filter: ({
      payload,
      args
    }: ResolverFilterData<Message, NewMessageArgs>) => {
      return payload.sentTo.id === args.userId
    }
  })
  newMessage(
    @Root() newMessage: Message,
    @Args() { userId }: NewMessageArgs
  ): Message {
    return newMessage
  }
}
