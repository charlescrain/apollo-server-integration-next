import type { NextApiRequest, NextApiResponse } from 'next'
import { logger } from '../../../../lib/utils/logger'
import setTipCasts from '../../../../lib/data-sources/casts/set'
import { cache } from '../../../../startServerAndCreateNextHandler'
import { isTipCast, parseCast } from '../../../../lib/utils/parseCast'

interface NeynarCastAuthor {
  fid: number
  username: string
  [key: string]: any
}

interface NeynarCastParentAuthor {
  fid: number | null
}

export interface NeynarCast {
  hash: string
  parent_author: NeynarCastParentAuthor
  author: NeynarCastAuthor
  text: string
  timestamp: string
  [key: string]: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type, data } = req.body
  if (!type || type !== 'cast.created' || !isTipCast(data as NeynarCast)) {
    return res.status(400).json({ message: 'Not a tip cast' })
  }

  const cast = data as NeynarCast
  if (cache.get(`HASH_${cast.hash}`)) {
    return res.status(400).json({ message: 'Cast already exists' })
  }

  logger.info(`Tip cast found: ${data.text}`)
  const tip = parseCast(cast)
  if (!tip) {
    return res.status(500).json({ message: 'Something went wrong' })
  }

  const isSaved = await setTipCasts(tip)
  if (!isSaved) {
    return res.status(500).json({ message: 'Something went wrong' })
  }

  cache.set(`HASH_${tip.hash}`, tip)
  const message = `Tip successfully saved: ${tip.hash}`
  logger.info(message)
  return res.status(200).json({ message })
}
