import { QueryResult, sql } from '@vercel/postgres'
import { logger } from '../../../../lib/winston'
import { Tip } from './set'
import { cache } from '../../../../startServerAndCreateNextHandler'

export interface Pagination {
  startTime: string
  endTime: string
  offset?: number
  limit?: number
}

interface DbTip {
  giver_fid: number
  hash: string
  date: Date
}

// Max number of rows returned per request
const MAX_ROWS = 1000

const mapValuesToTip = (row: DbTip): Tip => ({
  giverFid: row.giver_fid,
  hash: row.hash,
  date: row.date.toISOString(),
})

const getTips = async (config?: Pagination): Promise<Tip[]> => {
  try {
    const offset = config && config.offset ? config.offset : 0
    const limit =
      config && config.limit && config.limit < MAX_ROWS
        ? config.limit
        : MAX_ROWS

    // Cache
    const cacheKey = `CASTS_${offset}_${limit}`
    const cachedTips = cache.get<Tip[]>(cacheKey)

    if (cachedTips) {
      return cachedTips
    }

    const { rows } = await (<Promise<QueryResult<DbTip>>>sql`
        SELECT giver_fid,
          hash,
          date
        FROM casts 
        ORDER BY date DESC
        LIMIT ${limit}
        OFFSET ${offset};
    `)

    const tips = rows.map(mapValuesToTip)
    cache.set(cacheKey, tips, 30000)
    return tips
  } catch (err) {
    logger.error(`Tip retrieval failed: ${err}`)
    return []
  }
}

export default getTips
