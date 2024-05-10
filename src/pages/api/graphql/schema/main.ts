import { gql } from 'graphql-tag'
import queries from './queries'
import mutations from './mutations'
import cast from './cast'
import tips from './tip'
import users from './user'

const main = gql`
  input Pagination {
    limit: Int
    offset: Int
  }
`

const typeDefs = gql`
  ${main}
  ${queries}
  ${mutations}
  ${cast}
  ${tips}
  ${users}
`

export default typeDefs
