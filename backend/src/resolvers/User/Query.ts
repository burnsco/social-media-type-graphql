import { LoadStrategy } from "@mikro-orm/core"
import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql"
import { User } from "../../entities"
import PrivateMessage from "../../entities/PrivateMessage"
import { EditUserInput } from "../../inputs"
import { ContextType } from "../../types"

@Resolver(() => User)
export default class UserQueryResolver {
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
    return await em.findOne(
      User,
      { id: req.session.userId },
      {
        populate: ["friends", "privateMessages"],
        strategy: LoadStrategy.JOINED
      }
    )
  }

  @FieldResolver(() => [PrivateMessage], { nullable: true })
  privateMessages(@Root() user: User) {
    return user.privateMessages
  }

  @FieldResolver(() => [User], { nullable: true })
  friends(@Root() user: User) {
    return user.friends
  }
}
