import { ContextType } from '../types'
import { Resolver, Query, Ctx, Mutation, Arg } from 'type-graphql'
import { User } from '../entities/User'
import argon2 from 'argon2'
import { RegisterInput } from './inputs/user-input'
import { RegisterResponse } from './response/mutation'

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() { req, em }: ContextType) {
    if (!req.session.userId) {
      return null
    }
    return em.findOne(User, req.session.userId)
  }

  @Query(() => [User], { nullable: true })
  users(@Ctx() { em }: ContextType): Promise<User[]> {
    return em.find(User, {})
  }

  @Mutation(() => RegisterResponse)
  async register(
    @Arg('data') { email, username, password }: RegisterInput,
    @Ctx() { em, req }: ContextType
  ): Promise<RegisterResponse> {
    const user = em.create(User, {
      email: email,
      username: username,
      password: await argon2.hash(password)
    })
    await em.persistAndFlush(user)

    req.session!.userId = user.id

    return {
      code: '200',
      message: 'User successfully registered.',
      success: true,
      user
    }
  }
}
