import { sql } from '@vercel/postgres'
import { logger } from '../../utils/logger'
import { TipCast } from '../../../pages/api/graphql/resolvers/casts'

const setTipCasts = async (tip: TipCast): Promise<boolean> => {
  try {
    const { giverFid, date, hash } = tip
    await sql`INSERT INTO casts (giver_fid, date, hash) VALUES (${giverFid}, ${date}, ${hash});`
    return true
  } catch (err) {
    logger.error(`Tip saving failed: ${err}`)
    return false
  }
}

export default setTipCasts
