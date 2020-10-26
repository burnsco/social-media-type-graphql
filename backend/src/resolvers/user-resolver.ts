import { wrap } from "@mikro-orm/core"
import argon2 from "argon2"
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { COOKIE_NAME } from "../constants"
import { User } from "../entities/User"
import { ContextType } from "../types"
import {
  CheckAvailability,
  EditUserInput,
  LoginInput,
  RegisterInput
} from "./inputs/user-input"
import { LogoutMutationResponse } from "./response/logout-response"
import { UserMutationResponse } from "./response/user-response"
import { validateLoginUser } from "./validation/login-schema"

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: ContextType) {
    if (!req.session.userId) {
      return null
    }
    return await em.findOne(User, req.session.userId)
  }

  @Query(() => UserMutationResponse)
  async isUserOrEmailTaken(
    @Arg("data") data: CheckAvailability,
    @Ctx() { em }: ContextType
  ): Promise<UserMutationResponse> {
    const errors = []
    const isUserTaken = await em.findOne(User, { username: data.username })
    const isEmailTaken = await em.findOne(User, { email: data.email })

    if (isUserTaken || isEmailTaken) {
      if (isUserTaken) {
        errors.push({
          field: "username",
          message: "Username taken."
        })
      }
      if (isEmailTaken) {
        errors.push({
          field: "email",
          message: "Email in use."
        })
      }
      return {
        errors
      }
    }
    errors.push({
      field: "email",
      message: "email not in use"
    })
    errors.push({
      field: "username",
      message: "username available"
    })
    return {
      errors
    }
  }

  @Query(() => User)
  async user(
    @Arg("data") data: EditUserInput,
    @Ctx() { em }: ContextType
  ): Promise<User> {
    return await em.findOneOrFail(User, { username: data.username })
  }

  @Query(() => [User])
  users(@Ctx() { em }: ContextType): Promise<User[]> {
    return em.find(User, {})
  }

  @Mutation(() => UserMutationResponse)
  async register(
    @Arg("data") { email, username, password }: RegisterInput,
    @Ctx() { em, req }: ContextType
  ): Promise<UserMutationResponse> {
    const errors = []
    const isUserTaken = await em.findOne(User, { username: username })
    const isEmailTaken = await em.findOne(User, { email: email })

    if (isUserTaken || isEmailTaken) {
      if (isUserTaken) {
        errors.push({
          field: "username",
          message: "Username taken."
        })
      }
      if (isEmailTaken) {
        errors.push({
          field: "email",
          message: "Email in use."
        })
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
    await em.persistAndFlush(user)

    req.session.userId = user.id

    return {
      user
    }
  }

  @Mutation(() => UserMutationResponse)
  async editUser(
    @Arg("data") data: EditUserInput,
    @Ctx() { em, req }: ContextType
  ): Promise<UserMutationResponse> {
    const user = await em.findOneOrFail(User, { id: req.session.userId })

    // Add Field/Message and Error Responses for each Field
    // IF email is taken
    // IF username is taken
    // IF the formatting is incorrect (Yup)

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
  ): Promise<UserMutationResponse> {
    const user = await em.findOne(User, { email: email })
    if (!user) return {}

    const errors = await validateLoginUser({ email, password })
    if (errors !== null) {
      return {
        errors
      }
    }
    const valid = await argon2.verify(user.password, password)
    if (valid) {
      req.session.userId = user.id
    }
    return {
      user
    }
  }

  @Mutation(() => LogoutMutationResponse)
  logout(@Ctx() { req, res }: ContextType) {
    return new Promise(resolve =>
      req.session.destroy(err => {
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
}
