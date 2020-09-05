import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class FieldError {
  @Field()
  field!: string
  @Field()
  message!: string
}

@ObjectType()
export abstract class MutationResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
}
