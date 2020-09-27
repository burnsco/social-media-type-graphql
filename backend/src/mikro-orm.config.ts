import { MikroORM, ReflectMetadataProvider } from "@mikro-orm/core"
import path from "path"
import { __prod__ } from "./constants"
import { BaseEntity } from "./entities/BaseEntity"
import { Category } from "./entities/Category"
import { Comment } from "./entities/Comment"
import { Post } from "./entities/Post"
import { User } from "./entities/User"
import { Vote } from "./entities/Vote"

export default {
  metadataProvider: ReflectMetadataProvider,
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/
  },
  entities: [BaseEntity, Category, User, Post, Comment, Vote],
  dbName: "reddit-ts",
  username: "postgres",
  password: "postgres",
  type: "postgresql",
  debug: !__prod__
} as Parameters<typeof MikroORM.init>[0]
