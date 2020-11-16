import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core"
import { Response } from "express"

export interface ContextType {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
  req: Request & Express.Request
  res: Response
}
