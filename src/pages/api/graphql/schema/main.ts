import { gql } from 'graphql-tag'

const typeDefs = gql`
  type Query {
    castHashes: [String]!
  }
`

export default typeDefs
