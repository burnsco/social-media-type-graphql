import { Field, InputType } from "type-graphql"
import { User } from "../../entities/User"

@InputType()
export class RegisterInput implements Partial<User> {
  @Field()
  email: string

  @Field()
  username: string

  @Field()
  password: string

  @Field(() => String, { nullable: true })
  avatar?: string

  @Field(() => String, { nullable: true })
  about?: string
}

@InputType()
export class CheckUsernameInput implements Partial<User> {
  @Field()
  username: string
}

@InputType()
export class EditUserInput implements Partial<User> {
  @Field(() => String, { nullable: true })
  email?: string

  @Field(() => String, { nullable: true })
  username?: string

  @Field(() => String, { nullable: true })
  password?: string

  @Field(() => String, { nullable: true })
  avatar?: string

  @Field(() => String, { nullable: true })
  about?: string
}

@InputType()
export class LoginInput implements Partial<User> {
  @Field()
  email: string

  @Field()
  password: string
}
