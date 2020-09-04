import { ObjectType, Field } from 'type-graphql'
import { User } from '../../entities/User'

@ObjectType()
export class MutationResponse {
  @Field()
  code!: string
  @Field()
  message!: string
  @Field()
  success!: boolean
}

@ObjectType()
export class RegisterResponse extends MutationResponse {
  @Field()
  user: User
}
