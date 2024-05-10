import { gql } from 'graphql-tag'

const tips = gql`
  input NewTip {
    date: String!
    giverFid: Int!
    recipientFid: Int!
    amount: Float!
    hash: String!
    parentHash: String
  }

  type Tip {
    date: String!
    giverFid: Int!
    recipientFid: Int!
    amount: Float!
    hash: String!
    parentHash: String
  }
`

export default tips
