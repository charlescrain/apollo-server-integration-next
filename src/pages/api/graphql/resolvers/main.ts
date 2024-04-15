import merge from 'lodash.merge'
import { logger } from 'src/lib/winston'

const castHashesQueryResolvers = {
  Query: {
    castHashes: async (): Promise<string[]> => {
      try {
        return ['hello']
      } catch (err) {
        logger.error(err)
        return []
      }
    },
  },
}

const resolvers = merge({}, castHashesQueryResolvers)

export default resolvers
