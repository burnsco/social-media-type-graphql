import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core"
import { Response } from "express"

export interface ContextType {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
  req: CustomSessionRequest & Express.Request
  res: Response
}

type CustomSessionRequest = Request & {
  session: Express.Session
  sessionID: string
}

export type NewCommentPayload = {
  body: string
  createdBy: User
  createdAt: string
}
