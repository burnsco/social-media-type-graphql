import { MikroORM, ReflectMetadataProvider } from "@mikro-orm/core"
import "dotenv-safe/config"
import path from "path"
import { __prod__ } from "./common/constants"
import { initializeLogger } from "./config"

const { logger } = initializeLogger()

export default {
  metadataProvider: ReflectMetadataProvider,
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/
  },
  filters: {
    category: { cond: args => ({ category: args.category }), entity: ["Post"] }
  },
  entities: ["./dist/entities/**/*.js"],
  entitiesTs: ["./src/entities/**/*.ts"],
  tsNode: process.env.NODE_DEV === "true" ? true : false,
  clientUrl: process.env.DB_URL,
  logger: msg => logger.log({ level: "info", message: msg }),
  type: "postgresql",
  debug: !__prod__
} as Parameters<typeof MikroORM.init>[0]
