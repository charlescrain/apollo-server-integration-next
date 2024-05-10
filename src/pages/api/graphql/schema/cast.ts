import { gql } from 'graphql-tag'

const cast = gql`
  type Cast {
    giverFid: Int!
    hash: String!
    date: String!
  }
`

export default cast
