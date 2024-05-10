import { logger } from '../../utils/logger'
import { serializeError } from '../../utils/serializeError'
import { Pagination } from '../../../pages/api/graphql/resolvers/main'
import { cache, prismaClient } from '../../../startServerAndCreateNextHandler'
import { parsePagination } from '../../utils/parsePagination'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { RareTipUser } from '../../../pages/api/graphql/resolvers/users'
import { mapDbValuesToRareTipUser } from '../../utils/mapDbTypesToObject'

dayjs.extend(utc)

const getUsers = async (
  dates: string[],
  targetAddresses?: string[],
  pagination?: Pagination
): Promise<RareTipUser[]> => {
  try {
    const { offset, limit } = parsePagination(pagination)

    // Cache
    const cacheKey = `
      USERS_${dates.map((date) => date)}_${targetAddresses?.map((address) => address)}_${offset}_${limit}
    `
    const cachedUsers = cache.get<RareTipUser[]>(cacheKey)

    if (cachedUsers) {
      return cachedUsers
    }

    const dbUsers = await prismaClient.users.findMany({
      where: {
        date: {
          in: dates.map((date) => dayjs(date).utc().startOf('day').toDate()),
        },
        ...(targetAddresses ? { address: { in: targetAddresses } } : {}),
      },
      select: {
        address: true,
        fids: true,
        isEligible: true,
        date: true,
        dailyAllowance: true,
        allowanceRemaining: true,
        allowanceTipped: true,
        dailyTipCount: true,
        totalTipCount: true,
        dailyAmountReceived: true,
        totalAmountReceived: true,
        totalAmountTipped: true,
        daysSinceLastPoints: true,
        points: true,
      },
      skip: offset,
      take: limit,
    })

    const users = dbUsers.map(mapDbValuesToRareTipUser)
    cache.set(cacheKey, users, 30)
    return users
  } catch (err) {
    logger.error(`Error writing users to DB: ${serializeError(err)}`)
    throw err
  }
}

export default getUsers
