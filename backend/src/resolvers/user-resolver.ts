import { ContextType } from '../types'
import { Resolver, Query, Ctx, Mutation, Args } from 'type-graphql'
import { User } from '../entities/User'
import argon2 from 'argon2'
import { RegisterInput } from './inputs/user-input'

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

  @Query(() => [User], { nullable: true })
  users(@Ctx() { em }: ContextType): Promise<User[]> {
    return em.find(User, {})
  }

  @Mutation(() => User)
  async register(
    @Args() { email, username, password }: RegisterInput,
    @Ctx() { em, req }: ContextType
  ): Promise<User> {
    const user = em.create(User, {
      email: email,
      username: username,
      password: await argon2.hash(password)
    })
    await em.persistAndFlush(user)
    req.session!.userId = user.id
    return user
  }
}
