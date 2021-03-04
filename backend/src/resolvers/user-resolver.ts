import { wrap } from "@mikro-orm/core"
import argon2 from "argon2"
import {
  Arg,
  Ctx,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription,
  UseMiddleware
} from "type-graphql"
import {
  COOKIE_NAME,
  emailInUse,
  emailOrPasswordIsIncorrect,
  usernameInUse
} from "../constants"
import { User } from "../entities/index"
import { ContextType } from "../types"
import { isAuth } from "../utils/isAuth"
import { Topic } from "./enums/topics"
import {
  CheckAvailability,
  EditUserInput,
  LoginInput,
  RegisterInput
} from "./inputs/user-input"
import LogoutMutationResponse from "./response/mutation/logout-response"
import { UserMutationResponse } from "./response/query/user-response"

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: ContextType) {
    if (req.session.userId) {
      return await em.findOne(User, req.session.userId)
    }
    return null
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") data: CheckAvailability,
    @Ctx() { em }: ContextType
  ): Promise<boolean> {
    const user = await em.findOne(User, { email: data.email })
    if (user) {
      return true
    }
    return false
  }

  @Query(() => User)
  async user(
    @Arg("data") data: EditUserInput,
    @Ctx() { em }: ContextType
  ): Promise<User | null> {
    return await em.findOne(User, { username: data.username })
  }

  @Query(() => [User])
  async users(@Ctx() { em }: ContextType): Promise<User[]> {
    return await em.find(User, {})
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
      wrap(user).assign({
        username: data.username
      })
    }
    if (data.about) {
      wrap(user).assign({
        about: data.about
      })
    }
    if (data.email) {
      wrap(user).assign({
        email: data.email
      })
    }
    if (data.password) {
      wrap(user).assign({
        password: await argon2.hash(data.password)
      })
    }
    if (data.avatar) {
      wrap(user).assign({
        avatar: data.avatar
      })
    }

    await em.persistAndFlush(user)

    return {
      user
    }
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
      const errors = []
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

  @Mutation(() => LogoutMutationResponse)
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

  // **************************
  //                          *
  //    SUBSCRIPTION STUFF    *
  //                          *
  // **************************

  // ```````````````````````````````
  // ---------NEW USER--------------
  // ...............................

  @Subscription(() => User, {
    topics: Topic.NewUser
  })
  newUser(@Root() newUser: User): User {
    return newUser
  }
}
