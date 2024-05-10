import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { Tip } from '../../../pages/api/graphql/resolvers/tips'
import { parsePagination } from '../../utils/parsePagination'
import { cache, prismaClient } from '../../../startServerAndCreateNextHandler'
import { Pagination } from '../../../pages/api/graphql/resolvers/main'
import { serializeError } from '../../utils/serializeError'
import { logger } from '../../utils/logger'
import { mapDbValuesToTip } from '../../utils/mapDbTypesToObject'

dayjs.extend(utc)

const getTips = async (
  date: string,
  pagination?: Pagination
): Promise<Tip[]> => {
  try {
    const { offset, limit } = parsePagination(pagination)

    // Cache
    const cacheKey = `TIPS_${offset}_${limit}`
    const cachedTips = cache.get<Tip[]>(cacheKey)

    if (cachedTips) {
      return cachedTips
    }

    const createTips = await prismaClient.tips.findMany({
      where: {
        date: {
          equals: dayjs(date).utc().startOf('day').toDate(),
        },
      },
      skip: offset,
      take: limit,
    })

    cache.set(cacheKey, createTips, 30)
    return createTips.map(mapDbValuesToTip)
  } catch (err) {
    logger.error(`Error writing users to DB: ${serializeError(err)}`)
    throw err
  }
}

export default getTips
