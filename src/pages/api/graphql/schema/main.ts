import { gql } from 'graphql-tag'

const typeDefs = gql`
  type Query {
    casts(pagination: Pagination): [Cast]!
  }

  input Pagination {
    limit: Int
    offset: Int
  }

  type Cast {
    giverFid: Int!
    hash: String!
    date: String!
  }
`

export default typeDefs
