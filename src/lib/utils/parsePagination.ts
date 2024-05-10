import { Pagination } from '../../pages/api/graphql/resolvers/main'

// Max number of rows returned per request
const MAX_ROWS = 10000

export const parsePagination = (pagination?: Pagination) => ({
  offset: pagination && pagination.offset ? pagination.offset : 0,
  limit:
    pagination && pagination.limit && pagination.limit <= MAX_ROWS
      ? pagination.limit
      : MAX_ROWS,
})
