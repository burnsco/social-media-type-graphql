import { PostOrderBy } from '@generated/graphql'

export interface PaginationArgs {
  skip?: number | null
  first?: number | null
  category?: string | null
  orderBy?: PostOrderBy
}
