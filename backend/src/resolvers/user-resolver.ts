import argon2 from 'argon2'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { User, UserRole } from '../entities/User'
import { ContextType } from '../types'
import { LoginInput, RegisterInput } from './inputs/user-input'
import { LogoutMutationResponse } from './response/logout-response'
import { UserMutationResponse } from './response/user-response'
import { validateLoginUser } from './validation/login-schema'
import { validateRegisterUser } from './validation/register-schema'

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: ContextType) {
    if (!req.session.userId) {
      return null
    }
    const user = await em.findOne(User, req.session.userId)
    return user
  }

  @Query(() => [User])
  users(@Ctx() { em }: ContextType): Promise<User[]> {
    return em.find(User, {})
  }

  @Mutation(() => UserMutationResponse)
  async register(
    @Arg('data') data: RegisterInput,
    @Ctx() { em, req }: ContextType
  ): Promise<UserMutationResponse> {
    const errors = await validateRegisterUser(data)
    if (errors !== null) {
      return {
        errors,
      }
    }

    const user = em.create(User, {
      email: data.email,
      username: data.username,
      password: await argon2.hash(data.password),
      role: UserRole.USER,
    })
    await em.persistAndFlush(user)

    req.session.userId = user.id

    return {
      user,
    }
  }

  @Mutation(() => UserMutationResponse)
  async login(
    @Arg('data') data: LoginInput,
    @Ctx() { em, req }: ContextType
  ): Promise<UserMutationResponse> {
    const errors = await validateLoginUser(data)
    if (errors !== null) {
      return {
        errors,
      }
    }

    const user = await em.findOne(User, { email: data.email })

    if (user) {
      req.session!.userId = user.id

      return {
        user,
      }
    }
    return {}
  }

  @Mutation(() => LogoutMutationResponse)
  logout(@Ctx() { req, res }: ContextType) {
    return new Promise(resolve =>
      req.session.destroy(err => {
        res.clearCookie('rdt')
        if (err) {
          resolve(false)
          return {
            message: err,
            code: false,
          }
        }
        resolve(true)
        return {
          message: 'user logged out successfully',
          code: true,
        }
      })
    )
  }
}
