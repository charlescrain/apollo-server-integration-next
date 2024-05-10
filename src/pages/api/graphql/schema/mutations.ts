import { gql } from 'graphql-tag'

const mutations = gql`
  type Mutation {
    createUsers(users: [RareTipUserWithActivity!]!): UpdateTableResponse!
    createTips(tips: [NewTip!]!): UpdateTableResponse!
  }

  type UpdateTableResponse {
    code: Int!
    success: Boolean!
    message: String!
  }
`

export default mutations
