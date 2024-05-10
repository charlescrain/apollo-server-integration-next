import { serializeError } from '../../../../lib/utils/serializeError'
import { logger } from '../../../../lib/utils/logger'
import setUsers from '../../../../lib/data-sources/users/set'
import merge from 'lodash.merge'
import { Pagination } from './main'
import getUsers from '../../../../lib/data-sources/users/get'
import { convertDateStringsToDates } from '../../../../lib/utils/converDateStringsToDates'

export interface RareTipUser {
  address: string
  fids: number[]
  isEligible: boolean
  date: string
  dailyAllowance: number
  allowanceRemaining: number
  allowanceTipped: number
  dailyTipCount: number
  totalTipCount: number
  dailyAmountReceived: number
  totalAmountReceived: number
  totalAmountTipped: number
  daysSinceLastPoints: number
  points: number
}

export interface RareTipUserWithActivity extends RareTipUser {
  artworksCreated: number
  bidOrOfferPlaced: number
  priceSetOrAuctionScheduled: number
  artworkPurchased: number
  tokenLike: number
  casts: number
  castLikes: number
  castRecasts: number
  castReplies: number
  replies: number
  likes: number
  tipsGiven: number
  artworkTipsGiven: number
}

export interface CreateUsersResponse {
  code: number
  success: boolean
  message: string
}

type UsersErrorResponse = CreateUsersResponse

const usersQueryResolvers = {
  Query: {
    users: async (
      _: any,
      args: {
        dates: string[]
        targetAddresses?: string[]
        pagination?: Pagination
      }
    ): Promise<RareTipUser[] | UsersErrorResponse> => {
      try {
        const rareTipUsers = await getUsers(
          args.dates,
          args.targetAddresses,
          args.pagination
        )
        return rareTipUsers
      } catch (err) {
        const message = `Error fetching eligible users: ${serializeError(err)}`
        logger.error(message)
        return {
          code: 400,
          success: false,
          message,
        }
      }
    },
  },
}

const usersMutationResolvers = {
  Mutation: {
    createUsers: async (
      _: any,
      args: {
        users: RareTipUserWithActivity[]
      }
    ): Promise<CreateUsersResponse> => {
      try {
        const CreateUsersResponse = await setUsers(
          args.users.map(convertDateStringsToDates<RareTipUserWithActivity>)
        )
        return CreateUsersResponse
      } catch (err) {
        const message = `Error saving eligible users: ${serializeError(err)}`
        logger.error(message)
        return {
          code: 400,
          success: false,
          message,
        }
      }
    },
  },
}

const resolvers = merge({}, usersQueryResolvers, usersMutationResolvers)

export default resolvers
