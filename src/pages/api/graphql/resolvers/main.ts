import merge from 'lodash.merge'
import { logger } from '../../../../lib/winston'
import getTips, { Pagination } from '../../rest/casts/get'
import { Tip } from '../../rest/casts/set'

const castsQueryResolvers = {
  Query: {
    casts: async (
      _: any,
      args: {
        pagination: Pagination
      }
    ): Promise<Tip[]> => {
      try {
        const tips = await getTips(args.pagination)
        return tips
      } catch (err) {
        logger.error(err)
        return []
      }
    },
  },
}

const resolvers = merge({}, castsQueryResolvers)

export default resolvers
