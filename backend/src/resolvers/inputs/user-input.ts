import { Field, InputType } from 'type-graphql'
import { User } from '../../entities/User'

@InputType()
export class RegisterInput implements Partial<User> {
  @Field()
  email!: string

  @Field()
  username!: string

  @Field()
  password!: string
}

@InputType()
export class LoginInput implements Partial<User> {
  @Field()
  email!: string;

  @Field()
  password!: string;
}
