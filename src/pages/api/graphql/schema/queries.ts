import { gql } from 'graphql-tag'

const queries = gql`
  type Query {
    casts(pagination: Pagination): [Cast]!
    users(
      dates: [String!]!
      targetAddresses: [String!]
      pagination: Pagination
    ): [RareTipUser]!
    tips(date: String!, pagination: Pagination): [Tip]!
  }
`

export default queries
