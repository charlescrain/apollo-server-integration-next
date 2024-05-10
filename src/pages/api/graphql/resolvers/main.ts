import merge from 'lodash.merge'
import castsResolvers from './casts'
import usersResolvers from './users'
import tipsResolvers from './tips'

export interface Pagination {
  offset?: number
  limit?: number
}

const resolvers = merge({}, castsResolvers, usersResolvers, tipsResolvers)

export default resolvers
