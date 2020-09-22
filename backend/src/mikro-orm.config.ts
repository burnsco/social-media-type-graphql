import { MikroORM } from '@mikro-orm/core'
import path from 'path'
import { __prod__ } from './constants'
import { BaseEntity } from './entities/BaseEntity'
import { Category } from './entities/Category'
import { Comment } from './entities/Comment'
import { Message } from './entities/Message'
import { Post } from './entities/Post'
import { User } from './entities/User'
import { Vote } from './entities/Vote'

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [BaseEntity, Category, User, Post, Comment, Vote, Message],
  dbName: 'reddit-ts-2',
  username: 'postgres',
  password: 'postgres',
  type: 'postgresql',
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0]
