import { GraphQLEmail } from 'graphql-custom-types'
import { Field, InputType } from 'type-graphql'
import { User } from '../../entities/User'

@InputType()
export class RegisterInput implements Partial<User> {
  @Field(() => GraphQLEmail)
  email: string

  @Field()
  username: string

  @Field()
  password: string
}

@InputType()
export class LoginInput implements Partial<User> {
  @Field(() => GraphQLEmail)
  email: string;

  @Field()
  password: string;
}
