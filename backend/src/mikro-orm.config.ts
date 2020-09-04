import { MikroORM } from '@mikro-orm/core'
import path from 'path'
import { __prod__ } from './constants'
import { Post } from './entities/Post'
import { User } from './entities/User'
import { BaseEntity } from './entities/BaseEntity'
import { Vote } from './entities/Vote'
import { Category } from './entities/Category'
import { Comment } from './entities/Comment'

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/
  },
  entities: [BaseEntity, Post, User, Vote, Category, Comment],
  dbName: 'reddit-ts-2',
  username: 'postgres',
  password: 'postgres',
  type: 'postgresql',
  debug: !__prod__
} as Parameters<typeof MikroORM.init>[0]
