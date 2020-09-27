import argon2 from "argon2"
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { User } from "../entities/User"
import { ContextType } from "../types"
import { PostInput } from "./inputs/post-input"
import { LoginInput, RegisterInput } from "./inputs/user-input"
import { LogoutMutationResponse } from "./response/logout-response"
import { UserMutationResponse } from "./response/user-response"
import { validateLoginUser } from "./validation/login-schema"
import { validateRegisterUser } from "./validation/register-schema"

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: ContextType) {
    if (!req.session.userId) {
      return null
    }
    return await em.findOne(User, req.session.userId)
  }

  @Query(() => User)
  async user(
    @Arg("userId") { userId }: PostInput,
    @Ctx() { em }: ContextType
  ): Promise<User> {
    return await em.findOneOrFail(User, { id: userId })
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
    const errors = await validateRegisterUser({ email, username, password })
    if (errors !== null) {
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
  async login(
    @Arg("data") { email, password }: LoginInput,
    @Ctx() { em, req }: ContextType
  ): Promise<UserMutationResponse> {
    const errors = await validateLoginUser({ email, password })
    if (errors !== null) {
      return {
        errors
      }
    }

    const user = await em.findOne(User, { email: email })

    if (user) {
      req.session.userId = user.id

      return {
        user
      }
    }
    return {}
  }

  @Mutation(() => LogoutMutationResponse)
  logout(@Ctx() { req, res }: ContextType) {
    return new Promise(resolve =>
      req.session.destroy(err => {
        res.clearCookie("rdt")
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
