import {
  EntityManager,
  MikroORM,
  ReflectMetadataProvider
} from "@mikro-orm/core"
import { PostgreSqlDriver } from "@mikro-orm/postgresql/PostgreSqlDriver"
import path from "path"
import { BaseEntity } from "../entities/BaseEntity"
import { Category } from "../entities/Category"
import { Comment } from "../entities/Comment"
import { Post } from "../entities/Post"
import { User } from "../entities/User"
import { Vote } from "../entities/Vote"

export const BASE_DIR = __dirname

export async function testConnection() {
  const orm = await MikroORM.init<PostgreSqlDriver>({
    metadataProvider: ReflectMetadataProvider,
    migrations: {
      path: path.join(__dirname, "../migrations"),
      pattern: /^[\w-]+\d+\.[tj]s$/
    },
    clientUrl: "postgre://postgres:postgres@127.0.0.1:5432/reddit-testing",
    entities: [BaseEntity, Category, User, Post, Comment, Vote],
    dbName: `reddit-ts`,
    baseDir: BASE_DIR,
    type: "postgresql",
    debug: true,
    logger: i => i,
    cache: { enabled: true }
  })

  return orm
}

export async function wipeDatabase(em: EntityManager) {
  await em.getRepository(BaseEntity).nativeDelete({})
  await em.getRepository(Category).nativeDelete({})
  await em.getRepository(User).nativeDelete({})
  await em.getRepository(Post).nativeDelete({})
  await em.getRepository(Comment).nativeDelete({})
  await em.getRepository(Vote).nativeDelete({})
  em.clear()
}
