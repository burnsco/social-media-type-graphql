import { Connection, EntityManager, IDatabaseDriver } from '@mikro-orm/core'
import { Response, Request } from 'express'

export interface ContextType {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
  req: Request & { session: Express.Session }
  res: Response
}
