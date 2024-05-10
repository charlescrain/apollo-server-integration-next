import { serializeError } from '../../../../lib/utils/serializeError'
import { logger } from '../../../../lib/utils/logger'
import merge from 'lodash.merge'
import { Pagination } from './main'
import getTips from '../../../../lib/data-sources/tips/get'
import setTips from '../../../../lib/data-sources/tips/set'
import { convertDateStringsToDates } from '../../../../lib/utils/converDateStringsToDates'

export interface Tip {
  date: string
  giverFid: number
  recipientFid: number
  amount: number
  hash: string
  parentHash: string | null
}

export interface CreateTipsResponse {
  code: number
  success: boolean
  message: string
}

type TipsErrorResponse = CreateTipsResponse

const tipsQueryResolvers = {
  Query: {
    tips: async (
      _: any,
      args: {
        date: string
        pagination?: Pagination
      }
    ): Promise<Tip[] | TipsErrorResponse> => {
      try {
        const tips = await getTips(args.date, args.pagination)
        return tips
      } catch (err) {
        const message = `Error fetching tips: ${serializeError(err)}`
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

const tipsMutationResolvers = {
  Mutation: {
    createTips: async (
      _: any,
      args: {
        tips: Tip[]
      }
    ): Promise<CreateTipsResponse> => {
      try {
        const tips = await setTips(
          args.tips.map(convertDateStringsToDates<Tip>)
        )
        return tips
      } catch (err) {
        const message = `Error saving tips: ${serializeError(err)}`
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

const resolvers = merge({}, tipsQueryResolvers, tipsMutationResolvers)

export default resolvers
