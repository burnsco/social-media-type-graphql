import { Ctx, FieldResolver, Resolver, Root } from "type-graphql"
import { User, Vote } from "../.."
import { ContextType } from "../../../types"

@Resolver(() => Vote)
export class VoteResolver {
  @FieldResolver()
  castBy(@Root() vote: Vote, @Ctx() { em }: ContextType): Promise<User> {
    return em.findOneOrFail(User, vote.castBy.id)
  }
}
