import { MikroORM } from "@mikro-orm/core"
import path from "path"
import { __prod__ } from "./constants"

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/
  },
  entities: ["./dist/entities/**/*.js"],
  entitiesTs: ["./src/entities/**/*.ts"],
  tsNode: process.env.NODE_DEV === "true" ? true : false,
  clientUrl:
    "postgres://postgres:de46926e9247fcdfead01f9a7303dba2@dokku-postgres-maple:5432/maple",
  type: "postgresql",
  debug: !__prod__
} as Parameters<typeof MikroORM.init>[0]
