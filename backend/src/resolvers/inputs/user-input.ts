import { GraphQLEmail } from "graphql-custom-types"
import { Field, InputType } from "type-graphql"
import { User } from "../../entities/index"

@InputType()
export class RegisterInput implements Partial<User> {
  @Field(() => GraphQLEmail)
  email: string

  @Field(() => String)
  username: string

  @Field()
  password: string

  @Field(() => String, { nullable: true })
  avatar?: string

  @Field(() => String, { nullable: true })
  about?: string
}

@InputType()
export class LoginInput implements Partial<User> {
  @Field(() => GraphQLEmail, { nullable: true })
  email: string

  @Field(() => String, { nullable: true })
  password: string
}

@InputType()
export class CheckAvailability implements Partial<User> {
  @Field(() => String, { nullable: true })
  username?: string

  @Field(() => GraphQLEmail, { nullable: true })
  email?: string
}

@InputType()
export class EditUserInput implements Partial<User> {
  @Field(() => GraphQLEmail, { nullable: true })
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
