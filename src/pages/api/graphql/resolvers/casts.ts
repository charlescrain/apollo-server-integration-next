import getTipCasts from '../../../../lib/data-sources/casts/get'
import { logger } from '../../../../lib/utils/logger'
import { Pagination } from './main'

export interface TipCast {
  giverFid: number
  hash: string
  date: string
}

const castsQueryResolvers = {
  Query: {
    casts: async (
      _: any,
      args: {
        pagination: Pagination
      }
    ): Promise<TipCast[]> => {
      try {
        const tips = await getTipCasts(args.pagination)
        return tips
      } catch (err) {
        logger.error(err)
        return []
      }
    },
  },
}

export default castsQueryResolvers
