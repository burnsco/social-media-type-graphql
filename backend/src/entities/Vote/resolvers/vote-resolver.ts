import { Ctx, FieldResolver, Resolver, Root } from "type-graphql"
import { ContextType } from "../../types"
import User from "../Base/User"
import Vote from "./Vote"

@Resolver(() => Vote)
export class VoteResolver {
  @FieldResolver()
  castBy(@Root() vote: Vote, @Ctx() { em }: ContextType): Promise<User> {
    return em.findOneOrFail(User, vote.castBy.id)
  }
}
