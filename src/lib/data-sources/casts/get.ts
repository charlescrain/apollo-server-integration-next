import { QueryResult, sql } from '@vercel/postgres'
import { logger } from '../../utils/logger'
import { cache } from '../../../startServerAndCreateNextHandler'
import { TipCast } from '../../../pages/api/graphql/resolvers/casts'
import { Pagination } from '../../../pages/api/graphql/resolvers/main'

interface DbTip {
  giver_fid: number
  hash: string
  date: Date
}

// Max number of rows returned per request
const MAX_ROWS = 10000

const mapValuesToTip = (row: DbTip): TipCast => ({
  giverFid: row.giver_fid,
  hash: row.hash,
  date: row.date.toISOString(),
})

const getTipCasts = async (config?: Pagination): Promise<TipCast[]> => {
  try {
    const offset = config && config.offset ? config.offset : 0
    const limit =
      config && config.limit && config.limit < MAX_ROWS
        ? config.limit
        : MAX_ROWS

    // Cache
    const cacheKey = `CASTS_${offset}_${limit}`
    const cachedTips = cache.get<TipCast[]>(cacheKey)

    if (cachedTips) {
      return cachedTips
    }

    const { rows } = await (<Promise<QueryResult<DbTip>>>sql`
        SELECT giver_fid,
          hash,
          date
        FROM casts
        WHERE date >= TO_DATE(${process.env.TIPPING_PROGRAM_START_DATE}, 'MM-DD-YYYY')
        ORDER BY date DESC
        LIMIT ${limit}
        OFFSET ${offset};
    `)

    const tips = rows.map(mapValuesToTip)
    cache.set(cacheKey, tips, 30)
    return tips
  } catch (err) {
    logger.error(`Tip retrieval failed: ${err}`)
    return []
  }
}

export default getTipCasts
