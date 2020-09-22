import { Entity, Enum, Property } from '@mikro-orm/core'
import { Field, ObjectType, registerEnumType } from 'type-graphql'
import { BaseEntity } from './BaseEntity'

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field()
  @Property({ unique: true })
  email!: string

  @Field()
  @Property({ unique: true })
  username!: string

  @Property()
  password!: string

  @Enum(() => UserRole)
  @Field(() => UserRole)
  role!: UserRole
}

export enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}
registerEnumType(UserRole, {
  name: 'UserRole',
})


