import { sql } from '@vercel/postgres'
import { logger } from '../../../../lib/winston'

export interface Tip {
  giverFid: number
  hash: string
  date: string
}

const setTip = async (tip: Tip): Promise<boolean> => {
  try {
    const { giverFid, date, hash } = tip
    await sql`INSERT INTO casts (giver_fid, date, hash) VALUES (${giverFid}, ${date}, ${hash});`
    return true
  } catch (err) {
    logger.error(`Tip saving failed: ${err}`)
    return false
  }
}

export default setTip
